"use client";
import LoginButton from "@/Components/loginButton";
import Notes from "@/Components/notes";
import useAuth from "@/hook/auth";
import { auth } from "@/lib/firebase";



export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="mt-6">Carregando...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Minhas Anotações</h1>
      <LoginButton />
      {user ? (
        <Notes />
      ) : (
        <p className="mt-4 text-gray-600">Faça login para acessar suas anotações.</p>
      )}
    </div>
  );
}