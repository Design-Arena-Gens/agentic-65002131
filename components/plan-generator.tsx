/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

type CreativeBrief = {
  brand: string;
  product: string;
  differentiator: string;
  audience: string;
  tone: string;
  trend: string;
  offer: string;
  platformHandle: string;
};

type ClipBeat = {
  beat: string;
  hook: string;
  shotIdea: string;
  cta: string;
  vibeNotes: string;
};

type VideoPlan = {
  title: string;
  narrative: string;
  heroMessage: string;
  anchorEmotion: string;
  clips: ClipBeat[];
  soundtrack: string;
  hashTags: string[];
};

const TREND_LIBRARY = [
  {
    label: "Hyper-fast 'before & after'",
    storyboardHint: "Lean on split screens and bold captions"
  },
  {
    label: "POV confession cam",
    storyboardHint: "Selfie framing with quick jump cuts"
  },
  {
    label: "Unexpected duet reaction",
    storyboardHint: "Pair with reaction-style B-roll layered over CTA"
  },
  {
    label: "Aesthetic restock remix",
    storyboardHint: "Satisfying ASMR restock shots, crisp audio"
  },
  {
    label: "Micro-vlog day-in-the-life",
    storyboardHint: "Overlay timestamp captions, minimal voiceover"
  },
  {
    label: "Flash trend explainer",
    storyboardHint: "Punchy captions + kinetic typography"
  }
];

const HOOK_PATTERNS = [
  "I tried {product} so you don't have to",
  "Stop scrolling if you care about {audienceMission}",
  "This {productCategory} hack actually works",
  "POV: you're tired of {painPoint}... until now",
  "TikTok made me do it, but here's the twist",
  "If you have {audienceTrait}, this goes crazy"
];

const CTA_LIBRARY = [
  "Tap the link to lock in the drop",
  "Comment 'ME' and I'll DM the code",
  "Save this so you don't miss the restock",
  "Hit follow for part 2 with raw BTS",
  "Live in bio — snag yours before midnight",
  "Duet this when you try it"
];

const SOUNDTRACKS = [
  "Warm pluggnb 140bpm beat for bouncey pacing",
  "Ambient jersey club flip of a nostalgic hook",
  "Trending sped-up R&B loop with crisp hi hats",
  "Synthy hyperpop that peaks at 15s for the CTA",
  "Glitchy trap instrumental with beat drop at 7s"
];

function pickRandom<T>(values: T[], seed: number) {
  const index = Math.floor(seed * values.length) % values.length;
  return values[index];
}

function buildHashTags(brief: CreativeBrief, trend: string) {
  const base = [
    `#${brief.brand.replace(/\s+/g, "")}`,
    "#TikTokMadeMeBuyIt",
    "#UGCStory",
    "#Sora",
    "#AIStoryboards"
  ];
  const trendTag = `#${trend
    .split(" ")[0]
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 14)}`;
  return Array.from(new Set([...base, trendTag, `#${brief.tone.replace(/\s+/g, "")}`]));
}

const DEFAULT_BRIEF: CreativeBrief = {
  brand: "",
  product: "",
  differentiator: "",
  audience: "",
  tone: "Bold & punchy",
  trend: TREND_LIBRARY[0].label,
  offer: "",
  platformHandle: ""
};

