import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "./FirebaseConfig";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser({ user, pending: false, isSignedIn: !!user });
    });

    return unsubscribe;
  }, []);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const value = {
    currentUser,
    signup,
    logout,
    signin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
