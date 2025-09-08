'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitSurvey } from '@/lib/survey-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SurveySection from './survey-section';
import { FormLoading } from '@/components/ui/loading';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Survey, SurveyAnswer } from '@/types/survey';

interface SurveyFormProps {
    survey: Survey;
}

export default function SurveyForm({ survey }: SurveyFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
    const [error, setError] = useState('');

    const totalSections = survey.sections.length;
    const isLastSection = currentSection === totalSections - 1;
    const isFirstSection = currentSection === 0;
    const currentSectionData = survey.sections[currentSection];

    const submitMutation = useMutation({
        mutationFn: async (data: { surveyId: string; answers: SurveyAnswer[] }) => {
            const result = await submitSurvey(data.surveyId, data.answers);
            if (!result.success) {
                throw new Error(result.error || 'Failed to submit survey');
            }
            return result;
        },
        onSuccess: () => {
            // Invalidate and refetch user submission and dashboard data
            queryClient.invalidateQueries({ queryKey: ['userSubmission'] });
            queryClient.invalidateQueries({ queryKey: ['activeSurvey'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            router.push('/submission');
        },
        onError: (error: Error) => {
            setError(error.message);
        }
    });

    const validateCurrentSection = () => {
        const section = survey.sections[currentSection];
        const missingQuestions: string[] = [];

        section.questions.forEach(question => {
            if (question.required && !answers[question.id]) {
                missingQuestions.push(question.text);
            }
        });

        if (missingQuestions.length > 0) {
            setError(`Please complete the following required fields: ${missingQuestions.join(', ')}`);
            return false;
        }

        return true;
    };

    const handleNext = () => {
        if (!validateCurrentSection()) return;

        setError('');
        if (!isLastSection) {
            setCurrentSection(currentSection + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        setError('');
        if (!isFirstSection) {
            setCurrentSection(currentSection - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        if (!validateCurrentSection()) return;

        setError('');

        const answersArray = Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value
        }));

        submitMutation.mutate({
            surveyId: survey.id,
            answers: answersArray
        });
    };

    const handleAnswerChange = (questionId: string, value: string | string[] | number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    return (
        <>
            {submitMutation.isPending && <FormLoading text="Submitting your survey..." />}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
                <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">
                                Section {currentSection + 1} of {totalSections}
                            </span>
                            <span className="text-sm text-gray-500">
                                {Math.round(((currentSection + 1) / totalSections) * 100)}% Complete
                            </span>
                        </div>
                        <div className="relative">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out rounded-full"
                                    style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
                                />
                            </div>
                            {/* Step indicators */}
                            <div className="absolute top-0 left-0 w-full h-2 flex justify-between">
                                {survey.sections.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all ${index <= currentSection
                                            ? 'bg-blue-600 scale-125'
                                            : 'bg-gray-300'
                                            }`}
                                        style={{
                                            position: 'absolute',
                                            left: `${(index / (totalSections - 1)) * 100}%`,
                                            transform: 'translateX(-50%)'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 sm:px-8 py-6 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <span className="text-lg font-bold text-blue-600">
                                            {currentSection + 1}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {currentSectionData.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {currentSectionData.questions.length} questions in this section
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            {isFirstSection && (
                                <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <p className="text-sm text-amber-800">
                                        <span className="font-semibold">👋 Thanks for reaching out, we&apos;re looking forward to helping you.</span>
                                        <br />
                                        <span className="text-amber-700 mt-2 block">
                                            Before we start, what&apos;s a good way for us to reply to you?
                                        </span>
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            )}

                            <SurveySection
                                section={currentSectionData}
                                answers={answers}
                                onAnswerChange={handleAnswerChange}
                            />
                        </div>

                        <div className="px-6 sm:px-8 py-6 bg-gray-50 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <button
                                    onClick={handlePrevious}
                                    disabled={isFirstSection}
                                    className={`
                                    inline-flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base
                                    ${isFirstSection
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                                `}
                                >
                                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                    Previous
                                </button>

                                <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-end">
                                    {survey.sections.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (index < currentSection || (index === currentSection)) {
                                                    setCurrentSection(index);
                                                }
                                            }}
                                            className={`
                                            w-2 h-2 rounded-full transition-all
                                            ${index === currentSection
                                                    ? 'w-8 bg-blue-600'
                                                    : index < currentSection
                                                        ? 'bg-blue-400 hover:bg-blue-500 cursor-pointer'
                                                        : 'bg-gray-300'
                                                }
                                        `}
                                        />
                                    ))}
                                </div>

                                {isLastSection ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitMutation.isPending}
                                        className={`
                                        inline-flex items-center px-4 sm:px-6 py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base
                                        ${submitMutation.isPending
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                                            }
                                    `}
                                    >
                                        {submitMutation.isPending ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Submit
                                                <CheckIcon className="h-4 w-4 ml-2" />
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="inline-flex items-center px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Next
                                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}