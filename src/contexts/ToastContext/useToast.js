import { useContext } from "react";
import { ToastContext } from "./ToastContext";

// Custom hook for consuming the Toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};