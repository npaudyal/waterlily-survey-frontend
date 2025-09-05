import SubmissionDetails from "@/components/forms/submission-details";
import { getUserSubmission } from "@/lib/survey-actions";
import Link from "next/link";

export default async function SubmissionPage() {

    const { data: submission } = await getUserSubmission();

    return (

        <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
                <h1 className="text-2xl text-gray-900 font-semibold mb-2">
                    Survey Submission
                </h1>
                <p className="text-gray-600">
                    View your survey submission
                </p>
            </div>

            {!submission ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200">
                        <h2 className="text-2xl text-gray-900 font-semibold mb-2">
                            No submissions yet
                        </h2>
                        <p className="text-gray-600">
                            Complete your first survey to see it here
                        </p>
                        <Link
                            href='/survey'
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition-colors">
                            Take Survey
                        </Link>
                    </div>
                </div>
            ) : (
                <SubmissionDetails submission={submission} />
            )}
        </div>

    );

}