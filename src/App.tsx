import React from 'react';
import SelectChat from './pages/SelectChat';
import { Routes, Route } from 'react-router-dom';
import { TelepartyClientProvider } from './contexts/client-context';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  function onClientClose() {
    navigate('/');
    alert("Connection to Teleparty server closed. Please refresh the page to reconnect.");
  }

  return (
    <TelepartyClientProvider onClose={onClientClose}>
      <Routes>
        <Route path="/" element={<SelectChat />} />
      </Routes>
    </TelepartyClientProvider>
  );
}

export default App;
