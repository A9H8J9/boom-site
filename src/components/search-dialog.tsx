"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  CornerDownLeftIcon,
  FileTextIcon,
  FrameIcon,
  LayoutTemplateIcon,
  SearchIcon,
  SparklesIcon,
  SquareCheckIcon,
} from "lucide-react";
import { navGroups } from "@/lib/nav";
import { templates, workspaces } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { tintStyle, type Accent } from "@/lib/accents";

type Result = {
  title: string;
  hint: string;
  href: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: Accent;
};

const pageResults: Result[] = navGroups.flatMap((group) =>
  group.items.map((item) => ({
    title: item.label,
    hint: group.label,
    href: item.href,
    group: "صفحه‌ها",
    icon: item.icon,
  })),
);

const canvasResults: Result[] = workspaces.map((workspace) => ({
  title: workspace.name,
  hint: `${workspace.canvases} بوم · ${workspace.members} عضو`,
  href: "/workspaces",
  group: "بوم‌ها",
  icon: FrameIcon,
  accent: workspace.accent,
}));

const templateResults: Result[] = templates.slice(0, 4).map((template) => ({
  title: template.name,
  hint: template.category,
  href: "/templates",
  group: "قالب‌ها",
  icon: LayoutTemplateIcon,
  accent: template.accent,
}));

const allResults = [...pageResults, ...canvasResults, ...templateResults];

const quickActions = [
  { title: "ساخت بوم تازه", icon: SparklesIcon, href: "/workspaces" },
  { title: "افزودن وظیفه", icon: SquareCheckIcon, href: "/tasks" },
  { title: "نوشتن یادداشت", icon: FileTextIcon, href: "/workspaces" },
  { title: "افزودن عضو به تیم", icon: LayoutTemplateIcon, href: "/team" },
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => {
    const q = query.trim();
    if (!q) return allResults;
    return allResults.filter(
      (result) =>
        result.title.includes(q) || result.hint.includes(q.toLowerCase()),
    );
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIndex((value) => Math.min(value + 1, results.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIndex((value) => Math.max(value - 1, 0));
      }
      if (event.key === "Enter" && results[index]) {
        router.push(results[index].href);
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange, results, index, router]);

  if (!open) return null;

  const groups = Array.from(new Set(results.map((result) => result.group)));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/25 px-3 pt-[12vh] backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-popover shadow-2xl ring-1 ring-foreground/10">
        <div className="flex items-center gap-2.5 border-b border-border/80 px-4">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIndex(0);
            }}
            placeholder="جست‌وجو در بوم، قالب‌ها و صفحه‌ها…"
            className="h-12 w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          className="max-h-[52vh] overflow-y-auto p-2 thin-scrollbar"
        >
          {results.length === 0 && (
            <div className="px-3 py-8 text-center text-[12.5px] text-muted-foreground">
              چیزی پیدا نشد. عبارت دیگری را امتحان کن.
            </div>
          )}

          {groups.map((group) => (
            <div key={group} className="mb-1">
              <div className="px-2 pb-1 pt-2 text-[10px] font-medium text-muted-foreground">
                {group}
              </div>
              {results
                .filter((result) => result.group === group)
                .map((result) => {
                  const globalIndex = results.indexOf(result);
                  const active = globalIndex === index;
                  return (
                    <button
                      key={`${result.group}-${result.title}`}
                      type="button"
                      onMouseEnter={() => setIndex(globalIndex)}
                      onClick={() => {
                        router.push(result.href);
                        onOpenChange(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-start text-[12.5px] transition-colors",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/60",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-md",
                          result.accent
                            ? "tint-bg tint-text"
                            : "bg-muted text-muted-foreground",
                        )}
                        style={result.accent ? tintStyle(result.accent) : undefined}
                      >
                        <result.icon className="size-3.5" />
                      </span>
                      <span className="truncate">{result.title}</span>
                      <span className="truncate text-[10.5px] text-muted-foreground">
                        {result.hint}
                      </span>
                      {active ? (
                        <CornerDownLeftIcon className="ms-auto size-3.5 text-muted-foreground" />
                      ) : (
                        <ArrowLeftIcon className="ms-auto size-3.5 text-transparent" />
                      )}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-border/80 bg-muted/40 px-4 py-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-card px-1">↑</kbd>
            <kbd className="rounded border border-border bg-card px-1">↓</kbd>
            جابه‌جایی
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-card px-1">↵</kbd>
            باز کردن
          </span>
          <span className="ms-auto flex items-center gap-1">
            {quickActions.length} میان‌بر فعال
          </span>
        </div>
      </div>
    </div>
  );
}
