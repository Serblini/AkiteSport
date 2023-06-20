import React, { createContext, useContext, useEffect } from "react";
import { useLocalObservable } from "mobx-react";
import bcrypt from "bcryptjs";
import { AuthStore } from "../utilities/storeOb";

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authStore = useLocalObservable(() => new AuthStore());

  const checkAuth = async (email: string, password: string) => {
    try {
      const users = await authStore.getUserByEmail(email);
      console.log("Users:", users);

      if (users.length > 0) {
        const user = users[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);
        console.log("Password Match:", passwordMatch);

        if (passwordMatch) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.error("Ошибка при получении пользователя:", error);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const user = await checkAuth(email, password);
      if (user) {
        authStore.setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        console.log("Неверный email или пароль");
      }
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
    }
  };

  const logout = () => {
    authStore.setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      authStore.setUser(JSON.parse(storedUser));
    }
  }, [authStore]);

  return (
    <AuthContext.Provider value={{ user: authStore.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
