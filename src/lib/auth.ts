'use server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
}

export async function validateAuth(): Promise<AuthUser | null> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (!accessToken) {
            return null;
        }

        const response = await fetch(`${API_URL}/auth/validate`, {
            method: 'GET',
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        if (response.ok) {
            const data = await response.json();
            return {
                id: data.userId,
                email: data.email,
            };
        }

        return null;
    } catch (error) {
        console.error('Auth validation error:', error);
        return null;
    }
}

export async function getProfile(): Promise<AuthUser | null> {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.data;
        }

        return null;
    } catch (error) {
        console.error('Get profile error:', error);
        return null;
    }
}