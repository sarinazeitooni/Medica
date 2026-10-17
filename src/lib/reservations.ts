import type {
  Reservation,
  ReservationStats,
  ReservationStatus,
  StatusFilter,
} from "@/lib/types";

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "در انتظار",
  confirmed: "تأیید شده",
  completed: "انجام شده",
  cancelled: "لغو شده",
};

export const STATUS_TRANSITIONS: Record<
  ReservationStatus,
  ReservationStatus[]
> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

export function canTransition(
  from: ReservationStatus,
  to: ReservationStatus,
): boolean {
  return STATUS_TRANSITIONS[from].includes(to);
}

/** Sort by appointment date+time ascending, then createdAt. */
export function sortReservations(items: Reservation[]): Reservation[] {
  return [...items].sort((a, b) => {
    const aKey = `${a.date}T${a.time}`;
    const bKey = `${b.date}T${b.time}`;
    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return a.createdAt.localeCompare(b.createdAt);
  });
}

export function filterReservations(
  items: Reservation[],
  query: string,
  status: StatusFilter,
): Reservation[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    if (status !== "all" && item.status !== status) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      item.patientName,
      item.mobile,
      item.notes ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function computeStats(items: Reservation[]): ReservationStats {
  return items.reduce<ReservationStats>(
    (acc, item) => {
      acc.total += 1;
      acc[item.status] += 1;
      return acc;
    },
    { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
  );
}

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `res_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
