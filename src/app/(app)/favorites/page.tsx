import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftIcon,
  DatabaseIcon,
  FileTextIcon,
  FrameIcon,
  KanbanIcon,
  MoreHorizontalIcon,
  SearchIcon,
  StarIcon,
  StickyNoteIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { favoriteItems } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";

export const metadata: Metadata = { title: "نشان‌شده‌ها" };

const typeIcon: Record<string, typeof FrameIcon> = {
  بوم: FrameIcon,
  سند: FileTextIcon,
  تخته: KanbanIcon,
  "پایگاه‌داده": DatabaseIcon,
  یادداشت: StickyNoteIcon,
  نمونه: FrameIcon,
};

const tabs = ["همه", "بوم‌ها", "اسناد", "پایگاه‌داده", "یادداشت‌ها"];

export default function FavoritesPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="دسترسی سریع"
        title="نشان‌شده‌ها"
        description="چیزهایی که ستاره کردی، همیشه یک کلیک فاصله دارند. مرتبشان کن یا ستاره‌شان را بردار."
      >
        <div className="relative hidden sm:block">
          <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="جست‌وجو"
            className="h-8 w-44 bg-card ps-8 text-[11.5px]"
          />
        </div>
        <Button variant="outline" size="sm">
          مرتب‌سازی: تازه‌ترین
        </Button>
      </PageHeader>

      <div className="mt-6 flex items-center gap-1 overflow-x-auto border-b border-border/70 pb-3 no-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={
              index === 0
                ? "shrink-0 rounded-full bg-foreground px-3 py-1.5 text-[11.5px] font-medium text-background"
                : "shrink-0 rounded-full px-3 py-1.5 text-[11.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            }
          >
            {tab}
            {index === 0 && (
              <span className="ms-1.5 text-[10px] opacity-70">
                {favoriteItems.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8">
          <div className="hidden grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center gap-3 border-b border-border/70 px-4 py-2 text-[9.5px] text-muted-foreground sm:grid">
            <span className="w-10" />
            <span>نام</span>
            <span className="w-24">فضای کاری</span>
            <span className="w-24">آخرین تغییر</span>
            <span className="w-6" />
          </div>

          <div className="divide-y divide-border/60">
            {favoriteItems.map((item) => {
              const Icon = typeIcon[item.type];
              return (
                <Link
                  key={item.title}
                  href="/workspaces"
                  className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 transition-colors hover:bg-muted/40 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] sm:px-4"
                >
                  <Preview
                    kind={item.kind}
                    accent={item.accent}
                    bare
                    className="h-9 w-12 rounded-md ring-1 ring-foreground/5"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <Icon className="size-3 shrink-0 text-muted-foreground" />
                      <span className="truncate text-[12px] font-medium">
                        {item.title}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[9.5px] text-muted-foreground">
                      <span
                        className="tint-bg tint-text rounded px-1.5 py-px"
                        style={tintStyle(item.accent)}
                      >
                        {item.type}
                      </span>
                      <span className="sm:hidden">{item.workspace}</span>
                    </div>
                  </div>
                  <span className="hidden w-24 truncate text-[10.5px] text-muted-foreground sm:block">
                    {item.workspace}
                  </span>
                  <span className="hidden w-24 text-[10px] text-muted-foreground sm:block">
                    {item.updated}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="size-3.5 fill-brand text-brand" />
                    <MoreHorizontalIcon className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <aside className="space-y-3">
          <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/8">
            <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
              <StarIcon className="size-3.5 fill-brand text-brand" />
              دسترسی سریع
            </div>
            <p className="mt-1.5 text-[10.5px] leading-5 text-muted-foreground">
              هر صفحه‌ای را می‌توانی با نگه‌داشتن <kbd className="rounded border px-1">⌘</kbd>{" "}
              و زدن <kbd className="rounded border px-1">D</kbd> نشان کنی. در
              هر دستگاهی در دسترس است.
            </p>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 px-2.5 py-2">
              <span className="text-[10.5px]">۶ مورد نشان‌شده</span>
              <Link
                href="/workspaces"
                className="flex items-center gap-1 text-[10.5px] text-brand hover:underline"
              >
                همه
                <ArrowLeftIcon className="size-2.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-dashed p-4">
            <div className="text-[11.5px] font-medium">
              بوم‌های پرکاربرد تیم
            </div>
            <div className="mt-3 space-y-2">
              {["نقشهٔ راه بهار", "برد وظایف محصول", "کتاب راهنمای برند"].map(
                (title) => (
                  <div
                    key={title}
                    className="flex items-center justify-between text-[10.5px]"
                  >
                    <span className="truncate text-muted-foreground">{title}</span>
                    <span className="text-[9px] text-muted-foreground/70">
                      پرکاربرد
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
