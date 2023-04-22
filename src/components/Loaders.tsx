import React from 'react';

export const FullScreenLoader: React.FC = () => {
    return (
        <div className="flex flex-col h-full min-h-screen py-2 bg-dark text-light justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-900"></div>
        </div>
    );
};