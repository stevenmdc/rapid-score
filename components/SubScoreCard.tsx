"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Flame,
  Info,
  Radar,
  Rocket,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { startTransition, useState, type CSSProperties } from "react";

import { ScoreRing } from "@/components/ScoreRing";
import { getScoreLabel, getScorePalette } from "@/lib/score-utils";
import type { ScoreIconKey, SubScore } from "@/types/ScoreData";

interface SubScoreCardProps {
  sub: SubScore;
  index: number;
  onScoreChange: (id: SubScore["id"], score: number) => void;
}

const ICON_MAP: Record<ScoreIconKey, LucideIcon> = {
  flame: Flame,
  radar: Radar,
  wallet: WalletCards,
  rocket: Rocket,
};

export function SubScoreCard({ sub, index, onScoreChange }: SubScoreCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const palette = getScorePalette(sub.score);
  const Icon = ICON_MAP[sub.icon];

  return (
    <motion.article
      className="relative overflow-hidden rounded-[1.5rem] border bg-white/[0.035] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.24)]"
      style={{
        borderColor: palette.border,
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)), radial-gradient(circle at top right, ${palette.surface}, transparent 48%)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: 0.08 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/[0.25] px-3 py-1.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: palette.surface, color: palette.ring }}
            >
              <Icon size={15} />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/[0.6]">
              {sub.label}
            </span>
          </div>

          <div>
            <p className="text-lg font-semibold text-white">{sub.sublabel}</p>
            <p className="mt-2 max-w-[34ch] text-sm leading-6 text-white/[0.58]">
              {sub.question}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/[0.08] bg-white/[0.05] p-2 text-white/[0.42] transition hover:text-white"
          aria-label={`Afficher le detail de ${sub.label}`}
          onClick={() => setShowInfo((current) => !current)}
        >
          <Info size={16} />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <ScoreRing score={sub.score} size="sm" showScale={false} />

        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/[0.38]">
            Signal actuel
          </p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-3xl font-semibold text-white">
                {sub.score.toFixed(1)}
              </p>
              <p className="text-sm" style={{ color: palette.text }}>
                {getScoreLabel(sub.score)}
              </p>
            </div>
            <p className="max-w-[18ch] text-right text-xs leading-5 text-white/[0.48]">
              {sub.helper}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={sub.score}
          onChange={(event) => {
            const nextScore = Number(event.target.value);

            startTransition(() => {
              onScoreChange(sub.id, nextScore);
            });
          }}
          className="score-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
          style={
            {
              "--slider-accent": palette.ring,
            } as CSSProperties
          }
          aria-label={`Modifier le score ${sub.label}`}
        />

        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/[0.32]">
          <span>0.0</span>
          <span>10.0</span>
        </div>
      </div>

      <AnimatePresence>
        {showInfo ? (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(180deg,rgba(8,10,16,0.18),rgba(8,10,16,0.94))] p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-[1.25rem] border border-white/[0.08] bg-black/[0.4] p-5 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/[0.35]">
                {sub.label}
              </p>
              <p className="mt-3 text-base font-semibold text-white">{sub.description}</p>
              <p className="mt-3 text-sm leading-7 text-white/[0.62]">{sub.helper}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
