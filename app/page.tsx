import { Header } from "@/components/Header";
import { ScorePage } from "@/components/ScorePage";
import { mockProjectScore } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ScorePage initialProject={mockProjectScore} />
      </main>
    </div>
  );
}
