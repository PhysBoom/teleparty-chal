import React, { createContext, useContext, useMemo } from 'react';
import useTelepartyClient, { TelepartyClientDetails } from '../hooks/useTelepartyClient';

interface TelepartyClientContextProps {
    onClose: () => void;
    children: React.ReactNode;
}

const TelepartyClientContext = createContext<TelepartyClientDetails>({} as TelepartyClientDetails);

export const TelepartyClientProvider: React.FC<TelepartyClientContextProps> = ({ onClose, children }) => {
    const { connectionReady, messages, usersTyping, userId, clearMessages, client } = useTelepartyClient({onClose});

    const contextValue = useMemo(() => {
        return { connectionReady, messages, usersTyping, userId, clearMessages, client };
    }, [connectionReady, messages, usersTyping, userId, clearMessages, client]);

    return (
        <TelepartyClientContext.Provider value={contextValue}>
            {children}
        </TelepartyClientContext.Provider>
    );
}

export const useTelepartyClientContext = () => {
    return useContext(TelepartyClientContext);
}