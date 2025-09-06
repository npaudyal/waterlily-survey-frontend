import Link from 'next/link';
import { validateAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await validateAuth();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Waterlily Health Survey System
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to your comprehensive health survey platform. Sign in to manage your health survey and view past responses.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="block w-full px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create Account
          </Link>
        </div>

        <div className="text-sm text-gray-500">
          <p>Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
}