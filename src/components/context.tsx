import React from "react";

// In your context.tsx file
interface ContextType {
  postInfoWriteChange: string;
  setPostInfoWriteChange: React.Dispatch<React.SetStateAction<string>>;
  postInfoWrite: string;
  setPostInfoWrite: React.Dispatch<React.SetStateAction<string>>;
  searchInputAll: boolean;
  setSearchInputAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostInfoContext = React.createContext<ContextType | undefined>(
  undefined,
);
