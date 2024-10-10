import React, { useState, useEffect } from "react";

interface TimeAlertProps {
  message: string;
  duration?: number; // Duration in milliseconds
}

const TimeAlert: React.FC<TimeAlertProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [duration]);

  if (!visible) return null;

  return <div style={styles.alert}>{message}</div>;
};

const styles = {
  alert: {
    padding: "10px",
    backgroundColor: "#f44336", // Red background
    color: "white",
    textAlign: "center",
    borderRadius: "5px",
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
  } as React.CSSProperties,
};

export default TimeAlert;
