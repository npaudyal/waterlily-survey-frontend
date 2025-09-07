interface InputProps {
    question: any;
    value: any;
    onChange: (value: any) => void;
}

const inputClasses = "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400";

export function TextInput({ question, value, onChange }: InputProps) {
    const getPlaceholder = () => {
        if (question.type === 'email') return 'your.email@example.com';
        if (question.type === 'phone') return '(555) 123-4567';
        if (question.type === 'date') return 'MM/DD/YYYY';
        return `Enter ${question.text.toLowerCase()}`;
    };

    return (
        <input
            type={question.type === 'phone' ? 'tel' : question.type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
            placeholder={getPlaceholder()}
        />
    );
}

export function NumberInput({ question, value, onChange }: InputProps) {
    if (question.type === 'currency') {
        return (
            <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500 font-medium">$</span>
                <input
                    type="number"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    step="0.01"
                    min="0"
                    className={`${inputClasses} pl-10`}
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
            placeholder="Enter a number"
        />
    );
}

export function TextareaInput({ question, value, onChange }: InputProps) {
    return (
        <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={question.options?.rows || 4}
            placeholder={question.options?.placeholder || 'Enter your response here...'}
            className={`${inputClasses} resize-none`}
        />
    );
}

export function SelectInput({ question, value, onChange }: InputProps) {
    const options = question.options?.choices || [];

    return (
        <div className="relative">
            <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
            >
                <option value="">Choose an option...</option>
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}

export function RadioInput({ question, value, onChange }: InputProps) {
    const options = question.options?.choices || [];

    return (
        <div className="space-y-2">
            {options.map((option: any) => (
                <label
                    key={option.value}
                    className={`
                        flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                        ${value === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                    `}
                >
                    <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="mr-3 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <span className={`text-sm ${value === option.value ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}

export function CheckboxInput({ question, value, onChange }: InputProps) {
    const options = question.options?.choices || [];
    const selectedValues = value || [];

    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
        if (checked) {
            onChange([...selectedValues, optionValue]);
        } else {
            onChange(selectedValues.filter((v: string) => v !== optionValue));
        }
    };

    return (
        <div className="space-y-2">
            {options.map((option: any) => (
                <label
                    key={option.value}
                    className={`
                        flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all
                        ${selectedValues.includes(option.value)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                    `}
                >
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                        className="mr-3 text-blue-600 rounded focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <span className={`text-sm ${selectedValues.includes(option.value) ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}

export function ScaleInput({ question, value, onChange }: InputProps) {
    const min = question.options?.min || 1;
    const max = question.options?.max || 10;
    const minLabel = question.options?.minLabel || 'Minimum';
    const maxLabel = question.options?.maxLabel || 'Maximum';
    const currentValue = value || min;

    const scales = [];
    for (let i = min; i <= max; i++) {
        scales.push(i);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between gap-2">
                {scales.map((scale) => (
                    <button
                        key={scale}
                        type="button"
                        onClick={() => onChange(scale)}
                        className={`
                            flex-1 py-3 px-2 rounded-lg font-medium transition-all
                            ${currentValue === scale
                                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }
                        `}
                    >
                        {scale}
                    </button>
                ))}
            </div>

            <div className="flex justify-between text-xs text-gray-500">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                    style={{ width: `${((currentValue - min) / (max - min)) * 100}%` }}
                />
            </div>
        </div>
    );
}