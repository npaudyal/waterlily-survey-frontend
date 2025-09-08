export interface SurveyQuestion {
    id: string;
    text: string;
    type: 'text' | 'radio' | 'checkbox' | 'textarea' | 'number' | 'email' | 'url' | 'phone' | 'date' | 'select' | 'multiselect' | 'scale' | 'currency' | 'country';
    options?: string[];
    required: boolean;
    sectionId: string;
}

export interface SurveySection {
    id: string;
    title: string;
    description?: string;
    order: number;
    questions: SurveyQuestion[];
}

export interface Survey {
    id: string;
    title: string;
    description?: string;
    sections: SurveySection[];
    createdAt: string;
    updatedAt: string;
}

export interface SurveyAnswer {
    questionId: string;
    value: string | string[] | number;
}

export interface SurveySubmission {
    id: string;
    surveyId: string;
    userId: string;
    answers: SurveyAnswer[];
    completedAt: string;
    createdAt: string;
    survey?: Survey;
    user?: {
        id: string;
        email: string;
        name?: string;
    };
}

export interface SurveyFormProps {
    survey: Survey;
    onSubmit: (answers: SurveyAnswer[]) => Promise<void>;
}

export interface SurveyQuestionProps {
    question: SurveyQuestion;
    questionNumber: number;
    value: string | string[] | number | undefined;
    onChange: (answer: string | string[] | number) => void;
}

export interface SurveySectionProps {
    section: SurveySection;
    answers: Record<string, string | string[] | number>;
    onAnswerChange: (questionId: string, answer: string | string[] | number) => void;
}

export interface QuestionInputProps {
    question: SurveyQuestion;
    answer: string | string[] | number | undefined;
    onChange: (answer: string | string[] | number) => void;
}

export interface SubmissionDetailsProps {
    submission: SurveySubmission;
}

export interface SubmissionWithDetails extends SurveySubmission {
    sectionsCompleted: number;
    totalSections: number;
    completionPercentage: number;
}