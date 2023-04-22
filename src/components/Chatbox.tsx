import React, {useState, useEffect} from "react";
import { ButtonPrimary } from "./Buttons";
import  Input from "./Input";

interface ChatboxProps {
    onSend: (message: string) => void;
    updateTypingPresence: (isTyping: boolean) => void;
    usersTyping: string[];
    userId: string;
}

const Chatbox: React.FC<ChatboxProps> = ({ onSend, updateTypingPresence, usersTyping, userId }: ChatboxProps) => {
    const [message, setMessage] = useState("");
    const [numPeopleTypingExceptMe, setNumPeopleTypingExceptMe] = useState(0);

    function handleSend() {
        if (message){
            onSend(message);
            setMessage("");
        }
    }

    function countNumPeopleTypingExceptMe() {
        return usersTyping.length - (usersTyping.includes(userId) ? 1 : 0);
    }

    useEffect(() => {
        setNumPeopleTypingExceptMe(countNumPeopleTypingExceptMe());
    }, [usersTyping]);

    return (
        <div className="flex flex-col w-full space-y-2">
            {numPeopleTypingExceptMe > 0 && <span className="px-4 text-sm text-gray-500 text-left">{`${numPeopleTypingExceptMe} people typing...`}</span>}
            <div className="flex flex-row justify-between items-center space-x-4 p-4 py-6 bg-gray-900">
                <Input multiline={true} placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)} value={message} style={{width: "100%", height: "40px"}} onEnter={handleSend} onTyping={() => updateTypingPresence(true)} onStoppedTyping={() => updateTypingPresence(false)} />
                <ButtonPrimary text="Send" onClick={handleSend} />
            </div>
        </div>
    );
};
            
export default Chatbox;
    
    