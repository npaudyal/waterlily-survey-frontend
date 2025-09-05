interface SubmissionDetailsProps {
    submission: any;
}

export default function SubmissionDetails({ submission }: SubmissionDetailsProps) {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{submission.survey.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Submitted on {new Date(submission.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>

            <div className="p-6 space-y-6">
                {submission.answers.map((answer: any) => (
                    <div key={answer.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            {answer.question.text}
                        </p>
                        <p className="text-gray-900">
                            {answer.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Survey completed successfully
                </div>
            </div>
        </div>
    );
}