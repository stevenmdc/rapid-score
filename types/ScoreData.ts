export type ScoreCategory =
  | "urgence"
  | "acquisition"
  | "monetisation"
  | "execution";

export type ScoreLevel = "low" | "medium" | "high";

export type ScoreIconKey = "flame" | "radar" | "wallet" | "rocket";

export interface ScoreCategoryConfig {
  id: ScoreCategory;
  label: string;
  shortLabel: string;
  sublabel: string;
  question: string;
  description: string;
  helper: string;
  icon: ScoreIconKey;
}

export interface SubScore extends ScoreCategoryConfig {
  score: number;
}

export interface ProjectScore {
  name: string;
  tagline: string;
  audience: string;
  summary: string;
  subs: SubScore[];
}

export interface ImportedSubScoreInput {
  id: ScoreCategory;
  score: number;
}

export interface ImportedProjectScoreInput {
  name?: string;
  tagline?: string;
  audience?: string;
  summary?: string;
  subs: ImportedSubScoreInput[];
}
