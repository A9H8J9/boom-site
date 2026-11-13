import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDaysIcon,
  CircleDashedIcon,
  LayoutGridIcon,
  ListIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/components/preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projects, projectTabs } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "پروژه‌ها" };

const statusStyles: Record<string, string> = {
  "در جریان": "bg-brand/10 text-brand",
  بازبینی: "bg-[var(--highlight)]/50 text-foreground/80",
  "طرح‌ریزی": "bg-muted text-muted-foreground",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="استودیو بوم"
        title="پروژه‌ها"
        description="وقتی ایده‌ها شکل گرفتند، اینجا جمعشان کن. هر پروژه مجموعه‌ای از بوم‌ها، وظایف و آدم‌هاست — نه یک ساختار تحمیلی."
      >
        <div className="relative hidden sm:block">
          <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="جست‌وجو" className="h-8 w-40 bg-card ps-8 text-[11.5px]" />
        </div>
        <Button variant="outline" size="icon-sm" aria-label="نمایش فهرست">
          <ListIcon />
        </Button>
        <Button size="sm" className="gap-1.5">
          <PlusIcon className="size-3.5" />
          پروژهٔ تازه
        </Button>
      </PageHeader>

      <div className="mt-6 flex items-center gap-1 border-b border-border/70 pb-3">
        {projectTabs.map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "rounded-full px-3 py-1.5 text-[11.5px] transition-colors",
              index === 0
                ? "bg-foreground font-medium text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tab}
            {index === 0 && (
              <span className="ms-1.5 text-[10px] opacity-70">
                {projects.length}
              </span>
            )}
          </button>
        ))}
        <div className="ms-auto hidden items-center gap-1 text-[10.5px] text-muted-foreground sm:flex">
          <LayoutGridIcon className="size-3" />
          نمایش شبکه‌ای
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.name}
            href="/projects"
            className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/5"
          >
            <div className="relative">
              <Preview kind={project.cover} accent={project.accent} className="h-36" />
              <span
                className={cn(
                  "absolute start-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9.5px] font-medium backdrop-blur",
                  statusStyles[project.status],
                )}
              >
                {project.status}
              </span>
              <span className="absolute end-2.5 top-2.5 rounded-full bg-card/85 px-2 py-0.5 text-[9.5px] text-muted-foreground ring-1 ring-foreground/5 backdrop-blur">
                {project.tasks} وظیفه
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start gap-2">
                <span
                  className="tint-dot mt-1.5 size-2 shrink-0 rounded-full"
                  style={tintStyle(project.accent)}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[13.5px] font-semibold">
                    {project.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <MoreHorizontalIcon className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">پیشرفت</span>
                  <span className="font-medium tabular-nums">
                    {project.progress}٪
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full tint-dot"
                    style={{
                      width: `${project.progress}%`,
                      ...tintStyle(project.accent),
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                <div className="flex -space-x-1.5 rtl:space-x-reverse">
                  {project.members.map((member) => (
                    <Avatar key={member} size="sm" className="size-5 ring-2 ring-card">
                      <AvatarFallback className="bg-muted text-[8px]">
                        {member}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <CalendarDaysIcon className="size-3" />
                  {project.due}
                </span>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/projects"
          className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition-colors hover:border-brand/50 hover:bg-brand/[0.03]"
        >
          <span className="mb-2.5 grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground">
            <CircleDashedIcon className="size-5" />
          </span>
          <span className="text-[12.5px] font-medium">پروژهٔ تازه</span>
          <span className="mt-1 text-[10.5px] text-muted-foreground">
            بوم‌ها را دور یک هدف جمع کن
          </span>
        </Link>
      </div>
    </div>
  );
}
