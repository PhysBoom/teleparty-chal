import React from 'react';

interface HeaderProps {
    headerText: string;
}

const Header: React.FC<HeaderProps> = ({ headerText }) => {
  return (
    <header className="bg-gray-900 py-4 px-8 fixed top-0 left-0 right-0 z-10 text-center">
      <h1>{headerText}</h1>
    </header>
  );
};

export default Header;