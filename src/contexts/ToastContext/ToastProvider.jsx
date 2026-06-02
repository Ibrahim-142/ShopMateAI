import { useState, useCallback } from "react";
import { ToastContext } from "./ToastContext";

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a toast, prevent duplicates
  const addToast = useCallback((message, type = "info", duration = 3000) => {
    setToasts((prev) => {
      if (prev.some((t) => t.message === message && t.type === type)) return prev;
      const id = Date.now() + Math.random();
      return [...prev, { id, message, type }];
    });

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.message !== message || t.type !== type));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded p-3 shadow-md text-white ${
              t.type === "error"
                ? "bg-red-500"
                : t.type === "success"
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};