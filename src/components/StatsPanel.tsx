"use client";

import { toPersianDigits } from "@/lib/format";
import type { ReservationStats } from "@/lib/types";

type Props = {
  stats: ReservationStats;
  loading?: boolean;
};

const CARDS: {
  key: keyof ReservationStats;
  label: string;
  tone: string;
}[] = [
  { key: "total", label: "کل نوبت‌ها", tone: "stat-total" },
  { key: "pending", label: "در انتظار", tone: "stat-pending" },
  { key: "confirmed", label: "تأیید شده", tone: "stat-confirmed" },
  { key: "completed", label: "انجام شده", tone: "stat-completed" },
  { key: "cancelled", label: "لغو شده", tone: "stat-cancelled" },
];

export function StatsPanel({ stats, loading }: Props) {
  return (
    <section aria-label="آمار نوبت‌ها" className="stats-grid">
      {CARDS.map((card) => (
        <article key={card.key} className={`stat-card ${card.tone}`}>
          <p className="stat-label">{card.label}</p>
          <p className="stat-value" aria-busy={loading || undefined}>
            {loading ? "…" : toPersianDigits(stats[card.key])}
          </p>
        </article>
      ))}
    </section>
  );
}
