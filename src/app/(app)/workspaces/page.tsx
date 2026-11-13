import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpDownIcon,
  FrameIcon,
  Grid2x2Icon,
  ListIcon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  UsersIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/components/preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { workspaces } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "بوم‌های من" };

const filters = ["همه", "اخیر", "اشتراکی", "شخصی", "آرشیو"];
const kinds = ["canvas", "board", "doc", "table", "gallery", "wiki"] as const;

export default function WorkspacesPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="کتابخانهٔ فضای کاری"
        title="بوم‌های من"
        description="هر بوم یک صفحهٔ آزاد است؛ می‌توانی روی آن بنویسی، بچسبانی، بکشی یا فقط فکر کنی. هیچ ساختار اجباری‌ای وجود ندارد."
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <SlidersHorizontalIcon className="size-3.5" />
          فیلترها
        </Button>
        <Button size="sm" className="gap-1.5">
          <PlusIcon className="size-3.5" />
          بوم تازه
        </Button>
      </PageHeader>

      <div className="mt-6 flex flex-col gap-3 border-b border-border/70 pb-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[11.5px] transition-colors",
                index === 0
                  ? "bg-foreground font-medium text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جست‌وجو در بوم‌ها"
              className="h-8 bg-card ps-8 text-[11.5px]"
            />
          </div>
          <Button variant="outline" size="icon-sm" aria-label="مرتب‌سازی">
            <ArrowUpDownIcon />
          </Button>
          <div className="flex items-center gap-0.5 rounded-lg border p-0.5">
            <Button size="icon-xs" variant="secondary" aria-label="نمایش شبکه">
              <Grid2x2Icon />
            </Button>
            <Button size="icon-xs" variant="ghost" aria-label="نمایش فهرست">
              <ListIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/workspaces"
          className="group flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-transparent p-6 text-center transition-colors hover:border-brand/50 hover:bg-brand/[0.03]"
        >
          <span className="mb-3 grid size-11 place-items-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
            <PlusIcon className="size-5" />
          </span>
          <span className="text-[13px] font-medium">یک صفحهٔ خالی</span>
          <span className="mt-1 max-w-[190px] text-[11px] leading-5 text-muted-foreground">
            از صفر شروع کن. بعداً هر ساختاری که خواستی اضافه کن.
          </span>
        </Link>

        {workspaces.map((workspace, index) => (
          <Link
            key={workspace.name}
            href="/workspaces"
            className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/5"
          >
            <div className="relative">
              <Preview
                kind={kinds[index % kinds.length]}
                accent={workspace.accent}
                className="h-32"
              />
              <div className="absolute end-2.5 top-2.5 flex items-center gap-1 rounded-full bg-card/85 px-2 py-0.5 text-[9.5px] text-muted-foreground ring-1 ring-foreground/5 backdrop-blur">
                <FrameIcon className="size-2.5" />
                {workspace.canvases} بوم
              </div>
            </div>

            <div className="flex flex-1 flex-col p-3.5">
              <div className="flex items-center gap-2">
                <span
                  className="tint-bg tint-text grid size-6 place-items-center rounded-md text-[12px]"
                  style={tintStyle(workspace.accent)}
                >
                  {workspace.emoji}
                </span>
                <h3 className="truncate text-[13px] font-semibold">
                  {workspace.name}
                </h3>
              </div>
              <p className="mt-1.5 line-clamp-2 flex-1 text-[11px] leading-5 text-muted-foreground">
                {workspace.description}
              </p>

              <div className="mt-3.5 flex items-center justify-between border-t border-border/60 pt-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5 rtl:space-x-reverse">
                    {workspace.avatars.map((avatar) => (
                      <Avatar
                        key={avatar}
                        size="sm"
                        className="size-5 ring-2 ring-card"
                      >
                        <AvatarFallback className="bg-muted text-[8px]">
                          {avatar}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <UsersIcon className="size-2.5" />
                    {workspace.members}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {workspace.updated}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl bg-muted/50 px-4 py-3.5 sm:flex-row sm:items-center">
        <div className="text-[11.5px] text-muted-foreground">
          <span className="font-medium text-foreground">۶ بوم</span> در این فضای
          کاری · آخرین به‌روزرسانی ۳ دقیقه پیش
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="xs" className="gap-1">
            <UsersIcon className="size-3" />
            دعوت همکار
          </Button>
          <Button variant="outline" size="xs" className="gap-1">
            آرشیو بوم‌ها
          </Button>
        </div>
      </div>
    </div>
  );
}
