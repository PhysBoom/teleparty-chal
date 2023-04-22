import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Chatbox from '../components/Chatbox';
import ChatMessage from '../components/ChatMessage';
import { DefaultContainer } from '../components/Containers';
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useTelepartyClientContext } from '../contexts/client-context';
import { FullScreenLoader } from '../components/Loaders';
import useChat from '../hooks/useChat';
import { useUserContext } from '../contexts/user-context';


const Chat: React.FC = () => {
    const [usernameError, setUsernameError] = useState('');
    const { chatId } = useParams();
    const { connectionReady, messages, usersTyping, client, userId } = useTelepartyClientContext();
    const { joinRoom, sendMessage, updateTypingPresence } = useChat({ chatId: chatId || '', client });
    const { userName, setUserName } = useUserContext();
    const [usernameModalOpen, setUsernameModalOpen] = useState(!userName);


    function confirmUsername() {
        if (userName.length > 0){
            joinRoom(userName);
            setUsernameModalOpen(false);
        } else {
            setUsernameError('Please enter a username');
        }
    }

    return (
        <>
            {!connectionReady && <FullScreenLoader />}
            {connectionReady && (
                <DefaultContainer>
                    <Modal isOpen={usernameModalOpen} onClose={confirmUsername} closeButtonText='Confirm' buttonType='primary'>
                        <div className="flex flex-col space-y-4">
                            <h2>Select a username</h2>
                            <Input placeholder="Username" onChange={(e) => setUserName(e.target.value)} value={userName} style={{width: "100%"}} onEnter={confirmUsername}/>
                            {usernameError.length > 0 && <p className="text-red-500">{usernameError}</p>}
                        </div>
                    </Modal>
                    <div className="mt-20 mb-6 flex-1 overflow-y-auto max-h-full">
                        <Header headerText={`Chat - ${chatId}`} />
                        <div className="flex flex-col space-y-4">
                            {messages.map((message, index) => (
                                message.body && <ChatMessage key={index} message={message} sentBySelf={!message.isSystemMessage && message.userNickname === userName} />
                            ))}
                        </div>
                    </div>
                    <div className="flex w-full text-center">
                        <Chatbox onSend={sendMessage} updateTypingPresence={updateTypingPresence} usersTyping={usersTyping} userId={userId}/>
                    </div>
                </DefaultContainer>
            )}
        </>
    )
}

export default Chat;