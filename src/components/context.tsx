import React, { createContext, useState, useContext } from "react";

interface ContextType {
  postInfoWriteChange: string;
  setPostInfoWriteChange: React.Dispatch<React.SetStateAction<string>>;
  postInfoWrite: string;
  setPostInfoWrite: React.Dispatch<React.SetStateAction<string>>;
  searchInputAll: boolean;
  setSearchInputAll: React.Dispatch<React.SetStateAction<boolean>>;
  setGetUserInfo: (info: any) => void; // Add this line
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostInfoContext = createContext<ContextType | undefined>(
  undefined,
);

export const PostInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [postInfoWriteChange, setPostInfoWriteChange] = useState("");
  const [postInfoWrite, setPostInfoWrite] = useState("");
  const [searchInputAll, setSearchInputAll] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const setGetUserInfo = (info: any) => {
    // Implement your logic here
  };

  return (
    <PostInfoContext.Provider
      value={{
        postInfoWriteChange,
        setPostInfoWriteChange,
        postInfoWrite,
        setPostInfoWrite,
        searchInputAll,
        setSearchInputAll,
        setGetUserInfo, // Provide the function here
        editMode,
        setEditMode,
      }}
    >
      {children}
    </PostInfoContext.Provider>
  );
};

export const usePostInfoContext = () => {
  const context = useContext(PostInfoContext);
  if (context === undefined) {
    throw new Error(
      "usePostInfoContext must be used within a PostInfoProvider",
    );
  }
  return context;
};
