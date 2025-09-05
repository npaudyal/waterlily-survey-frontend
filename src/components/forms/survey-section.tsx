'use client';

import { useEffect, useState } from 'react';
import SurveyQuestion from '@/components/forms/survey-question';

interface Section {
    id: string;
    title: string;
    questions: Question[];
}

interface Question {
    id: string;
    text: string;
    type: string;
    required: boolean;
    options?: any;
}

interface SurveySectionProps {
    section: Section;
    answers: Record<string, any>;
    onAnswerChange: (questionId: string, value: any) => void;
    sectionNumber: number;
}

export default function SurveySection({ section, answers, onAnswerChange, sectionNumber }: SurveySectionProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, [section.id]);

    return (
        <div className={`
            bg-white rounded-xl shadow-sm border border-gray-200 p-8
            transition-all duration-500 transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full text-sm font-bold shadow-md">
                        {sectionNumber}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                <div className="h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent"></div>
            </div>

            <div className="space-y-6">
                {section.questions.map((question, index) => (
                    <div
                        key={question.id}
                        className={`
                            transition-all duration-500 transform
                            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        `}
                        style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    >
                        <SurveyQuestion
                            question={question}
                            value={answers[question.id]}
                            onChange={(value) => onAnswerChange(question.id, value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}