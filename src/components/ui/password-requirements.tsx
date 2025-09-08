'use client';

import { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordRequirement {
    text: string;
    regex: RegExp;
    validator?: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
    {
        text: 'At least 8 characters long',
        regex: /.{8,}/,
    },
    {
        text: 'At least one lowercase letter (a-z)',
        regex: /[a-z]/,
    },
    {
        text: 'At least one uppercase letter (A-Z)',
        regex: /[A-Z]/,
    },
    {
        text: 'At least one number (0-9)',
        regex: /\d/,
    },
    {
        text: 'At least one special character',
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    },
    {
        text: 'No spaces allowed',
        validator: (password: string) => !/\s/.test(password),
        regex: /^$/
    },
    {
        text: 'No more than 2 consecutive identical characters',
        validator: (password: string) => !/(.)\1{2,}/.test(password),
        regex: /^$/
    }
];

interface PasswordRequirementsProps {
    password: string;
    showRequirements?: boolean;
}

export function PasswordRequirements({ password, showRequirements = true }: PasswordRequirementsProps) {
    const [requirementsMet, setRequirementsMet] = useState<boolean[]>([]);

    useEffect(() => {
        const met = requirements.map(req => {
            if (req.validator) {
                return req.validator(password);
            }
            return req.regex.test(password);
        });
        setRequirementsMet(met);
    }, [password]);

    const allRequirementsMet = requirementsMet.every(met => met);

    if (!showRequirements && password.length === 0) {
        return null;
    }

    return (
        <div className="mt-2">
            {showRequirements && (
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Password must contain:</p>
                    <div className="space-y-1">
                        {requirements.map((req, index) => {
                            const isMet = requirementsMet[index];
                            return (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${isMet
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {isMet ? (
                                            <CheckIcon className="w-3 h-3" />
                                        ) : (
                                            <XMarkIcon className="w-3 h-3" />
                                        )}
                                    </div>
                                    <span className={`text-xs ${isMet ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {req.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    {password.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                                <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${allRequirementsMet
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-red-100 text-red-600'
                                    }`}>
                                    {allRequirementsMet ? (
                                        <CheckIcon className="w-3 h-3" />
                                    ) : (
                                        <XMarkIcon className="w-3 h-3" />
                                    )}
                                </div>
                                <span className={`text-xs font-medium ${allRequirementsMet ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {allRequirementsMet ? 'Password meets all requirements' : 'Password does not meet all requirements'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export function validatePasswordClientSide(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    requirements.forEach(req => {
        const isMet = req.validator ? req.validator(password) : req.regex.test(password);
        if (!isMet) {
            errors.push(req.text);
        }
    });

    if (password.length > 128) {
        errors.push('Password must not exceed 128 characters');
    }

    if (/123456|654321|qwerty|password|admin|letmein/i.test(password)) {
        errors.push('Password contains common weak patterns');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}