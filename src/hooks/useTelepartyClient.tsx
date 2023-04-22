import React, {useState, useEffect} from "react";
import { TelepartyClient, SocketEventHandler, SessionChatMessage, SocketMessageTypes } from 'teleparty-websocket-lib';

interface TelepartyClientProps {
    onClose: () => void;
}

export interface TelepartyClientDetails {
    connectionReady: boolean;
    messages: SessionChatMessage[];
    usersTyping: string[];
    clearMessages: () => void;
    client: TelepartyClient;
    userId: string;
}

const useTelepartyClient = ({ onClose }: TelepartyClientProps): TelepartyClientDetails => {
    const [connectionReady, setConnectionReady] = useState(false);
    const [messages, setMessages] = useState<SessionChatMessage[]>([]);
    const [usersTyping, setUsersTyping] = useState<string[]>([]);
    const [client, setClient] = useState<TelepartyClient>();
    const [userId, setUserId] = useState<string>("");

    /* onMessage uses the SocketMessage type which is not exported in the package,
    so I'm using any for now. */
    function handleReceiveMessage(message: any){
        if (message.type == SocketMessageTypes.SET_TYPING_PRESENCE){
            setUsersTyping(message.data.usersTyping);
        } else if (message.type == SocketMessageTypes.SEND_MESSAGE){
            setMessages((prevMessages) => [...prevMessages, message.data]);
        } else if (message.type == "userId"){
            setUserId(message.data.userId);
        }
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

    return { connectionReady, messages, usersTyping, userId, clearMessages, client: client as TelepartyClient };

}

export default useTelepartyClient;