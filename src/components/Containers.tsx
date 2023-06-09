import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const DefaultContainer: React.FC<ContainerProps> = ({ children, style }) => {
    return (
        <div className="flex flex-col h-screen bg-dark text-light" style={style}>
            {children}
        </div>
    );
};

export const CenteredContainer: React.FC<ContainerProps> = ({ children, style }) => {
    return (
        <div className="flex flex-col h-full min-h-screen py-2 bg-dark text-light justify-center items-center" style={style}>
            {children}
        </div>
    );
};