import { render, screen } from "@testing-library/react";
import LoginButton from "../../Components/loginButton";

// MOCK DO FIREBASE (importante: estável e imita os retornos do auth)
jest.mock("firebase/auth", () => {
  return {
    signInWithPopup: jest.fn(),
    signOut: jest.fn(),
    getAuth: () => ({
      onAuthStateChanged: (callback: any) => {
        callback(null); // simula usuário deslogado
        return () => {};
      },
    }),
    GoogleAuthProvider: jest.fn(),
  };
});

describe("LoginButton", () => {
  it("renderiza botão de login quando usuário não está autenticado", () => {
    render(<LoginButton />);
    expect(screen.getByText("Entrar com Google")).toBeInTheDocument();
  });
});