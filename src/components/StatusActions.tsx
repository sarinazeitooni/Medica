"use client";

import { STATUS_LABELS, STATUS_TRANSITIONS } from "@/lib/reservations";
import type { ReservationStatus } from "@/lib/types";

type Props = {
  status: ReservationStatus;
  onTransition: (next: ReservationStatus) => void;
  disabled?: boolean;
};

export function StatusActions({ status, onTransition, disabled }: Props) {
  const nextStatuses = STATUS_TRANSITIONS[status];

  if (nextStatuses.length === 0) {
    return <span className="muted-text">بدون اقدام</span>;
  }

  return (
    <div className="status-actions">
      {nextStatuses.map((next) => (
        <button
          key={next}
          type="button"
          className={`btn-ghost status-action-${next}`}
          disabled={disabled}
          onClick={() => onTransition(next)}
        >
          {STATUS_LABELS[next]}
        </button>
      ))}
    </div>
  );
}
