'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitSurvey } from '@/lib/survey-actions';
import SurveySection from './survey-section';

interface Survey {
    id: string;
    name: string;
    sections: {
        id: string;
        title: string;
        questions: {
            id: string;
            text: string;
            type: string;
            required: boolean;
            options?: any;
        }[];
    }[];
}

interface SurveyFormProps {
    survey: Survey;
}

export default function SurveyForm({ survey }: SurveyFormProps) {
    const router = useRouter();
    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const totalSections = survey.sections.length;
    const isLastSection = currentSection === totalSections - 1;
    const isFirstSection = currentSection === 0;

    // Calculate progress percentage
    const progress = ((currentSection + 1) / totalSections) * 100;

    // Check if current section is complete
    const validateCurrentSection = () => {
        const section = survey.sections[currentSection];
        const missingQuestions: string[] = [];

        section.questions.forEach(question => {
            if (question.required && !answers[question.id]) {
                missingQuestions.push(question.text);
            }
        });

        if (missingQuestions.length > 0) {
            setError(`Please complete: ${missingQuestions.join(', ')}`);
            return false;
        }

        setError('');
        return true;
    };

    const handleNext = () => {
        if (validateCurrentSection()) {
            setCurrentSection(prev => Math.min(prev + 1, totalSections - 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        setError('');
        setCurrentSection(prev => Math.max(prev - 1, 0));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateCurrentSection()) {
            return;
        }

        setError('');
        setLoading(true);

        // Final validation for all sections
        const missingQuestions: string[] = [];
        survey.sections.forEach(section => {
            section.questions.forEach(question => {
                if (question.required && !answers[question.id]) {
                    missingQuestions.push(question.text);
                }
            });
        });

        if (missingQuestions.length > 0) {
            setError(`Please complete all required questions`);
            setLoading(false);
            return;
        }

        const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value
        }));

        const result = await submitSurvey(survey.id, formattedAnswers);

        if (result.error) {
            setError(result.error);
        } else if (result.success) {
            router.push('/submissions');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Header with survey name and progress */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{survey.name}</h1>

                {/* Progress bar */}
                <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            Section {currentSection + 1} of {totalSections}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                            {Math.round(progress)}% Complete
                        </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Section indicators */}
                <div className="flex items-center justify-center mt-6 space-x-2">
                    {survey.sections.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                if (index < currentSection || validateCurrentSection()) {
                                    setCurrentSection(index);
                                }
                            }}
                            className={`
                                w-3 h-3 rounded-full transition-all duration-300
                                ${index === currentSection
                                    ? 'bg-blue-600 w-8'
                                    : index < currentSection
                                        ? 'bg-blue-400'
                                        : 'bg-gray-300'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Current section */}
                <div className="bg-white rounded-lg shadow-lg p-8 min-h-[400px] transition-all duration-300">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {survey.sections[currentSection].title}
                        </h2>
                        <div className="mt-2 h-1 w-20 bg-blue-600 rounded"></div>
                    </div>

                    <SurveySection
                        section={survey.sections[currentSection]}
                        answers={answers}
                        onAnswerChange={(questionId, value) =>
                            setAnswers(prev => ({ ...prev, [questionId]: value }))
                        }
                        sectionNumber={currentSection + 1}
                    />
                </div>

                {/* Error message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-8 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={isFirstSection}
                        className={`
                            flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                            ${isFirstSection
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
                            }
                        `}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    {isLastSection ? (
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200
                                ${loading
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 active:scale-95 shadow-lg'
                                }
                            `}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Survey
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md"
                        >
                            Next
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}