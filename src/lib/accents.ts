import type { CSSProperties } from "react";

export const accents = {
  clay: { dot: "#c2603f", label: "خاکی" },
  teal: { dot: "#3c7d7a", label: "فیروزه‌ای" },
  amber: { dot: "#c08a2e", label: "کهربایی" },
  sage: { dot: "#5f7d5a", label: "سبز" },
  violet: { dot: "#7464a8", label: "بنفش" },
  sky: { dot: "#4d76a8", label: "آبی" },
  rose: { dot: "#b25a76", label: "گلبهی" },
  slate: { dot: "#78716c", label: "خاکستری" },
} as const;

export type Accent = keyof typeof accents;

export function tintStyle(accent: Accent = "slate"): CSSProperties {
  return { "--tint": accents[accent].dot } as CSSProperties;
}
