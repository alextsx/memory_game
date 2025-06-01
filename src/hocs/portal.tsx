import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren<{
  selector: string;
}>;

export const Portal = ({ children, selector }: PortalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted || typeof document === 'undefined') return null;

  const portalRoot = document.getElementById(selector) as HTMLElement | null;

  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
};
