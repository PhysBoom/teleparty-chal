import React from 'react';
import SelectChat from './pages/SelectChat';
import Chat from './pages/Chat';
import { Routes, Route } from 'react-router-dom';
import { TelepartyClientProvider } from './contexts/client-context';
import { UserProvider } from './contexts/user-context';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  function onClientClose() {
    navigate('/');
    alert("Connection to Teleparty server closed. Please refresh the page to reconnect.");
  }

  return (
    <TelepartyClientProvider onClose={onClientClose}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<SelectChat />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </UserProvider>
    </TelepartyClientProvider>
  );
}

export default App;
