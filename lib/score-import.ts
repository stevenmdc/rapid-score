import { SCORE_CATEGORIES, SCORE_CONFIG } from "@/lib/score-config";
import { clampScore } from "@/lib/score-utils";
import type {
  ImportedProjectScoreInput,
  ImportedSubScoreInput,
  ProjectScore,
  ScoreCategory,
} from "@/types/ScoreData";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isScoreCategory(value: unknown): value is ScoreCategory {
  return typeof value === "string" && SCORE_CATEGORIES.includes(value as ScoreCategory);
}

function parseImportedSubScore(value: unknown): ImportedSubScoreInput {
  if (!isObject(value)) {
    throw new Error("Chaque entree `subs` doit etre un objet.");
  }

  if (!isScoreCategory(value.id)) {
    throw new Error("Chaque entree `subs` doit contenir un `id` valide.");
  }

  if (typeof value.score !== "number" || Number.isNaN(value.score)) {
    throw new Error("Chaque entree `subs` doit contenir un `score` numerique.");
  }

  if (value.score < 0 || value.score > 10) {
    throw new Error("Chaque `score` doit etre compris entre 0 et 10.");
  }

  return {
    id: value.id,
    score: clampScore(value.score),
  };
}

function parseImportedProject(value: unknown): ImportedProjectScoreInput {
  if (!isObject(value)) {
    throw new Error("Le fichier JSON doit contenir un objet a la racine.");
  }

  if (!Array.isArray(value.subs)) {
    throw new Error("Le fichier JSON doit contenir un tableau `subs`.");
  }

  return {
    name: typeof value.name === "string" ? value.name : undefined,
    tagline: typeof value.tagline === "string" ? value.tagline : undefined,
    audience: typeof value.audience === "string" ? value.audience : undefined,
    summary: typeof value.summary === "string" ? value.summary : undefined,
    subs: value.subs.map(parseImportedSubScore),
  };
}

export function importProjectScoreFromJson(
  rawJson: string,
  fallbackProject: ProjectScore,
): ProjectScore {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error("Le fichier n'est pas un JSON valide.");
  }

  const imported = parseImportedProject(parsed);
  const importedIds = new Set(imported.subs.map((sub) => sub.id));

  if (importedIds.size !== SCORE_CATEGORIES.length) {
    throw new Error("Le fichier doit contenir exactement les 4 sous-scores attendus.");
  }

  for (const category of SCORE_CATEGORIES) {
    if (!importedIds.has(category)) {
      throw new Error(`Le sous-score \`${category}\` est manquant dans le fichier.`);
    }
  }

  return {
    name: imported.name?.trim() || fallbackProject.name,
    tagline: imported.tagline?.trim() || fallbackProject.tagline,
    audience: imported.audience?.trim() || fallbackProject.audience,
    summary: imported.summary?.trim() || fallbackProject.summary,
    subs: SCORE_CATEGORIES.map((category) => {
      const importedSub = imported.subs.find((sub) => sub.id === category);

      return {
        ...SCORE_CONFIG[category],
        score: importedSub ? importedSub.score : 0,
      };
    }),
  };
}
