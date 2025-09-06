'use client';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Survey', href: '/survey', current: false },
    { name: 'Submission', href: '/submission', current: false },
]

function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Disclosure as="nav" className="relative bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    const isCurrent = pathname === item.href;
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={isCurrent ? 'page' : undefined}
                                            className={classNames(
                                                isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                                </MenuButton>
                            </div>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                    {user?.email}
                                </div>
                                <MenuItem>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                                        Sign out
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => {
                        const isCurrent = pathname === item.href;
                        return (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={isCurrent ? 'page' : undefined}
                                className={classNames(
                                    isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        )
                    })}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}