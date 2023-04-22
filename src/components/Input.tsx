import React from "react";

interface InputProps {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
    style?: React.CSSProperties;
    resizable?: boolean;
    onEnter?: () => void;
    multiline?: boolean;
}

const Input: React.FC<InputProps> = ({ placeholder, onChange, value, style, resizable, onEnter, multiline }) => {
    const inputStyle = resizable && multiline ? style : { ...style, resize: 'none' } as React.CSSProperties;

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.key === "Enter" && document.activeElement === e.target && !e.shiftKey && onEnter) {
            e.preventDefault();
            onEnter();
        }
    }

    if (multiline) {
        return (
            <textarea
                className="bg-gray-700 text-light px-4 py-2 rounded-md"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                style={inputStyle}
                onKeyDown={handleKeyDown}
            />
        );
    } else {
        return (
            <input
                className="bg-gray-700 text-light px-4 py-2 rounded-md"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                style={style}
                onKeyDown={handleKeyDown}
            />
        );
    }
};

export default Input;