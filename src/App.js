import React from "react";
import "./App.css";
import Signup from "./Components/Signup";
import { AuthProvider } from "../src/AuthContext";
import { Route, Routes } from "react-router-dom";
import Account from "./Components/Account";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { DatabaseContextProvider } from "./DatabaseContext";

function App() {
  return (
    <AuthProvider>
      <DatabaseContextProvider>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </DatabaseContextProvider>
    </AuthProvider>
  );
}

export default App;
