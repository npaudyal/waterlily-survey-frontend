'use client';

import { useEffect, useState } from 'react';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  fullscreen?: boolean;
  text?: string;
  className?: string;
}

export function Loading({
  variant = 'spinner',
  size = 'md',
  fullscreen = false,
  text = 'Loading...',
  className = ''
}: LoadingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (variant === 'dots') {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [variant]);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = fullscreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm'
    : `flex items-center justify-center ${className}`;

  const renderSpinner = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}></div>
      {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
    </div>
  );

  const renderDots = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      {text && <p className="text-sm text-gray-600">{text}{dots}</p>}
    </div>
  );

  const renderPulse = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className={`${sizes[size]} bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse`}></div>
      {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
    </div>
  );

  const renderSkeleton = () => (
    <div className="w-full max-w-md space-y-4">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
      {text && <p className="text-sm text-gray-600 text-center mt-4">{text}</p>}
    </div>
  );

  const renderLoading = () => {
    switch (variant) {
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      case 'skeleton': return renderSkeleton();
      default: return renderSpinner();
    }
  };

  return (
    <div className={containerClasses}>
      {renderLoading()}
    </div>
  );
}

export function PageLoading({ text = 'Loading page...' }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Health Survey App
            </h2>
            <p className="text-gray-600 animate-pulse">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormLoading({ text = 'Processing...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-white/20 max-w-sm w-full mx-4">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{text}</h3>
            <p className="text-sm text-gray-600">Please wait a moment...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;