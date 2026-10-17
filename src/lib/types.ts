export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type Reservation = {
  id: string;
  patientName: string;
  mobile: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  status: ReservationStatus;
  createdAt: string; // ISO
};

export type ReservationDraft = {
  patientName: string;
  mobile: string;
  date: string;
  time: string;
  notes: string;
};

export type StatusFilter = ReservationStatus | "all";

export type ReservationStats = {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
};

export type FieldErrors = Partial<
  Record<"patientName" | "mobile" | "date" | "time" | "notes", string>
>;
