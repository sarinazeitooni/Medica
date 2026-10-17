import { isValidIranianMobile, normalizeIranianMobile } from "@/lib/phone";
import type { FieldErrors, ReservationDraft } from "@/lib/types";

export function validateReservationDraft(draft: ReservationDraft): FieldErrors {
  const errors: FieldErrors = {};
  const name = draft.patientName.trim();
  const mobile = normalizeIranianMobile(draft.mobile);
  const notes = draft.notes.trim();

  if (!name) {
    errors.patientName = "نام بیمار الزامی است.";
  } else if (name.length < 2) {
    errors.patientName = "نام باید حداقل ۲ کاراکتر باشد.";
  } else if (name.length > 80) {
    errors.patientName = "نام نباید بیشتر از ۸۰ کاراکتر باشد.";
  }

  if (!draft.mobile.trim()) {
    errors.mobile = "شماره موبایل الزامی است.";
  } else if (!isValidIranianMobile(mobile)) {
    errors.mobile = "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
  }

  if (!draft.date) {
    errors.date = "تاریخ نوبت الزامی است.";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) {
    errors.date = "فرمت تاریخ نامعتبر است.";
  }

  if (!draft.time) {
    errors.time = "ساعت نوبت الزامی است.";
  } else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(draft.time)) {
    errors.time = "فرمت ساعت نامعتبر است.";
  }

  if (notes.length > 280) {
    errors.notes = "توضیحات نباید بیشتر از ۲۸۰ کاراکتر باشد.";
  }

  return errors;
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
