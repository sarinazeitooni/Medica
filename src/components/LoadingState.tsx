"use client";

export function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <p>در حال بارگذاری نوبت‌ها…</p>
    </div>
  );
}
