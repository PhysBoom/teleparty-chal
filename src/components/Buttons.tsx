import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

const UNIVERSAL_BUTTON_CLASS = "text-light px-4 py-2 rounded-md hover:-translate-y-0.5 hover:shadow-md transition duration-200 ease-in-out"
const UNIVERAL_BUTTON_STYLE: React.CSSProperties = {
    width: "140px",
    height: "40px"
};

export const ButtonPrimary: React.FC<ButtonProps> = ({ text, onClick, style }) => {
    return (
        <button className={`bg-green-500 hover:shadow-green-500 ${UNIVERSAL_BUTTON_CLASS}`} onClick={onClick} style={style || UNIVERAL_BUTTON_STYLE}>
            {text}
        </button>
    );
};