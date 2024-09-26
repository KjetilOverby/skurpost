import React, { ReactNode } from "react";

interface EditModeProps {
  children: ReactNode;
  editMode: boolean;
}

export const EditMode: React.FC<EditModeProps> = ({ children, editMode }) => {
  return <div>{editMode && children}</div>;
};
