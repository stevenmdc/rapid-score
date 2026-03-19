import { SCORE_CONFIG } from "@/lib/score-config";
import type { ProjectScore, ScoreCategory } from "@/types/ScoreData";

const baseScores: Record<ScoreCategory, number> = {
  urgence: 7.6,
  acquisition: 6.4,
  monetisation: 8.3,
  execution: 8.7,
};

export const mockProjectScore: ProjectScore = {
  name: "Rapid Landing AI",
  tagline: "Un micro-SaaS qui genere des landing pages vendables pour freelances et solopreneurs.",
  audience: "Freelances, studios solo et builders qui ont besoin de lancer une offre vite.",
  summary:
    "Le projet a un bon potentiel de revenus rapide si l'acquisition est canalisee sur une niche claire plutot qu'un marche trop large.",
  subs: Object.values(SCORE_CONFIG).map((category) => ({
    ...category,
    score: baseScores[category.id],
  })),
};

export const projectScoreJsonTemplate = {
  name: "Nom du projet",
  tagline: "Une phrase courte qui explique clairement ce que fait le produit.",
  audience: "La cible principale du projet",
  summary: "Un resume rapide du contexte ou de l'hypothese business.",
  subs: [
    {
      id: "urgence",
      score: 7,
    },
    {
      id: "acquisition",
      score: 5.5,
    },
    {
      id: "monetisation",
      score: 6.5,
    },
    {
      id: "execution",
      score: 8,
    },
  ],
};
