import { useState, useEffect } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div className="toast-notification">
      <div className="toast-content">
        {message}
      </div>
    </div>
  );
};

export default ToastNotification;