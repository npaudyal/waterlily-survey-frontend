'use server';

import { auth } from '@clerk/nextjs/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getActiveSurvey() {
    try {
        const response = await fetch(`${API_URL}/survey/active`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            return { error: 'Failed to get active survey' };
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Failed to get survey data:', error);
        return { error: 'Failed to get survey data' };
    }
}

export async function submitSurvey(
    surveyId: string,
    answers: any
) {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
        return { error: 'Not authenticated' };
    }

    try {
        const response = await fetch(`${API_URL}/survey/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ surveyId, answers })
        });

        if (!response.ok) {
            const data = await response.json();
            return { error: data.error || 'Failed to submit survey' };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting survey:', error);
        return { error: 'Failed to submit survey' };
    }
}

export async function getUserSubmission() {

    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
        return { error: 'Not authenticated' };
    }

    try {
        const response = await fetch(`${API_URL}/survey/submission`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 404) return { data: null };

        if (!response.ok) {
            return { error: 'Unable to load submission' }
        }

        const data = await response.json();
        return { data };
    }
    catch (error) {
        console.error('Error fetching user submission:', error);
        return { error: 'Failed to fetch user submission' };
    }
}

