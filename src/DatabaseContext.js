import React, { useContext } from "react";
import { db } from "./FirebaseConfig";
import { getDocs, collection, addDoc } from "firebase/firestore";

const DatabaseContext = React.createContext();

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export const DatabaseContextProvider = ({ children }) => {
  const getElementsFromDoc = async () => {
    return getDocs(collection(db, "posts"));
  };

  const addElementsToDoc = async (dataObject) => {
    return addDoc(collection(db, "posts"), dataObject);
  };

  const values = {
    getElementsFromDoc,
    addElementsToDoc,
  };
  return (
    <DatabaseContext.Provider value={values}>
      {children}
    </DatabaseContext.Provider>
  );
};
