import { PlanGenerator } from "@/components/plan-generator";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-12">
      <PlanGenerator />
      <footer className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
        Crafted for rapid UGC concepting — run on-brand, trend-aware scripts straight into Sora or
        your preferred TikTok edit stack.
      </footer>
    </main>
  );
}
