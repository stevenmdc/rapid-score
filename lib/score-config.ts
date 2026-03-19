import type { ScoreCategory, ScoreCategoryConfig } from "@/types/ScoreData";

export const SCORE_CATEGORIES: ScoreCategory[] = [
  "urgence",
  "acquisition",
  "monetisation",
  "execution",
];

export const SCORE_CONFIG: Record<ScoreCategory, ScoreCategoryConfig> = {
  urgence: {
    id: "urgence",
    label: "Urgence",
    shortLabel: "Urgence",
    sublabel: "Painkiller potentiel",
    question: "Le probleme est-il assez frequent et douloureux pour declencher un achat?",
    description:
      "Mesure l'intensite du besoin, la frequence du probleme et la pression ressentie par l'utilisateur pour le resoudre vite.",
    helper: "Plus la douleur est claire, plus le passage a l'achat est probable.",
    icon: "flame",
  },
  acquisition: {
    id: "acquisition",
    label: "Acquisition",
    shortLabel: "Acquisition",
    sublabel: "Canaux atteignables",
    question: "Peux-tu trouver des utilisateurs sans machine marketing lourde?",
    description:
      "Mesure la clarte de la cible, l'accessibilite des canaux d'acquisition et la capacite a faire connaitre le produit rapidement.",
    helper: "Une audience identifiable vaut souvent plus qu'une idee large mais diffuse.",
    icon: "radar",
  },
  monetisation: {
    id: "monetisation",
    label: "Monetisation",
    shortLabel: "Monetisation",
    sublabel: "Willingness to pay",
    question: "La valeur creee est-elle assez forte pour soutenir un pricing defendable?",
    description:
      "Mesure la disposition a payer, la clarte du business model et le potentiel de revenus recurrents ou d'upsell.",
    helper: "Une bonne idee sans pricing evident reste difficile a transformer en revenu.",
    icon: "wallet",
  },
  execution: {
    id: "execution",
    label: "Execution",
    shortLabel: "Execution",
    sublabel: "Time-to-market solo",
    question: "Peux-tu shipper vite et maintenir le produit seul sans inertie excessive?",
    description:
      "Mesure la complexite technique, les dependances externes et la charge de maintenance pour un solo builder.",
    helper: "Plus le time-to-first-dollar est court, plus la boucle d'apprentissage est saine.",
    icon: "rocket",
  },
};

export const CATEGORY_RECOMMENDATIONS: Record<ScoreCategory, string> = {
  urgence:
    "Clarifie une douleur plus immediate: cible un moment de friction concret, frequent et couteux pour l'utilisateur.",
  acquisition:
    "Identifie un canal primaire unique avant de build davantage: communaute, SEO, outbound ou audience existante.",
  monetisation:
    "Teste un pricing simple et un benefice economique explicite avant d'ajouter des fonctionnalites.",
  execution:
    "Reduis le scope a un MVP livrable en quelques jours pour atteindre un premier signal de revenu plus vite.",
};
