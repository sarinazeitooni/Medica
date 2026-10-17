"use client";

import { useCallback, useState } from "react";
import { CreateReservationModal } from "@/components/CreateReservationModal";
import { FilterBar } from "@/components/FilterBar";
import { LoadingState } from "@/components/LoadingState";
import { ReservationList } from "@/components/ReservationList";
import { StatsPanel } from "@/components/StatsPanel";
import { ToastStack } from "@/components/ToastStack";
import { useReservations } from "@/hooks/useReservations";
import { useToast } from "@/hooks/useToast";
import { STATUS_LABELS } from "@/lib/reservations";
import type { ReservationDraft, ReservationStatus } from "@/lib/types";

export function Dashboard() {
  const {
    visible,
    stats,
    hydrated,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    createReservation,
    updateStatus,
  } = useReservations();
  const { toasts, push, dismiss } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const openModal = useCallback(() => {
    setFormKey((key) => key + 1);
    setModalOpen(true);
  }, []);

  const handleCreate = useCallback(
    (draft: ReservationDraft) => {
      createReservation(draft);
      setModalOpen(false);
      push("success", "نوبت با موفقیت ثبت شد.");
    },
    [createReservation, push],
  );

  const handleTransition = useCallback(
    (id: string, next: ReservationStatus) => {
      const ok = updateStatus(id, next);
      if (ok) {
        push("success", `وضعیت به «${STATUS_LABELS[next]}» تغییر کرد.`);
      } else {
        push("error", "این تغییر وضعیت مجاز نیست.");
      }
    },
    [push, updateStatus],
  );

  const hasActiveFilters = query.trim().length > 0 || statusFilter !== "all";

  return (
    <div className="dashboard">
      <header className="page-header">
        <div>
          <p className="brand">مدیکا</p>
          <h1>داشبورد نوبت‌دهی</h1>
          <p className="subtitle">
            مدیریت نوبت بیماران، وضعیت‌ها و آمار مطب در یک نگاه.
          </p>
        </div>
      </header>

      <StatsPanel stats={stats} loading={!hydrated} />

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        onCreateClick={openModal}
        resultCount={visible.length}
      />

      <section className="list-section" aria-label="فهرست نوبت‌ها">
        {!hydrated ? (
          <LoadingState />
        ) : (
          <ReservationList
            items={visible}
            onTransition={handleTransition}
            onCreateClick={openModal}
            hasActiveFilters={hasActiveFilters}
          />
        )}
      </section>

      <CreateReservationModal
        open={modalOpen}
        formKey={formKey}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
      />

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
