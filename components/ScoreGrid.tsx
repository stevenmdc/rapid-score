"use client";

import { SubScoreCard } from "@/components/SubScoreCard";
import type { SubScore } from "@/types/ScoreData";

interface ScoreGridProps {
  subs: SubScore[];
  onScoreChange: (id: SubScore["id"], score: number) => void;
}

export function ScoreGrid({ subs, onScoreChange }: ScoreGridProps) {
  return (
    <section id="score-grid" className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35">
            Sous-scores
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Les 4 parametres qui font bouger la viabilite
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/[0.55]">
          Ajuste chaque note pour simuler un meilleur positionnement, un canal
          d&apos;acquisition plus fort ou un scope produit plus simple.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {subs.map((sub, index) => (
          <SubScoreCard
            key={sub.id}
            sub={sub}
            index={index}
            onScoreChange={onScoreChange}
          />
        ))}
      </div>
    </section>
  );
}
