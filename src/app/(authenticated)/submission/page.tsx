'use client';

import SubmissionDetails from "@/components/forms/submission-details";
import { getUserSubmission } from "@/lib/survey-actions";
import Link from "next/link";
import { PageLoading } from '@/components/ui/loading';
import { useQuery } from '@tanstack/react-query';
import {
    DocumentCheckIcon,
    ClipboardDocumentListIcon,
    ArrowRightIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';

export default function SubmissionPage() {
    const { data: submissionData, isLoading, error } = useQuery({
        queryKey: ['userSubmission'],
        queryFn: async () => {
            const result = await getUserSubmission();
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        },
    });

    const submission = submissionData?.data;

    if (isLoading) {
        return <PageLoading text="Loading your submissions..." />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {!submission ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-12 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6">
                                    <ClipboardDocumentListIcon className="w-10 h-10 text-gray-400" />
                                </div>

                                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                    No submissions yet
                                </h2>

                                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                    Once you complete your first health survey, you'll be able to view and manage
                                    all your responses right here.
                                </p>

                                <Link
                                    href='/survey'
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Start Your First Survey
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Link>

                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Secure Storage
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Private & Confidential
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center mb-3">
                                        <DocumentCheckIcon className="h-8 w-8 mr-3" />
                                        <h2 className="text-2xl font-bold">Survey Successfully Completed!</h2>
                                    </div>
                                    <div className="flex items-center space-x-6 text-green-100">
                                        <div className="flex items-center">
                                            <CalendarIcon className="h-5 w-5 mr-2" />
                                            <span>
                                                Submitted on {submission.completedAt ? new Date(submission.completedAt).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : 'Date unavailable'}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span>
                                                at {submission.completedAt ? new Date(submission.completedAt).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) : 'Time unavailable'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SubmissionDetails submission={submission} />
                    </div>
                )}
            </div>
        </div>
    );
}