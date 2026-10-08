import { useState, useCallback } from 'react';
import { useApp } from './AppContext';

export const usePin = () => {
  const { verifyPin } = useApp();
  const [pendingAction, setPendingAction] = useState(null);
  const [isPinOpen, setIsPinOpen] = useState(false);

  const requirePin = useCallback((action) => {
    setPendingAction(() => action);
    setIsPinOpen(true);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsPinOpen(false);
    const action = pendingAction;
    setPendingAction(null);
    if (typeof action === 'function') action();
  }, [pendingAction]);

  const close = useCallback(() => {
    setIsPinOpen(false);
    setPendingAction(null);
  }, []);

  return { requirePin, isPinOpen, handleSuccess, close, verifyPin };
};