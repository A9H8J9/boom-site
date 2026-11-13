import type { ReactNode } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-8z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.9 0 5.4-1 7.2-2.8l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.8 0-5.2-1.9-6-4.5H2.4v2.8C4.2 20.6 7.8 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M6 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.2H2.4C1.5 8.9 1 10.4 1 12s.5 3.1 1.4 4.8L6 14z"
      />
      <path
        fill="#EA4335"
        d="M12 5.5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.4 2.3 14.9 1.3 12 1.3 7.8 1.3 4.2 3.7 2.4 7.2L6 10c.8-2.6 3.2-4.5 6-4.5z"
      />
    </svg>
  );
}

export function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 fill-current", className)} aria-hidden="true">
      <path d="M16.4 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.7-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1.1 8.5.7 1 1.6 2.1 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.3 1.2-2.4-.1 0-2.6-1-2.6-3.4zM14.4 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" />
    </svg>
  );
}

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[24px] border border-ink/12 bg-card px-5 pb-5 pt-5 shadow-[0_1px_2px_color-mix(in_oklab,var(--ink),transparent_94%),0_32px_80px_-52px_color-mix(in_oklab,var(--ink),transparent_35%)] sm:px-6 sm:pb-6 sm:pt-6">
      {children}
    </div>
  );
}

function TabLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex-1 rounded-[9px] py-1.5 text-center transition-all duration-150",
        active
          ? "bg-brand/12 font-semibold text-brand ring-1 ring-brand/25 dark:bg-brand/20 dark:text-brand"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export function AuthTabs({ active }: { active: "signin" | "signup" }) {
  return (
    <div className="flex items-center gap-1 rounded-[11px] bg-muted/80 p-1 text-[12px] ring-1 ring-ink/6">
      <TabLink href="/signin" active={active === "signin"}>
        ورود
      </TabLink>
      <TabLink href="/signup" active={active === "signup"}>
        ثبت‌نام
      </TabLink>
    </div>
  );
}

export function AuthField({
  id,
  label,
  hint,
  className,
  ...props
}: React.ComponentProps<"input"> & {
  id: string;
  label: string;
  hint?: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center justify-between gap-2 text-[11.5px] font-medium"
      >
        <span>{label}</span>
        {hint}
      </label>
      <Input
        id={id}
        className={cn(
          "h-11 rounded-[11px] border border-ink/14 bg-background/60 px-3 text-[13px] shadow-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-brand/60 focus-visible:ring-3 focus-visible:ring-brand/12 dark:bg-input/20",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        className="flex h-11 items-center justify-center gap-2 rounded-[11px] border border-ink/14 bg-card text-[12px] font-medium transition-colors hover:bg-muted/60"
      >
        <GoogleGlyph />
        گوگل
      </button>
      <button
        type="button"
        className="flex h-11 items-center justify-center gap-2 rounded-[11px] border border-ink/14 bg-card text-[12px] font-medium transition-colors hover:bg-muted/60"
      >
        <AppleGlyph />
        اپل
      </button>
    </div>
  );
}

export function OrDivider({ label = "یا با ایمیل" }: { label?: string }) {
  return (
    <div className="my-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export const cartoonSubmit =
  "h-11 w-full gap-1.5 rounded-[11px] bg-brand text-[12.5px] font-semibold text-brand-foreground shadow-[0_10px_24px_-16px_var(--brand)] transition-colors hover:bg-[color-mix(in_oklab,var(--brand),black_8%)]";

export function Mascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 210"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <g
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M50 190c20-7 120-7 140 0"
          strokeWidth="3"
          strokeDasharray="1.5 8"
          opacity="0.35"
        />
        <path d="M58 112c-13 3-19 13-15 22 3 8 12 10 19 7" fill="#FFFDF6" />
        <path d="M182 112c13 3 19 13 15 22-3 8-12 10-19 7" fill="#FFFDF6" />
        <rect x="62" y="24" width="116" height="146" rx="26" fill="#FFFDF6" />
        <path d="M62 60c0-15 13-28 28-28" fill="#F7CE5B" opacity="0.85" />
        <ellipse cx="103" cy="95" rx="5.5" ry="7" fill="var(--ink)" />
        <ellipse cx="137" cy="95" rx="5.5" ry="7" fill="var(--ink)" />
        <circle cx="101.5" cy="92.5" r="1.7" fill="#FFFDF6" stroke="none" />
        <circle cx="135.5" cy="92.5" r="1.7" fill="#FFFDF6" stroke="none" />
        <path d="M106 115c7 9 21 9 28 0" strokeWidth="3.6" />
        <ellipse cx="87" cy="110" rx="8" ry="4.5" fill="#F5A98F" stroke="none" opacity="0.7" />
        <ellipse cx="153" cy="110" rx="8" ry="4.5" fill="#F5A98F" stroke="none" opacity="0.7" />
        <path d="M96 170v12" /><path d="M144 170v12" />
        <path d="M88 184h16" strokeWidth="5" stroke="#F5A98F" />
        <path d="M136 184h16" strokeWidth="5" stroke="#F5A98F" />
      </g>
      <g
        transform="rotate(16 196 128)"
        stroke="var(--ink)"
        strokeWidth="3.6"
        strokeLinejoin="round"
      >
        <rect x="188" y="76" width="14" height="62" rx="3" fill="#F7CE5B" />
        <path d="M188 138h14l-7 14z" fill="#F5A98F" />
        <path d="M188 152l7 7 7-7" fill="#241F1A" />
        <path d="M188 84h14" strokeWidth="2.2" opacity="0.35" />
      </g>
    </svg>
  );
}
