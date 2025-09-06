'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function syncUser() {
    try {
        const cookieStore = await cookies();
        
        const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Cookie': cookieStore.toString()
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