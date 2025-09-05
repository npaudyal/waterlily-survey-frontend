'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitSurvey } from '@/lib/survey-actions';
import SurveySection from '@/components/forms/survey-section';

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
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Check required questions
        const missingQuestions: string[] = [];
        survey.sections.forEach(section => {
            section.questions.forEach(question => {
                if (question.required && !answers[question.id]) {
                    missingQuestions.push(question.text);
                }
            });
        });

        if (missingQuestions.length > 0) {
            setError(`Please answer: ${missingQuestions.join(', ')}`);
            setLoading(false);
            return;
        }

        // Submit survey
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
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            {survey.sections.map((section, index) => (
                <SurveySection
                    key={section.id}
                    section={section}
                    answers={answers}
                    onAnswerChange={(questionId, value) =>
                        setAnswers(prev => ({ ...prev, [questionId]: value }))
                    }
                    sectionNumber={index + 1}
                />
            ))}

            {error && (
                <div className="text-red-600 p-3 bg-red-50 rounded">
                    {error}
                </div>
            )}

            <div className="flex justify-end pt-6 border-t">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : 'Submit Survey'}
                </button>
            </div>
        </form>
    );
}