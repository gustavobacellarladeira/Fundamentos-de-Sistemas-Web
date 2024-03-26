import React, { useState, createContext, useEffect } from "react";
import { auth } from "../Firebase";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../api/api";
import { User } from "firebase/auth";

interface AuthProviderProps {
  children: JSX.Element;
}

interface AuthContextProps {
  authenticated: boolean;
  user: User | null;
  token: string;
  handleDeleteAccount: () => void;
}

export const AuthContext = createContext(
  {}
) as unknown as React.Context<AuthContextProps>;

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);
  const [token, setToken] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    // firebase auth change
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setUser(user);
          setPending(false);
          // Obtenha o token de autenticação gerado pelo Firebase Client SDK
          const idToken = await user.getIdToken();

          // console.log("USER ---->", user);
          console.log("TOKEN ---->", idToken);

          // coloca o token no header da api para todas as requisições
          axiosInstance.interceptors.request.use((config) => {
            if (idToken) {
              config.headers["Authorization"] = `Bearer ${idToken}`;
            }
            return config;
          });

          // obetem o id do usuario
          setToken(idToken);
        } catch (error: any) {
          console.error("Erro ao fazer login no backend:", error);
          if (error.response.status === 401 || error.response.status === 403) {
            console.log("Usuário não autorizado");
            setUser(null);
            setToken("");
            logout();
          }
          // Tratar erros de autenticação
        }
      } else {
        console.log("no user");
        setUser(null);
        setPending(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [logout]);

  const handleDeleteAccount = async () => {
    try {
      await user?.delete();
      // A conta foi excluída com sucesso, você pode redirecionar o usuário ou fazer qualquer outra ação necessária.
    } catch (error) {
      console.error(error);
    }
  };

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        token,
        handleDeleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
