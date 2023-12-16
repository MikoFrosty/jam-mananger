import { useState } from "react";
import AuthContext from "../Contexts/AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const setUserData = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const setTokenString = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setToken(data);
  };

  return (
    <AuthContext.Provider value={{ user, setUserData, token, setTokenString }}>
      {children}
    </AuthContext.Provider>
  );
}
