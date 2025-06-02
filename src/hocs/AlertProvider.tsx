'use client';

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { AlertBox, AlertBoxProps, AlertBoxVariants } from '@/components/AlertBox';
import { Portal } from './Portal';

type AlertStateType = {
  message: string;
  title: string;
  variant: AlertBoxVariants;
  visible: boolean;
};

type AlertContextType = {
  alert: AlertStateType;
  show: (props: AlertBoxProps) => void;
  hide: () => void;
};

const defaultAlert: AlertStateType = {
  message: '',
  title: '',
  variant: 'default',
  visible: false
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alert, setAlert] = useState<AlertStateType>(defaultAlert);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [timeoutRef]);

  //need to memoize this because the useEffect will go into an infinite loop if we don't
  const show = useCallback(({ message, title, variant }: AlertBoxProps) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setAlert({ message, title, variant, visible: true });

    timeoutRef.current = setTimeout(() => {
      hide();
    }, 2500);
  }, []);

  const AlertBoxComponent = () => {
    if (!alert.visible || !alert.message || !alert.title) return null;
    return <AlertBox variant={alert.variant} title={alert.title} message={alert.message} />;
  };

  return (
    <AlertContext.Provider value={{ alert, show, hide }}>
      {children}
      <Portal selector="alert-box-root">
        <AlertBoxComponent />
      </Portal>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
