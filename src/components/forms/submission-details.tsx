import { CheckCircleIcon, DocumentTextIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { SurveySubmission, SurveyAnswer } from '@/types/survey';

interface SubmissionDetailsProps {
    submission: SurveySubmission;
}

interface AnswerWithQuestion extends SurveyAnswer {
    id?: string;
    question?: {
        text: string;
        type: string;
        required: boolean;
        section?: {
            title: string;
        };
    };
}

export default function SubmissionDetails({ submission }: SubmissionDetailsProps) {
    const answersBySection: { [key: string]: AnswerWithQuestion[] } = {};

    submission.answers?.forEach((answer: AnswerWithQuestion) => {
        const sectionTitle = answer.question?.section?.title || 'General Information';
        if (!answersBySection[sectionTitle]) {
            answersBySection[sectionTitle] = [];
        }
        answersBySection[sectionTitle].push(answer);
    });

    const formatValue = (value: string | string[] | number | undefined, type?: string) => {
        if (value === null || value === undefined || value === '') {
            return <span className="text-gray-400 italic">Not provided</span>;
        }

        if (Array.isArray(value)) {
            return (
                <div className="flex flex-wrap gap-2 mt-1">
                    {value.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                            {item}
                        </span>
                    ))}
                </div>
            );
        }

        if (type === 'date' && value) {
            return new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        if (type === 'currency' && value) {
            const numValue = typeof value === 'number' ? value : parseFloat(value.toString());
            return `$${numValue.toFixed(2)}`;
        }

        return value.toString();
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center mb-2">
                                <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {submission.survey?.title || 'Health Assessment Survey'}
                                </h2>
                            </div>
                            <p className="text-sm text-gray-600">
                                {submission.survey?.description || 'Comprehensive health and wellness evaluation'}
                            </p>
                        </div>
                        <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Completed
                        </div>
                    </div>
                </div>

                <div className="px-8 py-4 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                            <CalendarDaysIcon className="h-4 w-4 mr-1.5" />
                            <span>Submission ID: #{submission.id?.slice(0, 8).toUpperCase()}</span>
                        </div>
                        <div className="text-gray-600">
                            Total Questions Answered: <span className="font-semibold text-gray-900">{submission.answers?.length || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="space-y-8">
                        {Object.entries(answersBySection).map(([sectionTitle, answers], sectionIndex) => (
                            <div key={sectionIndex} className="space-y-4">
                                <div className="flex items-center pb-3 border-b border-gray-200">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                        {sectionIndex + 1}
                                    </div>
                                    <h3 className="ml-3 text-lg font-semibold text-gray-900">{sectionTitle}</h3>
                                </div>

                                <div className="space-y-4 pl-11">
                                    {answers.map((answer: AnswerWithQuestion, index: number) => (
                                        <div key={answer.id} className="group">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 mt-0.5">
                                                    {index + 1}
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                                        {answer.question?.text}
                                                        {answer.question?.required && (
                                                            <span className="ml-1 text-red-500">*</span>
                                                        )}
                                                    </p>
                                                    <div className="text-base text-gray-900">
                                                        {formatValue(answer.value, answer.question?.type)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {Object.keys(answersBySection).length}
                            </p>
                            <p className="text-xs text-gray-600">Sections Completed</p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {submission.answers?.length || 0}
                            </p>
                            <p className="text-xs text-gray-600">Total Responses</p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">100%</p>
                            <p className="text-xs text-gray-600">Completion Rate</p>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">Secure</p>
                            <p className="text-xs text-gray-600">Data Protection</p>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}