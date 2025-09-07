'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getActiveSurvey() {
    try {
        const response = await fetch(`${API_URL}/survey/active`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            return { error: 'Failed to get active survey' };
        }

        const result = await response.json();
        const survey = result.data && result.data[0] ? result.data[0] : null;
        return { data: survey };
    } catch (error) {
        console.error('Failed to get survey data:', error);
        return { error: 'Failed to get survey data' };
    }
}

export async function submitSurvey(
    surveyId: string,
    answers: any
) {
    try {
        const cookieStore = await cookies();

        const response = await fetch(`${API_URL}/survey/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieStore.toString()
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
    try {
        const cookieStore = await cookies();

        const response = await fetch(`${API_URL}/survey/submission`, {
            headers: {
                'Cookie': cookieStore.toString()
            },
        });

        if (response.status === 404) return { data: null };

        if (!response.ok) {
            return { error: 'Unable to load submission' }
        }

        const result = await response.json();
        const submission = result.data && result.data[0] ? result.data[0] : null;
        return { data: submission };
    }
    catch (error) {
        console.error('Error fetching user submission:', error);
        return { error: 'Failed to fetch user submission' };
    }
}