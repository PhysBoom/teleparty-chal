import React, { useState } from "react";
import { CenteredContainer } from "../components/Containers";
import Header from "../components/Header";
import Input from "../components/Input";
import { ButtonPrimary } from "../components/Buttons";

const SelectChat: React.FC = () => {
    const [chatId, setChatId] = useState("");

    function handleJoinChat() {
        console.log("Joining chat #" + chatId);
    }

    function handleCreateChat() {
        console.log("Creating chat");
    }

    return (
        <CenteredContainer style={{height: "100vh"}}>
            <Header headerText="Select a chat" />
            <div className="flex flex-col space-y-10 items-center justify-center w-64">
                <div className="flex flex-col space-y-4 w-full">
                    <Input placeholder="Chat ID" onChange={(e) => setChatId(e.target.value)} value={chatId} onEnter={handleJoinChat} />
                    <ButtonPrimary text="Join" onClick={handleJoinChat} style={{width: "100%"}}/>
                </div>
                <ButtonPrimary text="Create New Chat" onClick={handleCreateChat} style={{width: "100%"}}/>
            </div>
        </CenteredContainer>
    )
};

export default SelectChat;