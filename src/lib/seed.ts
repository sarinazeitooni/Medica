import type { Reservation } from "@/lib/types";

function daysFromToday(offset: number): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const SEED_RESERVATIONS: Reservation[] = [
  {
    id: "seed-1",
    patientName: "سارا محمدی",
    mobile: "09121234567",
    date: daysFromToday(0),
    time: "09:30",
    notes: "ویزیت عمومی",
    status: "confirmed",
    createdAt: "2026-10-10T08:00:00.000Z",
  },
  {
    id: "seed-2",
    patientName: "علی رضایی",
    mobile: "09351234567",
    date: daysFromToday(0),
    time: "11:00",
    notes: "",
    status: "pending",
    createdAt: "2026-10-11T09:15:00.000Z",
  },
  {
    id: "seed-3",
    patientName: "مریم حسینی",
    mobile: "09199876543",
    date: daysFromToday(1),
    time: "10:15",
    notes: "پیگیری آزمایش",
    status: "pending",
    createdAt: "2026-10-12T10:00:00.000Z",
  },
  {
    id: "seed-4",
    patientName: "رضا کریمی",
    mobile: "09211234567",
    date: daysFromToday(-1),
    time: "16:45",
    notes: "",
    status: "completed",
    createdAt: "2026-10-08T12:30:00.000Z",
  },
  {
    id: "seed-5",
    patientName: "نرگس احمدی",
    mobile: "09134567890",
    date: daysFromToday(2),
    time: "14:00",
    notes: "لغو به درخواست بیمار",
    status: "cancelled",
    createdAt: "2026-10-09T14:20:00.000Z",
  },
  {
    id: "seed-6",
    patientName: "حسین جعفری",
    mobile: "09012345678",
    date: daysFromToday(1),
    time: "08:00",
    notes: "نوبت صبح",
    status: "confirmed",
    createdAt: "2026-10-13T07:45:00.000Z",
  },
];