export function PlanGenerator() {
  const [brief, setBrief] = useState<CreativeBrief>(DEFAULT_BRIEF);
  const [plans, setPlans] = useState<VideoPlan[] | null>(null);
  const [isGenerating, setGenerating] = useState(false);

  const activeTrend = useMemo(
    () => TREND_LIBRARY.find((item) => item.label === brief.trend) ?? TREND_LIBRARY[0],
    [brief.trend]
  );

  const canGenerate =
    brief.brand.trim().length > 1 &&
    brief.product.trim().length > 1 &&
    brief.audience.trim().length > 2 &&
    brief.differentiator.trim().length > 2;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setGenerating(true);

    const baselineSeed =
      brief.brand.length +
      brief.product.length * 1.7 +
      brief.audience.length * 1.2 +
      brief.differentiator.length * 0.6;

    const computedPlans: VideoPlan[] = Array.from({ length: 2 }).map((_, videoIndex) => {
      const uniqueSeed = baselineSeed + videoIndex * 13.7;
      const hookTemplate = pickRandom(HOOK_PATTERNS, uniqueSeed);

      const heroMessage = hookTemplate
        .replace("{product}", brief.product)
        .replace(
          "{audienceMission}",
          brief.audience
            .replace(/^\w/, (char) => char.toLowerCase())
            .replace(/\.$/, "")
        )
        .replace("{productCategory}", brief.product)
        .replace(
          "{painPoint}",
          brief.differentiator
            .split(" ")
            .slice(0, 6)
            .join(" ")
        )
        .replace(
          "{audienceTrait}",
          brief.audience
            .split(" ")
            .slice(0, 3)
            .join(" ")
        );

      const clips: ClipBeat[] = Array.from({ length: 2 }).map((_, clipIndex) => {
        const clipSeed = uniqueSeed + clipIndex * 4.2;
        const cta = pickRandom(CTA_LIBRARY, clipSeed + 2.3);
        const vibeOptions = [
          "Overlay animated captions in brand palette",
          "Use match cuts timed to the beat drop",
          "Anchor each frame with the brand icon bottom-left",
          "Blend AI-generated Sora footage with IRL B-roll",
          "End each clip with a consistent emoji sticker",
          "Leverage micro zooms to punch lines"
        ];
        const vibeNotes = pickRandom(vibeOptions, clipSeed + 4.7);

        const beat = clipIndex === 0 ? "Hook (0-15s)" : "Payoff + CTA (15-30s)";
        const shotIdea =
          clipIndex === 0
            ? `Open with ${activeTrend.storyboardHint.toLowerCase()}`
            : "Switch to punch-in reaction shot and dynamic captions";

        const hook =
          clipIndex === 0
            ? heroMessage
            : `Proof point: ${brief.differentiator}. ${
                brief.offer ? `Offer: ${brief.offer}. ` : ""
              }${cta}`;

        return {
          beat,
          hook,
          shotIdea,
          cta,
          vibeNotes
        };
      });

      const soundtrack = pickRandom(SOUNDTRACKS, uniqueSeed + 11.1);

      return {
        title: `${brief.brand} x ${brief.trend.split(" ")[0]} ${videoIndex === 0 ? "Launch" : "Retarget"}`,
        narrative: `${brief.tone} storytelling that leans on ${activeTrend.label.toLowerCase()} energy.`,
        heroMessage,
        anchorEmotion: videoIndex === 0 ? "Awe & intrigue" : "Trust & urgency",
        clips,
        soundtrack,
        hashTags: buildHashTags(brief, brief.trend)
      };
    });

    window.setTimeout(() => {
      setPlans(computedPlans);
      setGenerating(false);
    }, 320);
  };

  const handleReset = () => {
    setBrief(DEFAULT_BRIEF);
    setPlans(null);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-brand/10 backdrop-blur">
        <header className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-light">
            Sora Viral UGC Engine
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-white">
            Blueprint two 30s TikTok edits in <span className="text-brand">seconds</span>
          </h1>
          <p className="mt-4 text-sm text-white/70">
            Feed the brand DNA and we&apos;ll map two synced 30s videos, each split into 15 second
            clips engineered for retention, consistency, and viral traction.
          </p>
        </header>

        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleGenerate();
          }}
        >
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">Brand / Project</span>
            <input
              value={brief.brand}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, brand: event.target.value }))
              }
              placeholder="e.g. NeonFuel Energy"
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
              required
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">Hero Product / Offer</span>
            <input
              value={brief.product}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, product: event.target.value }))
              }
              placeholder="e.g. sugar-free adaptogen shot"
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
              required
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">Why it pops</span>
            <input
              value={brief.differentiator}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, differentiator: event.target.value }))
              }
              placeholder="e.g. clinically backed stamina + zero crash"
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
              required
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">Target viewer</span>
            <input
              value={brief.audience}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, audience: event.target.value }))
              }
              placeholder="e.g. high-output creators craving clean energy"
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
              required
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">Creative tone</span>
            <input
              value={brief.tone}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, tone: event.target.value }))
              }
              placeholder="e.g. Bold & punchy"
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">Offer / urgency</span>
            <input
              value={brief.offer}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, offer: event.target.value }))
              }
              placeholder="e.g. 48h creator launch code ENERGY20"
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">TikTok handle (optional)</span>
            <input
              value={brief.platformHandle}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, platformHandle: event.target.value }))
              }
              placeholder="@neonfuelenergy"
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
            />
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium text-white/80">Trend archetype</span>
            <select
              value={brief.trend}
              onChange={(event) =>
                setBrief((prev) => ({ ...prev, trend: event.target.value }))
              }
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-white outline-none transition focus:border-brand focus:shadow-focus"
            >
              {TREND_LIBRARY.map((trend) => (
                <option key={trend.label}>{trend.label}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 rounded-2xl border border-dashed border-brand/40 bg-brand/10 p-5 text-xs text-white/80">
            <p className="font-semibold uppercase tracking-[0.3em] text-brand-light">
              Trend notes
            </p>
            <p>{activeTrend.storyboardHint}</p>
            <p className="text-white/60">
              We&apos;ll keep pacing consistent across both videos for evergreen brand recall.
            </p>
          </div>

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              disabled={!canGenerate || isGenerating}
              className={clsx(
                "flex-1 rounded-xl bg-brand px-5 py-3 font-semibold text-white shadow-lg shadow-brand/40 transition",
                "hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-brand/40 disabled:text-white/50"
              )}
            >
              {isGenerating ? "Rendering beats..." : "Generate blueprint"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-6">
        {!plans && (
          <div className="relative flex h-full min-h-[380px] flex-col justify-center overflow-hidden rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-white/60">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/30 via-slate-900 to-slate-950 opacity-60 blur-3xl" />
            <p className="text-sm uppercase tracking-[0.4em] text-brand-light">
              Awaiting brief
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-white">
              Drop the brand DNA to auto-compose your viral-ready UGC storyboards.
            </h2>
            <p className="mt-6 text-base text-white/70">
              We&apos;ll output two synced 30s edits with 15s hook and payoff beats designed for
              TikTok Sora renders, complete with on-brand pacing, copy, and CTA.
            </p>
          </div>
        )}

        {plans && (
          <div className="grid gap-6">
            {plans.map((plan, index) => (
              <article
                key={plan.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-slate-900/80 to-slate-950 p-6 shadow-xl shadow-black/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-brand-light">
                      Video {index + 1}
                    </p>
                    <h2 className="text-2xl font-semibold text-white">{plan.title}</h2>
                  </div>
                  <span className="rounded-full border border-brand/40 bg-brand/20 px-4 py-1 text-xs font-semibold text-brand-light">
                    30s total · 2 x 15s clips
                  </span>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-sm text-white/80">
                    <p>
                      <span className="font-semibold text-white/90">Narrative: </span>
                      {plan.narrative}
                    </p>
                    <p>
                      <span className="font-semibold text-white/90">Hero message: </span>
                      {plan.heroMessage}
                    </p>
                    <p>
                      <span className="font-semibold text-white/90">Emotion anchor: </span>
                      {plan.anchorEmotion}
                    </p>
                    {brief.platformHandle && (
                      <p>
                        <span className="font-semibold text-white/90">On-screen tag: </span>
                        {brief.platformHandle}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 rounded-2xl border border-brand/30 bg-brand/10 p-4 text-sm text-white/85">
                    <p>
                      <span className="font-semibold text-white">Soundtrack cue:</span>{" "}
                      {plan.soundtrack}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Hashtags:</span> {plan.hashTags.join(" · ")}
                    </p>
                    {brief.offer && (
                      <p>
                        <span className="font-semibold text-white">Offer reminder:</span>{" "}
                        {brief.offer}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {plan.clips.map((clip) => (
                    <div
                      key={clip.beat}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-brand-light">
                        <span>{clip.beat}</span>
                        <span>15s</span>
                      </div>
                      <p className="text-lg font-semibold text-white">{clip.hook}</p>
                      <p className="text-sm text-white/70">
                        <span className="font-semibold text-white">Shot idea:</span> {clip.shotIdea}
                      </p>
                      <p className="text-sm text-white/70">
                        <span className="font-semibold text-white">CTA:</span> {clip.cta}
                      </p>
                      <p className="text-xs text-white/60">
                        <span className="font-semibold text-white/70">Consistency cue:</span>{" "}
                        {clip.vibeNotes}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
              <p>
                Need more variations? Tap generate again — we remix pacing and CTA while keeping the
                brand voice locked.
              </p>
              <button
                type="button"
                onClick={handleGenerate}
                className="rounded-xl border border-brand/40 bg-brand/20 px-4 py-2 font-semibold text-brand-light transition hover:bg-brand/30"
              >
                Refresh remix
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
