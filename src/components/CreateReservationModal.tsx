"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { normalizeIranianMobile, toLatinDigits } from "@/lib/phone";
import {
  hasFieldErrors,
  validateReservationDraft,
} from "@/lib/validation";
import type { FieldErrors, ReservationDraft } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (draft: ReservationDraft) => void;
  /** Remount key so form state resets whenever the modal is opened. */
  formKey: number;
};

const EMPTY_DRAFT: ReservationDraft = {
  patientName: "",
  mobile: "",
  date: "",
  time: "",
  notes: "",
};

function CreateReservationModalForm({
  onClose,
  onSubmit,
}: Omit<Props, "open" | "formKey">) {
  const titleId = useId();
  const descId = useId();
  const trapRef = useFocusTrap(true);
  const [draft, setDraft] = useState<ReservationDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const updateField = <K extends keyof ReservationDraft>(
    key: K,
    value: ReservationDraft[K],
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateReservationDraft(draft);
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) return;

    setSubmitting(true);
    onSubmit({
      ...draft,
      patientName: draft.patientName.trim(),
      mobile: normalizeIranianMobile(draft.mobile),
      notes: draft.notes.trim(),
    });
    setSubmitting(false);
  };

  return (
    <div className="modal-root" role="presentation">
      <button
        type="button"
        className="modal-backdrop"
        aria-label="بستن پنجره"
        onClick={onClose}
      />
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="modal-panel"
        tabIndex={-1}
      >
        <header className="modal-header">
          <div>
            <h2 id={titleId}>ثبت نوبت جدید</h2>
            <p id={descId}>اطلاعات بیمار و زمان مراجعه را وارد کنید.</p>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="بستن"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="patientName">نام بیمار</label>
            <input
              id="patientName"
              name="patientName"
              value={draft.patientName}
              onChange={(e) => updateField("patientName", e.target.value)}
              aria-invalid={Boolean(errors.patientName)}
              aria-describedby={
                errors.patientName ? "patientName-error" : undefined
              }
              autoComplete="name"
            />
            {errors.patientName ? (
              <p id="patientName-error" className="field-error" role="alert">
                {errors.patientName}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="mobile">موبایل</label>
            <input
              id="mobile"
              name="mobile"
              inputMode="tel"
              dir="ltr"
              className="ltr-input"
              placeholder="09123456789"
              value={draft.mobile}
              onChange={(e) =>
                updateField("mobile", toLatinDigits(e.target.value))
              }
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
              autoComplete="tel"
            />
            {errors.mobile ? (
              <p id="mobile-error" className="field-error" role="alert">
                {errors.mobile}
              </p>
            ) : null}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="date">تاریخ</label>
              <input
                id="date"
                name="date"
                type="date"
                dir="ltr"
                className="ltr-input"
                value={draft.date}
                onChange={(e) => updateField("date", e.target.value)}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "date-error" : undefined}
              />
              {errors.date ? (
                <p id="date-error" className="field-error" role="alert">
                  {errors.date}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="time">ساعت</label>
              <input
                id="time"
                name="time"
                type="time"
                dir="ltr"
                className="ltr-input"
                value={draft.time}
                onChange={(e) => updateField("time", e.target.value)}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? "time-error" : undefined}
              />
              {errors.time ? (
                <p id="time-error" className="field-error" role="alert">
                  {errors.time}
                </p>
              ) : null}
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">توضیحات (اختیاری)</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={draft.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={errors.notes ? "notes-error" : undefined}
            />
            {errors.notes ? (
              <p id="notes-error" className="field-error" role="alert">
                {errors.notes}
              </p>
            ) : null}
          </div>

          <footer className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              انصراف
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              ثبت نوبت
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export function CreateReservationModal({
  open,
  onClose,
  onSubmit,
  formKey,
}: Props) {
  if (!open) return null;

  return (
    <CreateReservationModalForm
      key={formKey}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
