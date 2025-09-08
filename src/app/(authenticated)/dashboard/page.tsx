'use client';

import Link from 'next/link';
import { getActiveSurvey, getUserSubmission } from '@/lib/survey-actions';
import { getProfile } from '@/lib/auth';
import { PageLoading } from '@/components/ui/loading';
import { useQuery } from '@tanstack/react-query';
import {
    ClipboardDocumentCheckIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    ChartBarIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

interface AuthUser {
    id: string;
    email: string;
    name?: string;
}

export default function DashboardPage() {
    const { data: user, isLoading: userLoading } = useQuery<AuthUser | null>({
        queryKey: ['profile'],
        queryFn: async () => {
            const result = await getProfile();
            return result;
        },
    });

    const { data: surveyData, isLoading: surveyLoading } = useQuery({
        queryKey: ['activeSurvey'],
        queryFn: async () => {
            const result = await getActiveSurvey();
            return result;
        },
    });

    const { data: submissionData, isLoading: submissionLoading } = useQuery({
        queryKey: ['userSubmission'],
        queryFn: async () => {
            const result = await getUserSubmission();
            return result;
        },
    });

    const isLoading = userLoading || surveyLoading || submissionLoading;
    const survey = surveyData?.data;
    const submission = submissionData?.data;

    if (isLoading) {
        return <PageLoading text="Loading your dashboard..." />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {survey && !submission ? (
                    <div className="mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Ready to complete your health survey?</h2>
                                <p className="text-blue-100 mb-4">{survey.name}</p>
                                <Link
                                    href="/survey"
                                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Start Survey
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                            <ClipboardDocumentCheckIcon className="h-24 w-24 text-blue-200" />
                        </div>
                    </div>
                ) : submission ? (
                    <div className="mb-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Survey Completed Successfully!</h2>
                                <p className="text-green-100 mb-4">
                                    Submitted on {submission.completedAt ? new Date(submission.completedAt).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'Date unavailable'}
                                </p>
                                <Link
                                    href="/submission"
                                    className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    View Submission
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                            <CheckCircleIcon className="h-24 w-24 text-green-200" />
                        </div>
                    </div>
                ) : (
                    <div className="mb-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl p-8 text-white shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">No Active Survey</h2>
                                <p className="text-gray-200">Check back later for new health assessments</p>
                            </div>
                            <DocumentTextIcon className="h-24 w-24 text-gray-300" />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <ChartBarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-500">Status</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {submission ? 'Completed' : survey ? 'Pending' : 'No Survey'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Current survey status</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CalendarIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-500">Last Activity</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {submission ? 'Today' : 'Never'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Your last submission</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                            </div>
                            <span className="text-sm text-gray-500">Surveys</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {submission ? '1' : '0'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Total completed</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Profile</h3>
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Name:</span> {user?.name || 'Not set'}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Email:</span> {user?.email}
                            </p>
                        </div>
                        <p className="text-xs text-gray-500">
                            Keep your profile information up to date for better personalization
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h3>
                        <div className="space-y-2">
                            <Link
                                href="/survey"
                                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowRightIcon className="h-4 w-4 mr-2" />
                                View Active Survey
                            </Link>
                            <Link
                                href="/submission"
                                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowRightIcon className="h-4 w-4 mr-2" />
                                Check Your Submissions
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    <p>Secure & Private • HIPAA Compliant</p>
                </div>
            </div>
        </div>
    );
}