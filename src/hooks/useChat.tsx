import React, { useEffect } from "react";
import { TelepartyClient, SocketMessageTypes } from 'teleparty-websocket-lib';

interface ChatProps {
    chatId: string;
    client: TelepartyClient;
}

interface Chat {
    joinRoom: (nickname: string) => void;
    sendMessage: (message: string) => void;
    updateTypingPresence: (isTyping: boolean) => void;
}

const useChat = ({ chatId, client }: ChatProps): Chat => {
    function joinRoom(nickname: string) {
        client.joinChatRoom(nickname, chatId);
    }

    function sendMessage(message: string) {
        client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
            body: message,
        });
    }

    function updateTypingPresence(isTyping: boolean) {
        client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
            typing: isTyping,
        });
    }

    return { joinRoom, sendMessage, updateTypingPresence };
}

export default useChat;

