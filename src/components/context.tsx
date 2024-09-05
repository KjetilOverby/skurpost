import React from "react";

// In your context.tsx file
interface ContextType {
  postInfoWriteChange: string;
  setPostInfoWriteChange: React.Dispatch<React.SetStateAction<string>>;
  anotherVariable: string;
  setAnotherVariable: React.Dispatch<React.SetStateAction<string>>;
}

export const PostInfoContext = React.createContext<ContextType | undefined>(
  undefined,
);
