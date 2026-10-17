"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { normalizeIranianMobile } from "@/lib/phone";
import {
  canTransition,
  computeStats,
  createId,
  filterReservations,
  sortReservations,
} from "@/lib/reservations";
import {
  getReservationsSnapshot,
  getServerReservationsSnapshot,
  setReservationsStore,
  subscribeReservations,
} from "@/lib/storage";
import type {
  Reservation,
  ReservationDraft,
  ReservationStatus,
  StatusFilter,
} from "@/lib/types";

function subscribeToNothing() {
  return () => undefined;
}

export function useReservations() {
  const items = useSyncExternalStore(
    subscribeReservations,
    getReservationsSnapshot,
    getServerReservationsSnapshot,
  );
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const visible = useMemo(
    () => sortReservations(filterReservations(items, query, statusFilter)),
    [items, query, statusFilter],
  );

  const stats = useMemo(() => computeStats(items), [items]);

  const createReservation = useCallback((draft: ReservationDraft) => {
    const reservation: Reservation = {
      id: createId(),
      patientName: draft.patientName.trim(),
      mobile: normalizeIranianMobile(draft.mobile),
      date: draft.date,
      time: draft.time,
      notes: draft.notes.trim() || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setReservationsStore([reservation, ...getReservationsSnapshot()]);
    return reservation;
  }, []);

  const updateStatus = useCallback(
    (id: string, next: ReservationStatus): boolean => {
      const currentItems = getReservationsSnapshot();
      const current = currentItems.find((item) => item.id === id);
      if (!current || !canTransition(current.status, next)) return false;

      setReservationsStore(
        currentItems.map((item) =>
          item.id === id ? { ...item, status: next } : item,
        ),
      );
      return true;
    },
    [],
  );

  return {
    items,
    visible,
    stats,
    hydrated,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    createReservation,
    updateStatus,
  };
}
