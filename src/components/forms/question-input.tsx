interface InputProps {
    question: any;
    value: any;
    onChange: (value: any) => void;
}

const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";

export function TextInput({ question, value, onChange }: InputProps) {
    return (
        <input
            type={question.type === 'phone' ? 'tel' : question.type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
            placeholder={`Enter your ${question.text.toLowerCase()}`}
        />
    );
}

export function NumberInput({ question, value, onChange }: InputProps) {
    if (question.type === 'currency') {
        return (
            <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                <input
                    type="number"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    step="0.01"
                    min="0"
                    className={`${inputClasses} pl-8`}
                    placeholder="0.00"
                />
            </div>
        );
    }

    return (
        <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            min={question.options?.min}
            max={question.options?.max}
            step={question.options?.step}
            className={inputClasses}
        />
    );
}

export function TextareaInput({ question, value, onChange }: InputProps) {
    return (
        <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={question.options?.rows || 4}
            placeholder={question.options?.placeholder}
            className={inputClasses}
        />
    );
}

export function SelectInput({ question, value, onChange }: InputProps) {
    const options = question.options?.choices || [];

    return (
        <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
        >
            <option value="">Select an option...</option>
            {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export function RadioInput({ question, value, onChange }: InputProps) {
    const options = question.options?.choices || [];

    return (
        <div className="space-y-3">
            {options.map((option: any) => (
                <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

export function CheckboxInput({ question, value, onChange }: InputProps) {
    const options = question.options?.choices || [];
    const selectedValues = value || [];

    return (
        <div className="space-y-3">
            {options.map((option: any) => (
                <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                onChange([...selectedValues, option.value]);
                            } else {
                                onChange(selectedValues.filter((v: string) => v !== option.value));
                            }
                        }}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

export function ScaleInput({ question, value, onChange }: InputProps) {
    const min = question.options?.min || 1;
    const max = question.options?.max || 10;
    const currentValue = value || min;

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">{question.options?.minLabel || min}</span>
                <span className="text-sm text-gray-600">{question.options?.maxLabel || max}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={currentValue}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center mt-4">
                <span className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full text-lg font-semibold">
                    {currentValue}
                </span>
            </div>
        </div>
    );
}