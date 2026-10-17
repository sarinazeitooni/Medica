"use client";

import type { ToastMessage } from "@/hooks/useToast";

type Props = {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
};

const TONE_CLASS: Record<ToastMessage["tone"], string> = {
  success: "toast-success",
  error: "toast-error",
  info: "toast-info",
};

export function ToastStack({ toasts, onDismiss }: Props) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`toast ${TONE_CLASS[toast.tone]}`}
        >
          <p>{toast.text}</p>
          <button
            type="button"
            className="toast-dismiss"
            aria-label="بستن پیام"
            onClick={() => onDismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
