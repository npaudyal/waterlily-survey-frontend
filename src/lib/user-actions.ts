'use server';

import { auth } from '@clerk/nextjs/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function syncUser() {
    const { getToken } = await auth();
    const token = await getToken();

    if (!token) {
        return { error: 'Not authenticated' };
    }

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return { error: 'Failed to sync user' };
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error syncing user:', error);
        return { error: 'Failed to sync user' };
    }
}