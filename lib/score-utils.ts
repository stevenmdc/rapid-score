import { CATEGORY_RECOMMENDATIONS } from "@/lib/score-config";
import type { ProjectScore, ScoreLevel, SubScore } from "@/types/ScoreData";

export function roundScore(score: number): number {
  return Math.round(score * 10) / 10;
}

export function clampScore(score: number): number {
  return Math.max(0, Math.min(10, roundScore(score)));
}

export function calculateGlobalScore(subs: SubScore[]): number {
  if (subs.length === 0) {
    return 0;
  }

  const total = subs.reduce((sum, sub) => sum + clampScore(sub.score), 0);
  return roundScore(total / subs.length);
}

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 7) {
    return "high";
  }

  if (score >= 4) {
    return "medium";
  }

  return "low";
}

export function getScorePalette(score: number) {
  const level = getScoreLevel(score);

  if (level === "high") {
    return {
      level,
      ring: "#00dc82",
      text: "#7bf5b2",
      glow: "rgba(0, 220, 130, 0.28)",
      surface: "rgba(0, 220, 130, 0.12)",
      border: "rgba(0, 220, 130, 0.26)",
      track: "rgba(255, 255, 255, 0.12)",
    };
  }

  if (level === "medium") {
    return {
      level,
      ring: "#ffb13d",
      text: "#ffd084",
      glow: "rgba(255, 177, 61, 0.26)",
      surface: "rgba(255, 177, 61, 0.1)",
      border: "rgba(255, 177, 61, 0.24)",
      track: "rgba(255, 255, 255, 0.12)",
    };
  }

  return {
    level,
    ring: "#ff5d5d",
    text: "#ff9d9d",
    glow: "rgba(255, 93, 93, 0.24)",
    surface: "rgba(255, 93, 93, 0.1)",
    border: "rgba(255, 93, 93, 0.22)",
    track: "rgba(255, 255, 255, 0.12)",
  };
}

export function getScoreLabel(score: number): string {
  const level = getScoreLevel(score);

  if (level === "high") {
    return "Prometteur";
  }

  if (level === "medium") {
    return "Risque";
  }

  return "Fragile";
}

export function getScoreSummary(score: number): string {
  if (score >= 8.5) {
    return "Tres bon pari pour chercher un premier revenu rapidement.";
  }

  if (score >= 7) {
    return "Potentiel solide, avec quelques angles a clarifier avant de scaler.";
  }

  if (score >= 5) {
    return "Le projet peut marcher, mais il y a encore trop d'incertitude pour accelerer.";
  }

  return "Le signal est trop faible: il faut resserrer l'idee avant d'investir davantage.";
}

export function buildRecommendations(subs: SubScore[], project: ProjectScore): string[] {
  const weakest = [...subs].sort((left, right) => left.score - right.score);
  const focus = weakest.slice(0, 2).map((sub) => CATEGORY_RECOMMENDATIONS[sub.id]);

  return [
    `Commence par valider ${weakest[0]?.label.toLowerCase() ?? "le signal principal"} avant d'elargir le scope de ${project.name}.`,
    ...focus,
  ];
}
