'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-blue-50/30 relative overflow-hidden perspective-1000">
      <div className="absolute top-20 left-10 opacity-90 paper3d-1">
        <Image
          src="/paper.png"
          alt="3D floating document"
          width={200}
          height={250}
          className="drop-shadow-lg"
        />
      </div>

      <div className="absolute top-40 right-20 opacity-85 paper3d-2">
        <Image
          src="/paper2.png"
          alt="Vertical flipping document"
          width={180}
          height={220}
          className="drop-shadow-lg"
        />
      </div>

      <div className="absolute bottom-60 opacity-20 left-1/4 paper3d-3">
        <Image
          src="/paper3.png"
          alt="Horizontal flipping paper"
          width={160}
          height={180}
          className="drop-shadow-md"
        />
      </div>

      <div className="absolute top-32 left-1/3 opacity-20 paper-tornado">
        <Image
          src="/paper.png"
          alt="Tornado paper"
          width={140}
          height={160}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute bottom-40 left-0 opacity-35 paper-wind-2">
        <Image
          src="/paper3.png"
          alt="Strong wind paper"
          width={150}
          height={170}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute top-80 right-1/3 opacity-25 paper-tumble">
        <Image
          src="/paper.png"
          alt="Tumbling paper"
          width={130}
          height={150}
          className="drop-shadow-md"
        />
      </div>

      <div className="absolute top-10 right-1/4 opacity-55 paper-sway-1">
        <Image
          src="/paper2.png"
          alt="Swaying paper"
          width={110}
          height={130}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute bottom-20 left-1/3 opacity-50 paper-sway-2">
        <Image
          src="/paper3.png"
          alt="Swaying document"
          width={100}
          height={120}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute top-1/2 right-10 paper-whirl">
        <Image
          src="/paper.png"
          alt="Whirlwind paper"
          width={190}
          height={100}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute top-3/4 left-20 paper3d-1">
        <Image
          src="/paper2.png"
          alt="Atmospheric paper 1"
          width={200}
          height={190}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute top-16 left-2/3 opacity-35 paper-tornado">
        <Image
          src="/paper3.png"
          alt="Atmospheric paper 2"
          width={85}
          height={95}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute bottom-32 right-1/4 opacity-38 paper-wind-1">
        <Image
          src="/paper.png"
          alt="Atmospheric paper 3"
          width={75}
          height={85}
          className="drop-shadow-sm"
        />
      </div>

      <div className="absolute top-1/3 left-10 paper-tumble">
        <Image
          src="/paper2.png"
          alt="Atmospheric paper 4"
          width={195}
          height={105}
          className="drop-shadow-sm"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className={`transition-all duration-1000 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-md bg-[#FDEB5B] border-yellow-600 text-gray-900 text-sm font-sm mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Healthcare Innovation Platform
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
            Transform
            <br />
            <span className="text-blue-600">
              Healthcare
            </span>
            <br />
            Surveys
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            Revolutionize patient data collection with intelligent surveys that adapt,
            learn, and deliver insights that matter to healthcare professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/register"
              className="group inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Get Started
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>


          </div>
        </div>
      </div>
    </div>
  );
}