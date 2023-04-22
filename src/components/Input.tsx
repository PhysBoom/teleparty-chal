import React, {useState, useEffect} from "react";

interface InputProps {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
    style?: React.CSSProperties;
    resizable?: boolean;
    onEnter?: () => void;
    multiline?: boolean;
    onTyping?: () => void;
    onStoppedTyping?: () => void;
}

const Input: React.FC<InputProps> = ({ placeholder, onChange, value, style, resizable, onEnter, multiline, onTyping, onStoppedTyping }) => {
    const inputStyle = resizable && multiline ? style : { ...style, resize: 'none' } as React.CSSProperties;
    const [typing, setTyping] = useState(false);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e.key === "Enter" && document.activeElement === e.target && !e.shiftKey && onEnter) {
            e.preventDefault();
            onEnter();
        } else if (e.key !== "Enter" && onTyping && !typing) {
            setTyping(true);
            onTyping();
        }
    }

    useEffect(() => {
        if (typing && onStoppedTyping) {
          const timeout = setTimeout(() => {
            onStoppedTyping();
            setTyping(false);
          }, 1000);
          return () => {
            clearTimeout(timeout);
          };
        }
    }, [typing, onStoppedTyping]);
            
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