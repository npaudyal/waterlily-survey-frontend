'use client';

import SurveyForm from "@/components/forms/survey-form";
import { Alert } from "@/components/ui/alert";
import { getActiveSurvey } from "@/lib/survey-actions";
import { PageLoading } from '@/components/ui/loading';
import { useQuery } from '@tanstack/react-query';

export default function SurveyPage() {
    const { data: surveyData, isLoading, error } = useQuery({
        queryKey: ['activeSurvey'],
        queryFn: async () => {
            const result = await getActiveSurvey();
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        },
    });

    const survey = surveyData?.data;

    if (isLoading) {
        return <PageLoading text="Loading your survey..." />;
    }

    if (error || !survey) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className="mb-8">
                    <h1 className="text-2xl text-gray-900 font-semibold mb-2">
                        No Survey Available
                    </h1>
                    <p className="text-gray-600">
                        There are curently no active survey to complete.
                    </p>

                    {error && <Alert variant="error" message={error.message} />}
                </div>
            </div>
        );
    }

    return <SurveyForm survey={survey} />;
}