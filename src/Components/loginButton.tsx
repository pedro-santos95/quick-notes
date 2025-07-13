"use client";

import { auth, provider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function LoginButton(){
    const [User, setUser] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((User) => {
            setUser(User);
        });
        return () => unsubscribe();
    },[]);

    const handleLogin = async() => {
        try {
             await signInWithPopup(auth, provider)
            
        } catch (error) {
            console.error("Error ao fazer login", error)
        };
    };

    const handleLogout = async() => {
        try {
          await signOut(auth);
        } catch (error) {
      console.error("Erro ao sair:", error);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {User ? (
                <>
                <p className="text-sm"> Olá, {User.displayName}</p>
                <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">
                    Sair
                </button>
                </>
            ): (
                <button onClick={handleLogin} className="px-3 py-1 bg-blue-600 text-white rounded">
                     Entrar com Google
                </button>
            )}
        </div>
    );

}