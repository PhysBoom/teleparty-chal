import React, {useState, useEffect} from "react";
import { TelepartyClient, SocketEventHandler, SessionChatMessage } from 'teleparty-websocket-lib';

interface TelepartyClientProps {
    onClose: () => void;
}

export interface TelepartyClientDetails {
    connectionReady: boolean;
    messages: string[];
    clearMessages: () => void;
    client: TelepartyClient;
}

const useTelepartyClient = ({ onClose }: TelepartyClientProps): TelepartyClientDetails => {
    const [connectionReady, setConnectionReady] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [client, setClient] = useState<TelepartyClient>();

    /* onMessage uses the SocketMessage type which is not exported in the package,
    so I'm using any for now. */
    function handleReceiveMessage(message: any){
        console.log(message);
    }

    function close() {
        onClose();
        setConnectionReady(false);
    }

    function clearMessages() {
        setMessages([]);
    }

    useEffect(() => {
        const eventHandler: SocketEventHandler = {
            onConnectionReady: () => { setConnectionReady(true) },
            onClose: close,
            onMessage: handleReceiveMessage
        };
        const client = new TelepartyClient(eventHandler);
        setClient(client);
    }, []);

    return { connectionReady, messages, clearMessages, client: client as TelepartyClient };

}

export default useTelepartyClient;