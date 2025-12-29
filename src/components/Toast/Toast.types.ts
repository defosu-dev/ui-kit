export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  id?: string | number;
  variant?: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
  showCloseButton?: boolean;
}
