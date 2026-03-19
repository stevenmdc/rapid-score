<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

components/
  ScoreRing.tsx       → L'anneau animé (style Lighthouse)
  MainScore.tsx       → Le score global central
  SubScoreCard.tsx    → Une carte de sous-score
  ScoreGrid.tsx       → La grille des 4 sous-scores
  ScorePage.tsx       → Page principale assemblée
app/
  page.tsx            → Entry point