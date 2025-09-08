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
    const { user, loading, logout } = useAuth();

    const isAuthenticated = () => {
        return !!user;
    };

    if (loading) {
        return (
            <nav className="sticky top-0 z-50 w-full bg-transparent">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 py-2 sm:py-4 bg-gradient-to-br from-amber-50/30 via-white to-blue-50/30">
                    <div className="relative">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl px-3 sm:px-6 py-2 sm:py-3">
                            <div className="flex h-10 sm:h-12 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">Health</span>
                                        <span className="text-lg sm:text-2xl font-black text-blue-600 tracking-tight -mt-0.5 sm:-mt-1">Survey</span>
                                    </div>
                                </div>
                                <div className="flex-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-transparent">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 py-2 sm:py-4 bg-gradient-to-br from-amber-50/30 via-white to-blue-50/30">
                <div className="relative">
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl px-3 sm:px-6 py-2 sm:py-3">
                        <div className="flex h-10 sm:h-12 items-center justify-between">
                            <div className="flex items-center">
                                <Link href={isAuthenticated() ? "/dashboard" : "/"} className="group">
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">Health</span>
                                        <span className="text-lg sm:text-2xl font-black text-blue-600 tracking-tight -mt-0.5 sm:-mt-1">Survey</span>
                                    </div>
                                </Link>
                            </div>

                            {isAuthenticated() ? (
                                <>
                                    <div className="hidden md:flex items-center space-x-8">
                                        {navigation.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`
                                                        text-base font-medium transition-all relative
                                                        ${isActive
                                                            ? 'text-blue-600 after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-blue-600'
                                                            : 'text-gray-700 hover:text-gray-900'
                                                        }
                                                    `}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        })}
                                    </div>

                                    <div className="flex items-center space-x-2 sm:space-x-4">
                                        <Menu as="div" className="relative">
                                            <MenuButton className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                                <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                                                <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                                    {user?.name || user?.email?.split('@')[0]}
                                                </span>
                                                <ChevronDownIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                                            </MenuButton>

                                            <MenuItems className="absolute right-0 mt-2 w-48 sm:w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 z-50">
                                                <div className="px-4 py-3">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
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

                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <Link
                                            href="/login"
                                            className="px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="inline-flex items-center px-3 sm:px-5 py-1.5 sm:py-2 bg-green-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            <span className="hidden sm:inline">It&apos;s Free → Try now!</span>
                                            <span className="sm:hidden">Sign Up</span>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {isAuthenticated() && (
                            <div className="md:hidden border-t border-gray-200 mt-2 sm:mt-3 pt-2 sm:pt-3">
                                <div className="flex space-x-1 sm:space-x-2">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`
                                                    flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-center transition-all
                                                    ${isActive
                                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
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