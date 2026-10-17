"use client";

import { STATUS_LABELS } from "@/lib/reservations";
import type { StatusFilter } from "@/lib/types";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  onCreateClick: () => void;
  resultCount: number;
};

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "pending", label: STATUS_LABELS.pending },
  { value: "confirmed", label: STATUS_LABELS.confirmed },
  { value: "completed", label: STATUS_LABELS.completed },
  { value: "cancelled", label: STATUS_LABELS.cancelled },
];

export function FilterBar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  onCreateClick,
  resultCount,
}: Props) {
  return (
    <section className="filter-bar" aria-label="جستجو و فیلتر">
      <div className="filter-main">
        <label className="sr-only" htmlFor="reservation-search">
          جستجو بر اساس نام یا موبایل
        </label>
        <input
          id="reservation-search"
          type="search"
          className="search-input"
          placeholder="جستجو نام بیمار یا موبایل…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
        />

        <div
          className="status-filters"
          role="group"
          aria-label="فیلتر وضعیت"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={
                status === filter.value
                  ? "filter-chip is-active"
                  : "filter-chip"
              }
              aria-pressed={status === filter.value}
              onClick={() => onStatusChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <p className="result-count" aria-live="polite">
          {resultCount} نتیجه
        </p>
        <button type="button" className="btn-primary" onClick={onCreateClick}>
          نوبت جدید
        </button>
      </div>
    </section>
  );
}
