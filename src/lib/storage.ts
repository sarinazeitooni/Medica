import type { Reservation } from "@/lib/types";
import { SEED_RESERVATIONS } from "@/lib/seed";

const STORAGE_KEY = "medica.reservations.v1";

let memoryCache: Reservation[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): Reservation[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(SEED_RESERVATIONS),
      );
      return SEED_RESERVATIONS;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return SEED_RESERVATIONS;
    return parsed as Reservation[];
  } catch {
    return SEED_RESERVATIONS;
  }
}

export function getReservationsSnapshot(): Reservation[] {
  if (typeof window === "undefined") return SEED_RESERVATIONS;
  if (!memoryCache) {
    memoryCache = readFromStorage();
  }
  return memoryCache;
}

export function getServerReservationsSnapshot(): Reservation[] {
  return SEED_RESERVATIONS;
}

export function subscribeReservations(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setReservationsStore(items: Reservation[]): void {
  memoryCache = items;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  listeners.forEach((listener) => listener());
}
