import React from "react";

export const EditMode = ({ children, editMode }) => {
  return <div>{editMode && children}</div>;
};
