import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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
            href='/login'
            className="w-full block px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href='/register'
            className="w-full block px-6 py-3 border border-gray-900 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
