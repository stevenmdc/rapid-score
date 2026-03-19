"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { getScorePalette } from "@/lib/score-utils";

type RingSize = "sm" | "md" | "lg";

interface ScoreRingProps {
  score: number;
  size?: RingSize;
  label?: string;
  showScale?: boolean;
}

const SIZE_MAP: Record<
  RingSize,
  {
    radius: number;
    stroke: number;
    viewBox: number;
    valueClassName: string;
    labelClassName: string;
  }
> = {
  sm: {
    radius: 33,
    stroke: 5,
    viewBox: 92,
    valueClassName: "text-xl",
    labelClassName: "text-[11px]",
  },
  md: {
    radius: 42,
    stroke: 6,
    viewBox: 112,
    valueClassName: "text-2xl",
    labelClassName: "text-xs",
  },
  lg: {
    radius: 78,
    stroke: 10,
    viewBox: 196,
    valueClassName: "text-5xl sm:text-6xl",
    labelClassName: "text-sm",
  },
};

function formatScore(score: number) {
  return Number.isInteger(score) ? score.toFixed(0) : score.toFixed(1);
}

export function ScoreRing({
  score,
  size = "md",
  label,
  showScale = true,
}: ScoreRingProps) {
  const { radius, stroke, viewBox, valueClassName, labelClassName } = SIZE_MAP[size];
  const palette = getScorePalette(score);
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.max(0, Math.min(10, score));
  const progress = safeScore / 10;
  const offset = circumference * (1 - progress);
  const center = viewBox / 2;

  const [displayScore, setDisplayScore] = useState(0);
  const previousScore = useRef(0);

  useEffect(() => {
    const controls = animate(previousScore.current, safeScore, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        setDisplayScore(value);
      },
    });

    previousScore.current = safeScore;

    return () => controls.stop();
  }, [safeScore]);

  return (
    <div className="relative flex flex-col items-center gap-3">
      <div
        className="relative"
        style={{
          filter: `drop-shadow(0 0 22px ${palette.glow})`,
        }}
      >
        <svg
          width={viewBox}
          height={viewBox}
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={palette.track}
            strokeWidth={stroke}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={palette.ring}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-[74%] w-[74%] items-center justify-center rounded-full border border-white/[0.06] bg-black/[0.35]"
            style={{
              boxShadow: `inset 0 0 0 1px ${palette.border}, inset 0 0 40px ${palette.surface}`,
            }}
          >
            <div className="space-y-1 text-center">
              <div
                className={`font-mono font-semibold tracking-tight ${valueClassName}`}
                style={{ color: palette.ring }}
              >
                {formatScore(displayScore)}
              </div>
              {showScale ? (
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/[0.35]">
                  sur 10
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {label ? (
        <p className={`text-center font-medium text-white/[0.7] ${labelClassName}`}>
          {label}
        </p>
      ) : null}
    </div>
  );
}
