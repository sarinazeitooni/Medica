import { STATUS_LABELS } from "@/lib/reservations";
import type { ReservationStatus } from "@/lib/types";

type Props = {
  status: ReservationStatus;
};

export function StatusBadge({ status }: Props) {
  return (
    <span className={`status-badge status-${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
