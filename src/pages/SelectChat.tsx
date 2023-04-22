import React, { useState } from "react";
import { CenteredContainer } from "../components/Containers";
import Header from "../components/Header";
import Input from "../components/Input";
import { ButtonPrimary } from "../components/Buttons";
import { useTelepartyClientContext } from "../contexts/client-context";
import { FullScreenLoader } from "../components/Loaders";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user-context";

const SelectChat: React.FC = () => {
    const [chatId, setChatId] = useState("");
    const [chatIdError, setChatIdError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const navigate = useNavigate();
    const { connectionReady, clearMessages, client } = useTelepartyClientContext();
    const { userName, setUserName } = useUserContext();

    function handleJoinChat() {
        if (chatId.length > 0) {
            clearMessages();
            navigate(`/chat/${chatId}`);
        } else {
            setChatIdError("* Please enter a chat ID");
        }
    }

    async function handleCreateChat() {
        if (userName.length > 0) {
            clearMessages();
            const chatId = await client.createChatRoom(userName);
            navigate(`/chat/${chatId}`);
        } else {
            setUsernameError("* Please enter a username");
        }
    }

    return (
        <>
            {!connectionReady && <FullScreenLoader />}
            {connectionReady && (
                <CenteredContainer style={{height: "100vh"}}>
                    <Header headerText="Select a chat" />
                    <div className="flex flex-col space-y-10 items-center justify-center w-64">
                        <div className="flex flex-col space-y-4 w-full">
                            <div className="flex flex-col">
                                <Input placeholder="Chat ID" onChange={(e) => setChatId(e.target.value)} value={chatId} onEnter={handleJoinChat} />
                                {chatIdError.length > 0 && <p className="text-red-500">{chatIdError}</p>}
                            </div>
                            <ButtonPrimary text="Join" onClick={handleJoinChat} style={{width: "100%"}}/>
                        </div>
                        <div className="flex flex-col space-y-4 w-full">
                            <div className="flex flex-col">
                                <Input placeholder="Username" onChange={(e) => setUserName(e.target.value)} value={userName} onEnter={handleCreateChat} />
                                {usernameError.length > 0 && <p className="text-red-500">{usernameError}</p>}
                            </div>
                            <ButtonPrimary text="Create New Chat" onClick={handleCreateChat} style={{width: "100%"}}/>
                        </div>  
                    </div>
                </CenteredContainer>
            )}
        </>
    )
};

export default SelectChat;