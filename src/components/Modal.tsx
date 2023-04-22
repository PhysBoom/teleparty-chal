import React from "react";
import { ButtonNeutral, ButtonPrimary } from "./Buttons";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpen: boolean;
    closeButtonText?: string;
    style?: React.CSSProperties;
    buttonType?: "primary" | "neutral";
}

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen, closeButtonText, style, buttonType }) => {
    buttonType = buttonType || "neutral";
    if (!isOpen) return null;
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 z-20 flex justify-center items-center" >
            <div className="bg-gray-800 rounded-md min-w-[600px]" style={style}>
                <div className="flex flex-col p-6">
                    {children}
                </div>
                <div className="flex justify-end bg-gray-700 rounded-b-md p-4">
                    {buttonType === "primary" ? <ButtonPrimary text={closeButtonText || "Close"} onClick={onClose} /> : null}
                    {buttonType === "neutral" ? <ButtonNeutral text={closeButtonText || "Close"} onClick={onClose} /> : null}
                </div>
            </div>
        </div>
    );
};

export default Modal;