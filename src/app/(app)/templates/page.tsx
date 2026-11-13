import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftIcon,
  LayoutTemplateIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  TrendingUpIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { templateCategories, templates } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "قالب‌ها" };

export default function TemplatesPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="نقطهٔ شروع"
        title="قالب‌ها"
        description="قالب‌ها فقط یک پیشنهادند، نه یک چارچوب. هر کدام را برداری می‌توانی آزادانه تغییرش بدهی یا کاملاً از نو بسازی."
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <LayoutTemplateIcon className="size-3.5" />
          قالب‌های من
        </Button>
        <Button size="sm" className="gap-1.5">
          <PlusIcon className="size-3.5" />
          قالب تازه
        </Button>
      </PageHeader>

      <div className="mt-6 overflow-hidden rounded-xl bg-gradient-to-l from-brand/[0.07] via-card to-card p-4 ring-1 ring-foreground/8 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span
            className="tint-bg-strong tint-text grid size-10 shrink-0 place-items-center rounded-xl"
            style={tintStyle("amber")}
          >
            <SparklesIcon className="size-5" />
          </span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold">
              نمی‌دانی از کجا شروع کنی؟
            </div>
            <p className="mt-1 text-[11.5px] leading-5 text-muted-foreground">
              به دستیار بوم بگو چه در ذهنت داری؛ یک صفحهٔ اولیه با ساختار
              پیشنهادی می‌سازد که هر بخشش را می‌توانی عوض کنی.
            </p>
          </div>
          <Link href="/ai">
            <Button variant="outline" size="sm" className="gap-1.5">
              <SparklesIcon className="size-3.5 text-brand" />
              پیشنهاد بگیر
              <ArrowLeftIcon className="size-3" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {templateCategories.map((category, index) => (
            <button
              key={category}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[11.5px] transition-colors",
                index === 0
                  ? "bg-foreground font-medium text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="جست‌وجوی قالب"
            className="h-8 bg-card ps-8 text-[11.5px] md:w-52"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => (
          <article
            key={template.name}
            className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/5"
          >
            <div className="relative">
              <Preview
                kind={template.kind}
                accent={template.accent}
                className="h-40"
              />
              {template.badge && (
                <Badge
                  variant="secondary"
                  className="absolute start-2.5 top-2.5 gap-1 bg-card/90 text-[9px] text-foreground ring-1 ring-foreground/5 backdrop-blur"
                >
                  <TrendingUpIcon className="size-2.5" />
                  {template.badge}
                </Badge>
              )}
              <button
                aria-label="نشان‌کردن"
                className="absolute end-2.5 top-2.5 grid size-6 place-items-center rounded-md bg-card/85 text-muted-foreground opacity-0 ring-1 ring-foreground/5 backdrop-blur transition-opacity group-hover:opacity-100"
              >
                <StarIcon className="size-3" />
              </button>
            </div>

            <div className="flex flex-1 flex-col p-3.5">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-[13px] font-semibold">
                  {template.name}
                </h3>
                <span className="ms-auto shrink-0 rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">
                  {template.category}
                </span>
              </div>
              <p className="mt-1.5 flex-1 text-[11px] leading-5 text-muted-foreground">
                {template.description}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
                <span className="text-[10px] text-muted-foreground">
                  {template.uses} استفاده
                </span>
                <Link
                  href="/workspaces"
                  className="flex items-center gap-1 text-[10.5px] font-medium text-brand transition-opacity hover:opacity-80"
                >
                  استفاده از قالب
                  <ArrowLeftIcon className="size-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
