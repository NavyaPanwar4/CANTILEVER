import { useEffect, useState } from "react";
import "./Toast.css";

export function showToast(message, type = "info", duration = 3000) {
  const evt = new CustomEvent("global-toast", {
    detail: { message, type, duration },
  });
  window.dispatchEvent(evt);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const toast = { id: Date.now(), ...e.detail };
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration);
    };

    window.addEventListener("global-toast", handler);
    return () => window.removeEventListener("global-toast", handler);
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
