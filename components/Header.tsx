export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="space-y-1">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-semibold tracking-tight text-white">
              RapidScore
            </span>
            <span className="hidden text-sm text-white/35 sm:inline">
              Lighthouse-inspired idea scoring for indie builders
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
