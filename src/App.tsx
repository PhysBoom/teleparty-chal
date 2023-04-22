import React from 'react';
import SelectChat from './pages/SelectChat';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SelectChat />} />
    </Routes>
  );
}

export default App;
