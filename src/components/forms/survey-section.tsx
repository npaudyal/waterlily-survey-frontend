import SurveyQuestion from './survey-question';

interface Question {
    id: string;
    text: string;
    type: string;
    required: boolean;
    options?: any;
}

interface Section {
    id: string;
    title: string;
    questions: Question[];
}

interface SurveySectionProps {
    section: Section;
    answers: Record<string, any>;
    onAnswerChange: (questionId: string, value: any) => void;
}

export default function SurveySection({ section, answers, onAnswerChange }: SurveySectionProps) {
    return (
        <div className="space-y-6">
            {section.questions.map((question, index) => (
                <div key={question.id} className="relative">
                    <SurveyQuestion
                        question={question}
                        value={answers[question.id]}
                        onChange={(value) => onAnswerChange(question.id, value)}
                        questionNumber={index + 1}
                    />
                </div>
            ))}
        </div>
    );
}