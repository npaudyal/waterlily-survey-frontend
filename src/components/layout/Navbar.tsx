'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

const navigation = [
    { name: 'Survey', href: '/survey' },
    { name: 'Submissions', href: '/submission' },
]

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-transparent">
            <div className="mx-auto max-w-7xl px-6 py-4 bg-gradient-to-br from-amber-50/30 via-white to-blue-50/30">
                <div className="relative">
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl px-6 py-3">
                        <div className="flex h-12 items-center justify-between">
                            <div className="flex items-center">
                                <Link href={user ? "/dashboard" : "/"} className="group">
                                    <div className="relative px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative flex items-center space-x-2">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="text-lg font-bold text-white tracking-tight">Health Survey App</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {user ? (
                                <>
                                    <div className="hidden md:flex items-center space-x-8">
                                        {navigation.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`
                                                        text-base font-medium transition-colors
                                                        ${isActive
                                                            ? 'text-gray-900'
                                                            : 'text-gray-700 hover:text-gray-900'
                                                        }
                                                    `}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        })}
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <Menu as="div" className="relative">
                                            <MenuButton className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                                <UserCircleIcon className="h-6 w-6 text-gray-600" />
                                                <span className="hidden sm:block text-sm font-medium text-gray-700">
                                                    {user?.email?.split('@')[0]}
                                                </span>
                                                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                                            </MenuButton>

                                            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                                                <div className="px-4 py-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {user?.name || 'User'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {user?.email}
                                                    </p>
                                                </div>

                                                <div className="py-1">
                                                    <MenuItem>
                                                        <button
                                                            onClick={handleLogout}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            Sign out
                                                        </button>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex-1"></div>

                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href="/auth/login"
                                            className="px-5 py-2 text-base font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/auth/register"
                                            className="inline-flex items-center px-5 py-2 bg-green-500 text-white text-base font-medium rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            It&apos;s Free → Try now!
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {user && (
                            <div className="md:hidden border-t border-gray-200 mt-3 pt-3">
                                <div className="flex space-x-2">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`
                                                    flex-1 px-3 py-2 rounded-lg text-sm font-medium text-center transition-all
                                                    ${isActive
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}