import { useState } from "react";
import AuthContext from "../Contexts/AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [clientUser, setClientUser] = useState(localStorage.getItem("clientUser") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const setUserData = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const setClientUserData = (client_user) => {
    localStorage.setItem("clientUser", JSON.stringify(client_user));
    setClientUser(client_user)
  }

  const setTokenString = (data) => {
    localStorage.setItem("token", data)
    setToken(data);
  };

  return (
    <AuthContext.Provider value={{ user, setUserData, clientUser, setClientUserData, token, setTokenString }}>
      {children}
    </AuthContext.Provider>
  );
}
