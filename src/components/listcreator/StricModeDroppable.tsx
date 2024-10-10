import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

// Definerer StrictModeDroppable komponenten
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Bruker requestAnimationFrame for å aktivere komponenten
    const animation = requestAnimationFrame(() => setEnabled(true));

    // Rydder opp ved unmounting av komponenten
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  // Returnerer null hvis ikke aktivert, noe som forhindrer rendering
  if (!enabled) {
    return null;
  }

  // Returnerer Droppable-komponenten med props og children
  return <Droppable {...props}>{children}</Droppable>;
};
