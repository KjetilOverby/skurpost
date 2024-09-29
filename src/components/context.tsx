import React, { createContext, useState, useContext } from "react";

interface ContextType {
  postInfoWriteChange: string;
  setPostInfoWriteChange: React.Dispatch<React.SetStateAction<string>>;
  postInfoWrite: string;
  setPostInfoWrite: React.Dispatch<React.SetStateAction<string>>;
  searchInputAll: boolean;
  setSearchInputAll: React.Dispatch<React.SetStateAction<boolean>>;
  setGetUserInfo: (info: unknown) => void; // Use unknown instead of any
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  sawType: string;
  setSawType: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
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
  const [sawType, setSawType] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const setGetUserInfo = (info: unknown) => {
    // Implement your logic here
  };

  return (
    <PostInfoContext.Provider
      value={{
        postInfoWriteChange,
        setPostInfoWriteChange,
        postInfoWrite,
        setSawType,
        setPostInfoWrite,
        searchInputAll,
        setSearchInputAll,
        setGetUserInfo,
        editMode,
        setEditMode,
        searchInput,
        setSearchInput,
        sawType: "",
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
