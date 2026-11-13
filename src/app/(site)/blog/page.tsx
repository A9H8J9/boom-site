"use client";

import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlog, type BlogPost } from "@/lib/apis";
import { faDate } from "@/lib/utils";
import { tintStyle } from "@/lib/accents";
import type { Accent } from "@/lib/accents";

const accentCycle: Accent[] = [
  "clay",
  "teal",
  "violet",
  "amber",
  "sage",
  "sky",
  "rose",
  "slate",
];

const kindCycle = ["canvas", "board", "doc", "timeline", "table", "list"] as const;

function postAccent(post: BlogPost, index: number): Accent {
  return accentCycle[index % accentCycle.length];
}

function postKind(post: BlogPost, index: number) {
  return kindCycle[index % kindCycle.length];
}

function postCategory(post: BlogPost): string {
  return post.tags[0]?.name ?? "بوم";
}

export default function BlogPage() {
  const { data: posts, isLoading } = useBlog();

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[1080px] px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="h-32 animate-pulse rounded-2xl bg-card ring-1 ring-foreground/8" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl bg-card ring-1 ring-foreground/8"
            />
          ))}
        </div>
      </div>
    );
  }

  const [featured, ...rest] = posts ?? [];

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      <div className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-lg">
          <span className="text-[11px] font-medium text-brand">دفترچهٔ بوم</span>
          <h1 className="mt-1.5 text-[28px] font-bold leading-tight tracking-tight sm:text-[32px]">
            یادداشت‌هایی دربارهٔ فکر کردن
          </h1>
          <p className="mt-2 text-[12px] leading-6 text-muted-foreground">
            از پشت صحنهٔ ساخت بوم تا ایده‌هایی دربارهٔ خلاقیت، سازمان‌دهی و
            فضای آزاد.
          </p>
        </div>
      </div>

      {featured ? (
        <>
          <article className="group mt-7 grid gap-5 overflow-hidden rounded-2xl bg-card p-3 ring-1 ring-foreground/8 sm:p-4 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div className="relative overflow-hidden rounded-xl">
              <Preview
                kind={postKind(featured, 0)}
                accent={postAccent(featured, 0)}
                className="h-52 sm:h-64"
              />
              <span
                className="tint-bg tint-text absolute start-3 top-3 rounded-full px-2 py-0.5 text-[9.5px] font-medium backdrop-blur"
                style={tintStyle(postAccent(featured, 0))}
              >
                {postCategory(featured)}
              </span>
            </div>

            <div className="px-2 pb-3 sm:px-3">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>مقالهٔ ویژه</span>
                <span className="size-0.5 rounded-full bg-muted-foreground" />
                <span>{faDate(featured.publishedAt ?? featured.createdAt)}</span>
              </div>
              <h2 className="mt-3 text-[19px] font-bold leading-[1.6] tracking-tight sm:text-[22px]">
                {featured.title}
              </h2>
              <p className="mt-2.5 text-[11.5px] leading-6 text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1.5">
                  خواندن مقاله
                  <ArrowLeftIcon className="size-3.5" />
                </Button>
                <span className="text-[10px] text-muted-foreground">
                  {featured.author.name}
                </span>
              </div>
            </div>
          </article>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {rest.map((post, index) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5"
              >
                <Preview
                  kind={postKind(post, index + 1)}
                  accent={postAccent(post, index + 1)}
                  className="h-36"
                />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2 text-[9.5px] text-muted-foreground">
                    <span
                      className="tint-bg tint-text rounded-full px-2 py-0.5"
                      style={tintStyle(postAccent(post, index + 1))}
                    >
                      {postCategory(post)}
                    </span>
                    <span>{faDate(post.publishedAt ?? post.createdAt)}</span>
                  </div>
                  <h2 className="mt-2.5 text-[14px] font-semibold leading-6 transition-colors group-hover:text-brand">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-[11px] leading-5 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-1 pt-3 text-[10.5px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    ادامهٔ مطلب
                    <ArrowLeftIcon className="size-3" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-7 rounded-2xl bg-card px-6 py-10 text-center text-[12px] text-muted-foreground ring-1 ring-foreground/8">
          هنوز نوشته‌ای منتشر نشده؛ به‌زودی اولین یادداشت‌ها اینجا می‌آیند.
        </p>
      )}

      <section className="mt-10 flex flex-col items-center gap-3 rounded-2xl bg-muted/40 px-6 py-8 text-center ring-1 ring-foreground/5">
        <span
          className="tint-bg-strong tint-text grid size-9 place-items-center rounded-xl"
          style={tintStyle("clay")}
        >
          <MailIcon className="size-4" />
        </span>
        <h2 className="text-[15px] font-semibold">ماهی یک نامه، پر از ایده</h2>
        <p className="max-w-sm text-[11px] leading-5 text-muted-foreground">
          خلاصهٔ نوشته‌ها، قالب‌های تازه و یادداشت‌های تیم بوم. بدون تبلیغ، بدون
          اسپم.
        </p>
        <form className="mt-1 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="ایمیل تو"
            dir="ltr"
            className="h-9 bg-card text-[11.5px]"
          />
          <Button size="lg" className="shrink-0">
            عضویت
          </Button>
        </form>
      </section>
    </div>
  );
}
