'use client'

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const funcionario = localStorage.getItem("funcionario");
            if (funcionario && funcionario !== "undefined") {
                setUser(JSON.parse(funcionario));
            }
        } catch (e) {
            console.error("Erro ao ler o usuário do localStorage:", e);
            localStorage.removeItem("funcionario");
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;