"use client";

import { motion } from "framer-motion";
import { Download, Settings2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ScoreRing } from "@/components/ScoreRing";
import { importProjectScoreFromJson } from "@/lib/score-import";
import { projectScoreJsonTemplate } from "@/lib/mock-data";
import {
  calculateGlobalScore,
  getScoreLabel,
  getScorePalette,
} from "@/lib/score-utils";
import type { ProjectScore } from "@/types/ScoreData";

interface ScorePageProps {
  initialProject: ProjectScore;
}

export function ScorePage({ initialProject }: ScorePageProps) {
  const [project, setProject] = useState<ProjectScore>(initialProject);
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const subs = project.subs;
  const globalScore = calculateGlobalScore(subs);
  const palette = getScorePalette(globalScore);
  const verdict = getScoreLabel(globalScore);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!popoverRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  function handleRestoreDemoData() {
    setProject(initialProject);
    setFeedback({
      tone: "success",
      message: "Les donnees demo ont ete rechargees.",
    });
    setMenuOpen(false);
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleDownloadTemplate() {
    const blob = new Blob([JSON.stringify(projectScoreJsonTemplate, null, 2)], {
      type: "application/json",
    });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = "rapidscore-template.json";
    link.click();

    URL.revokeObjectURL(objectUrl);
    setFeedback({
      tone: "success",
      message: "Le template JSON a ete telecharge.",
    });
    setMenuOpen(false);
  }

  async function handleFileImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".json")) {
      setFeedback({
        tone: "error",
        message: "Selectionne un fichier au format .json.",
      });
      event.target.value = "";
      return;
    }

    try {
      const rawJson = await file.text();
      const nextProject = importProjectScoreFromJson(rawJson, initialProject);
      setProject(nextProject);
      setFeedback({
        tone: "success",
        message: `Le fichier ${file.name} a ete importe avec succes.`,
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible d'importer ce fichier JSON.",
      });
    }

    event.target.value = "";
    setMenuOpen(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <motion.section
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/[0.5]">
              Projet analyse
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {project.name}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/[0.6] sm:text-base">
                {project.summary}
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-xl rounded-[1.5rem] border border-white/[0.08] bg-black/[0.24] p-4 lg:max-w-[35rem]">
            <div ref={popoverRef} className="absolute right-4 top-4">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/[0.64] transition hover:bg-white/[0.08] hover:text-white"
                aria-label="Ouvrir les actions de donnees"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((current) => !current)}
              >
                <Settings2 size={16} />
              </button>

              {menuOpen ? (
                <div className="absolute right-0 z-30 mt-2 w-72 rounded-xl border border-white/[0.08] bg-neutral-900 p-1 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <div className="space-y-2">
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-white/[0.75] cursor-pointer transition hover:bg-white/[0.08] hover:text-white"
                      onClick={handleDownloadTemplate}
                    >
                      <Download size={16} />
                      Download template `.json`
                    </button>

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-white/[0.75] cursor-pointer transition hover:bg-white/[0.08] hover:text-white"
                      onClick={handleUploadClick}
                    >
                      <Upload size={16} />
                      Importer un fichier `.json`
                    </button>

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-white/[0.75] cursor-pointer transition hover:bg-white/[0.08] hover:text-white"
                      onClick={handleRestoreDemoData}
                    >
                      <Settings2 size={16} />
                      Restaurer les donnees demo
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="flex justify-center sm:justify-start">
                <ScoreRing score={globalScore} size="md" />
              </div>

              <div className="space-y-3 pr-12">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/[0.38]">
                    Score global
                  </p>
                  <div
                    className="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{
                      color: palette.text,
                      backgroundColor: palette.surface,
                      boxShadow: `inset 0 0 0 1px ${palette.border}`,
                    }}
                  >
                    {verdict}
                  </div>
                  <p className="text-sm leading-6 text-white/[0.55]">
                    {project.tagline}
                  </p>
                </div>

                {feedback ? (
                  <div
                    className="rounded-2xl border px-3 py-2 text-xs leading-5"
                    style={{
                      color:
                        feedback.tone === "success" ? "#9ff7c7" : "#ffb1b1",
                      backgroundColor:
                        feedback.tone === "success"
                          ? "rgba(0, 220, 130, 0.1)"
                          : "rgba(255, 93, 93, 0.1)",
                      borderColor:
                        feedback.tone === "success"
                          ? "rgba(0, 220, 130, 0.18)"
                          : "rgba(255, 93, 93, 0.18)",
                    }}
                  >
                    {feedback.message}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {subs.map((sub) => (
            <div
              key={sub.id}
              className="rounded-[1.5rem] border border-white/[0.08] bg-black/[0.2] px-4 py-5"
            >
              <ScoreRing score={sub.score} size="md" label={sub.shortLabel} />
            </div>
          ))}
        </div>
      </motion.section>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileImport}
      />
    </div>
  );
}
