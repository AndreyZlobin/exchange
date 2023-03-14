import { PropsWithChildren, useMemo } from 'react';

interface LayoutModalProps {
  show: boolean;
}

export const LayoutModal = ({ children, show }: PropsWithChildren<LayoutModalProps>) =>
  useMemo(() => <>{show && children}</>, [show]);
