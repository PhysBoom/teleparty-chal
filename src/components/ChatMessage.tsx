import React from "react";
import { SessionChatMessage } from 'teleparty-websocket-lib';

interface ChatMessageProps {
    message: SessionChatMessage;
    sentBySelf: boolean;
}

const SELF_BG_COLOR = "bg-blue-500";
const OTHER_BG_COLOR = "bg-gray-600";

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sentBySelf }: ChatMessageProps) => {
    const bgColor = sentBySelf ? SELF_BG_COLOR : OTHER_BG_COLOR;
    const align = sentBySelf ? "justify-end" : "justify-start";
    return (
        <div className={`flex flex-row w-full ${align} px-10 text-light`}>
            {message.isSystemMessage && <span className="text-italics text-purple-500">{`${message.userNickname} ${message.body} (${new Date(message.timestamp).toLocaleTimeString()})`}</span>}
            {!message.isSystemMessage && (
                <div className={`flex flex-col max-w-2/3 ${bgColor} rounded-lg p-4`}>
                    <span className="text-sm font-bold text-green-500">{message.userNickname}</span>
                    <span className="text-sm">{message.body}</span>
                </div>
            )}
        </div>
    )
};

export default ChatMessage;