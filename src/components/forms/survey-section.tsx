import SurveyQuestion from './survey-question';
import { SurveySectionProps } from '@/types/survey';

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