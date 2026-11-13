import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-8 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-brand to-[color-mix(in_oklab,var(--brand),black_22%)] text-brand-foreground shadow-[0_2px_10px_-4px_color-mix(in_oklab,var(--brand),transparent_35%)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="size-[19px]"
      >
        <rect
          x="4"
          y="4"
          width="7"
          height="7"
          rx="2"
          fill="currentColor"
          opacity="0.95"
        />
        <rect
          x="13"
          y="4"
          width="7"
          height="7"
          rx="3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.8"
        />
        <rect
          x="4"
          y="13"
          width="7"
          height="7"
          rx="3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.8"
        />
        <rect
          x="13"
          y="13"
          width="7"
          height="7"
          rx="2"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  href = "/",
  showWord = true,
}: {
  className?: string;
  href?: string;
  showWord?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
        className,
      )}
    >
      <LogoMark />
      {showWord && (
        <span className="flex items-baseline gap-1.5">
          <span className="text-[19px] font-bold tracking-tight">بوم</span>
          <span className="text-[10px] font-medium text-muted-foreground">
            boom
          </span>
        </span>
      )}
    </Link>
  );
}
