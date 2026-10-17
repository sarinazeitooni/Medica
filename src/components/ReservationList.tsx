"use client";

import { formatIranianMobileDisplay } from "@/lib/phone";
import { formatPersianDate, formatPersianTime } from "@/lib/format";
import type { Reservation, ReservationStatus } from "@/lib/types";
import { EmptyState } from "@/components/EmptyState";
import { StatusActions } from "@/components/StatusActions";
import { StatusBadge } from "@/components/StatusBadge";

type Props = {
  items: Reservation[];
  onTransition: (id: string, next: ReservationStatus) => void;
  onCreateClick: () => void;
  hasActiveFilters: boolean;
};

export function ReservationList({
  items,
  onTransition,
  onCreateClick,
  hasActiveFilters,
}: Props) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={hasActiveFilters ? "نتیجه‌ای یافت نشد" : "هنوز نوبتی ثبت نشده"}
        description={
          hasActiveFilters
            ? "عبارت جستجو یا فیلتر وضعیت را تغییر دهید."
            : "اولین نوبت بیمار را ثبت کنید تا در این فهرست نمایش داده شود."
        }
        actionLabel={hasActiveFilters ? undefined : "ثبت نوبت"}
        onAction={hasActiveFilters ? undefined : onCreateClick}
      />
    );
  }

  return (
    <>
      <div className="reservation-table-wrap" role="region" aria-label="جدول نوبت‌ها">
        <table className="reservation-table">
          <thead>
            <tr>
              <th scope="col">بیمار</th>
              <th scope="col">موبایل</th>
              <th scope="col">تاریخ</th>
              <th scope="col">ساعت</th>
              <th scope="col">وضعیت</th>
              <th scope="col">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="patient-cell">
                    <strong>{item.patientName}</strong>
                    {item.notes ? (
                      <span className="muted-text">{item.notes}</span>
                    ) : null}
                  </div>
                </td>
                <td dir="ltr" className="ltr-cell">
                  {formatIranianMobileDisplay(item.mobile)}
                </td>
                <td>{formatPersianDate(item.date)}</td>
                <td dir="ltr" className="ltr-cell">
                  {formatPersianTime(item.time)}
                </td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td>
                  <StatusActions
                    status={item.status}
                    onTransition={(next) => onTransition(item.id, next)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="reservation-cards" aria-label="فهرست نوبت‌ها">
        {items.map((item) => (
          <li key={item.id} className="reservation-card">
            <div className="card-top">
              <div>
                <h3>{item.patientName}</h3>
                <p dir="ltr" className="ltr-cell">
                  {formatIranianMobileDisplay(item.mobile)}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <dl className="card-meta">
              <div>
                <dt>تاریخ</dt>
                <dd>{formatPersianDate(item.date)}</dd>
              </div>
              <div>
                <dt>ساعت</dt>
                <dd dir="ltr">{formatPersianTime(item.time)}</dd>
              </div>
            </dl>
            {item.notes ? <p className="card-notes">{item.notes}</p> : null}
            <StatusActions
              status={item.status}
              onTransition={(next) => onTransition(item.id, next)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
