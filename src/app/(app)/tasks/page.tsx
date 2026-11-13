import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDaysIcon,
  CheckIcon,
  CircleDashedIcon,
  FilterIcon,
  KanbanIcon,
  ListIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SquareCheckIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { taskColumns } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "وظایف" };

const filters = ["همهٔ وظایف", "به من سپرده شده", "امروز", "بدون تاریخ"];

export default function TasksPage() {
  const total = taskColumns.reduce((sum, column) => sum + column.count, 0);
  const done = taskColumns.reduce(
    (sum, column) =>
      sum + column.tasks.filter((task) => task.done).length,
    0,
  );
  const progress = Math.round((done / total) * 100);

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="جریان کار"
        title="وظایف"
        description="وظیفه‌ها اینجا فقط یک لیست نیستند؛ می‌توانی به بوم وصلشان کنی، به آدم‌ها بسپاری و هرطور که فکر می‌کنی مرتبشان کنی."
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <FilterIcon className="size-3.5" />
          فیلتر
        </Button>
        <Button size="sm" className="gap-1.5">
          <PlusIcon className="size-3.5" />
          وظیفهٔ تازه
        </Button>
      </PageHeader>

      <div className="mt-6 flex flex-col gap-3 rounded-xl bg-card p-3 ring-1 ring-foreground/8 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-1.5 overflow-x-auto no-scrollbar">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[11.5px] transition-colors",
                index === 0
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-[10.5px] text-muted-foreground">
              {done} از {total} انجام شده
            </span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="relative hidden sm:block">
            <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جست‌وجو"
              className="h-7 w-36 bg-background ps-8 text-[11px]"
            />
          </div>

          <div className="flex items-center gap-0.5 rounded-lg border p-0.5">
            <Button size="icon-xs" variant="secondary" aria-label="نمایش برد">
              <KanbanIcon />
            </Button>
            <Button size="icon-xs" variant="ghost" aria-label="نمایش فهرست">
              <ListIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-3 thin-scrollbar">
        {taskColumns.map((column, columnIndex) => (
          <section
            key={column.title}
            className="flex w-[286px] shrink-0 flex-col rounded-xl bg-muted/40 p-2 ring-1 ring-foreground/5"
          >
            <header className="flex items-center gap-2 px-1.5 py-1.5">
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-full",
                  columnIndex === 3
                    ? "bg-brand/15 text-brand"
                    : "bg-foreground/10 text-muted-foreground",
                )}
              >
                {columnIndex === 3 ? (
                  <CheckIcon className="size-2.5" />
                ) : (
                  <CircleDashedIcon className="size-2.5" />
                )}
              </span>
              <h2 className="text-[12px] font-medium">{column.title}</h2>
              <span className="rounded-full bg-card px-1.5 text-[9.5px] text-muted-foreground ring-1 ring-foreground/5">
                {column.tasks.length}
              </span>
              <div className="ms-auto flex items-center gap-0.5 text-muted-foreground">
                <Button size="icon-xs" variant="ghost" aria-label="افزودن">
                  <PlusIcon />
                </Button>
                <Button size="icon-xs" variant="ghost" aria-label="بیشتر">
                  <MoreHorizontalIcon />
                </Button>
              </div>
            </header>

            <div className="mt-1 space-y-2">
              {column.tasks.map((task) => (
                <article
                  key={task.title}
                  className="group cursor-grab rounded-lg bg-card p-2.5 ring-1 ring-foreground/8 transition-all hover:ring-foreground/20 hover:shadow-sm active:cursor-grabbing"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="tint-bg tint-text rounded px-1.5 py-0.5 text-[9px] font-medium"
                      style={tintStyle(task.accent)}
                    >
                      {task.tag}
                    </span>
                    {task.priority && (
                      <span
                        className={cn(
                          "flex items-center gap-1 text-[9px]",
                          task.priority === "بالا"
                            ? "text-brand"
                            : "text-muted-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "size-1 rounded-full",
                            task.priority === "بالا"
                              ? "bg-brand"
                              : "bg-muted-foreground/50",
                          )}
                        />
                        {task.priority}
                      </span>
                    )}
                    <MoreHorizontalIcon className="ms-auto size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  <h3
                    className={cn(
                      "mt-2 text-[12px] font-medium leading-5",
                      task.done && "text-muted-foreground line-through",
                    )}
                  >
                    {task.title}
                  </h3>

                  <div className="mt-2.5 flex items-center gap-2.5 text-[9.5px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDaysIcon className="size-2.5" />
                      {task.due}
                    </span>
                    {typeof task.comments === "number" && (
                      <span className="flex items-center gap-1">
                        <MessageSquareIcon className="size-2.5" />
                        {task.comments}
                      </span>
                    )}
                    {task.subtasks && (
                      <span className="flex items-center gap-1">
                        <SquareCheckIcon className="size-2.5" />
                        {task.subtasks}
                      </span>
                    )}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2">
                    <Avatar size="sm" className="size-5">
                      <AvatarFallback
                        className="tint-bg tint-text text-[8px]"
                        style={tintStyle(task.accent)}
                      >
                        {task.assignee}
                      </AvatarFallback>
                    </Avatar>
                    {task.done ? (
                      <span className="flex items-center gap-1 text-[9px] text-brand">
                        <CheckIcon className="size-2.5" />
                        انجام شد
                      </span>
                    ) : (
                      <span className="text-[9px] text-muted-foreground">
                        {task.subtasks ? "در جریان" : "بدون زیرکار"}
                      </span>
                    )}
                  </div>
                </article>
              ))}

              <button className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
                <PlusIcon className="size-3" />
                افزودن وظیفه
              </button>
            </div>
          </section>
        ))}

        <button className="flex w-[240px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed p-6 text-[11.5px] text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground">
          <PlusIcon className="size-4" />
          ستون تازه
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-card px-4 py-3 text-[10.5px] text-muted-foreground ring-1 ring-foreground/8">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-brand" />
          همین حالا ۳ نفر روی این برد کار می‌کنند
        </span>
        <Link href="/team" className="transition-colors hover:text-foreground">
          دیدن اعضای تیم ←
        </Link>
      </div>
    </div>
  );
}
