import SurveyForm from "@/components/forms/survey-form";
import { Alert } from "@/components/ui/alert";
import { getActiveSurvey } from "@/lib/survey-actions";

export default async function SurveyPage() {
    const { data: survey, error } = await getActiveSurvey();

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

                    {error && <Alert variant="error" message={error} />}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <SurveyForm survey={survey} />
            </div>
        </div>
    )
}