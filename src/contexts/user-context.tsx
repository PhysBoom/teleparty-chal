import React, { createContext, useContext } from "react";

interface UserContextProps {
    children: React.ReactNode;
}

interface UserContextData {
    userName: string;
    setUserName: (userName: string) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
    const [userName, setUserName] = React.useState<string>("");

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}