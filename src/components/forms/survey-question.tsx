import { TextInput, SelectInput, RadioInput, CheckboxInput, TextareaInput, NumberInput, ScaleInput } from '@/components/forms/question-input'

interface Question {
    id: string;
    text: string;
    type: string;
    required: boolean;
    options?: any;
}

interface SurveyQuestionProps {
    question: Question;
    value: any;
    onChange: (value: any) => void;
    questionNumber?: number;
}

export default function SurveyQuestion({ question, value, onChange, questionNumber }: SurveyQuestionProps) {
    const renderInput = () => {
        const props = { question, value, onChange };

        switch (question.type) {
            case 'text':
            case 'email':
            case 'date':
            case 'phone':
                return <TextInput {...props} />;

            case 'number':
            case 'currency':
                return <NumberInput {...props} />;

            case 'textarea':
                return <TextareaInput {...props} />;

            case 'select':
            case 'country':
                return <SelectInput {...props} />;

            case 'radio':
                return <RadioInput {...props} />;

            case 'multiselect':
                return <CheckboxInput {...props} />;

            case 'scale':
                return <ScaleInput {...props} />;

            default:
                return (
                    <div className="text-red-500 text-sm">
                        Unsupported question type: {question.type}
                    </div>
                );
        }
    };

    return (
        <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {question.text}
                {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {renderInput()}
            </div>
        </div>
    );
}