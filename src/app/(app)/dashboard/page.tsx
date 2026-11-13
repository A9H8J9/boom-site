"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  FrameIcon,
  PlusIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/page-header";
import { Preview } from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  useInbox,
  useMe,
  useReadAllInbox,
  useWorkspaces,
  type WorkspaceRole,
} from "@/lib/apis";
import { recentCanvases, stats, weekTasks } from "@/lib/mock-data";
import { faDate, timeAgo } from "@/lib/utils";
import { tintStyle } from "@/lib/accents";
import type { Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

const statIcons = [FrameIcon, TrendingUpIcon, UsersIcon, ClockIcon];

const sparklines = [
  [30, 48, 38, 62, 54, 76, 88],
  [24, 36, 30, 42, 58, 52, 70],
  [40, 34, 46, 52, 44, 60, 58],
  [68, 54, 60, 46, 52, 38, 30],
];

const today = [
  { time: "۹:۳۰", title: "بازبینی بریف کمپین", tag: "کمپین" },
  { time: "۱۱:۰۰", title: "جلسهٔ هفتگی محصول", tag: "جلسه" },
  { time: "۱۴:۳۰", title: "نوشتن گزارش پژوهش", tag: "پژوهش" },
];

const roleLabels: Record<WorkspaceRole, string> = {
  OWNER: "مالک",
  ADMIN: "مدیر",
  MEMBER: "عضو",
  GUEST: "مهمان",
};

const workspaceAccentCycle: Accent[] = [
  "clay",
  "teal",
  "violet",
  "amber",
  "sage",
  "sky",
];

const workspaceKindCycle = ["canvas", "board", "doc"] as const;

export default function DashboardPage() {
  const { data: me } = useMe();
  const { data: memberships } = useWorkspaces();
  const { data: notifications } = useInbox();
  const readAll = useReadAllInbox();

  const doneCount = weekTasks.filter((task) => task.done).length;
  const unreadCount = (notifications ?? []).filter((n) => !n.isRead).length;

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <Reveal>
        <section className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(115deg,#211d19_0%,#2a231c_52%,#3a2b21_100%)] px-5 py-7 text-[#f6f1e9] shadow-lift ring-1 ring-white/5 sm:px-8 sm:py-9">
          <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.1]" />
          <div
            aria-hidden="true"
            className="absolute -end-20 -top-24 size-72 rounded-full bg-brand/40 blur-[70px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 start-1/3 size-56 rounded-full bg-[#c9a227]/15 blur-[60px]"
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-2.5 py-1 text-[10px] text-white/70 ring-1 ring-white/10">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                شنبه، ۱۸ آبان · استودیو بوم
              </span>
              <h1 className="text-balance mt-3 text-[25px] font-bold leading-[1.45] sm:text-[32px]">
                سلام {me?.name.split(" ")[0] ?? "دوست من"}، امروز چه چیزی می‌سازی؟
              </h1>
              <p className="mt-2 max-w-md text-[12px] leading-6 text-white/60">
                خانهٔ همهٔ بوم‌ها، ایده‌ها و کارهای توست. از یک صفحهٔ خالی شروع
                کن یا از جایی که رها کردی ادامه بده.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Link
                  href="/workspaces"
                  className="inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-[#f6f1e9] px-3.5 text-[12.5px] font-medium text-[#221e1a] shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <PlusIcon className="size-3.5" />
                  بوم تازه
                </Link>
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-white/15 bg-white/5 px-3.5 text-[12.5px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <FileTextIcon className="size-3.5" />
                  یادداشت سریع
                </button>
                <span className="ms-1 hidden items-center gap-1.5 text-[10px] text-white/40 sm:flex">
                  <span className="size-1 rounded-full bg-white/30" />
                  {doneCount} کار از {weekTasks.length} انجام شده
                </span>
              </div>
            </div>

            <div className="relative hidden h-[196px] w-[310px] shrink-0 lg:block">
              <div className="absolute inset-x-2 top-6 -rotate-[3deg] rounded-2xl bg-[#f4efe6] p-3 text-[#3a342c] shadow-xl">
                <div className="flex items-center justify-between text-[9px] font-medium">
                  <span className="flex items-center gap-1">
                    <CalendarDaysIcon className="size-2.5" />
                    برنامهٔ امروز
                  </span>
                  <span className="text-[#8a7f70]">۳ رویداد</span>
                </div>
                <div className="mt-2 space-y-1.5">
                  {today.map((item) => (
                    <div
                      key={item.time}
                      className="flex items-center gap-2 rounded-lg bg-white/70 px-2 py-1.5 ring-1 ring-black/5"
                    >
                      <span className="text-[8px] tabular-nums text-[#8a7f70]">
                        {item.time}
                      </span>
                      <span className="text-[9px]">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-1 end-2 w-[168px] rotate-[2.5deg] rounded-xl bg-[#fdf6d8] p-2.5 text-[#4a4230] shadow-xl">
                <div className="text-[9px] font-bold opacity-60">فکر امروز</div>
                <p className="mt-1 text-[9px] leading-4">
                  «اول بساز، بعد تصمیم بگیر.» این جمله هنوز کار می‌کند.
                </p>
              </div>
              <div className="absolute bottom-0 end-0 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9px] text-white/80 ring-1 ring-white/15 backdrop-blur">
                <SparklesIcon className="size-2.5" />
                دستیار آماده است
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];
            const bars = sparklines[index];
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl bg-card p-4 shadow-card ring-1 ring-foreground/8 transition-shadow hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className="grid size-7 place-items-center rounded-[9px] bg-brand/8 text-brand ring-1 ring-brand/10">
                    <Icon className="size-3.5" />
                  </span>
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-[24px] font-bold tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400">
                    {stat.delta}
                  </span>
                </div>
                <div className="mt-1.5 flex items-end justify-between gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {stat.hint}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-6 items-end gap-[3px] opacity-70 transition-opacity group-hover:opacity-100"
                  >
                    {bars.map((height, barIndex) => (
                      <span
                        key={barIndex}
                        className="w-[3px] rounded-full bg-brand/35 last:bg-brand"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            );
          })}
        </section>
      </Reveal>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_336px]">
        <div className="space-y-5">
          <Reveal delay={0.08} className="space-y-3">
            <SectionHeading
              title="فضاهای کاری تو"
              description="جایی که کارها و ایده‌هایت زندگی می‌کنند"
              action={
                <Link
                  href="/workspaces"
                  className="flex items-center gap-1 text-[11.5px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  همهٔ بوم‌ها
                  <ArrowLeftIcon className="size-3" />
                </Link>
              }
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {(memberships ?? []).slice(0, 4).map((membership, index) => {
                const workspace = membership.workspace;
                const accent =
                  workspaceAccentCycle[index % workspaceAccentCycle.length];
                const kind =
                  workspaceKindCycle[index % workspaceKindCycle.length];
                return (
                  <Link
                    key={workspace.id}
                    href="/workspaces"
                    className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <div className="relative">
                      <Preview kind={kind} accent={accent} className="h-32" />
                      <span className="absolute start-2.5 top-2.5 rounded-full bg-card/85 px-2 py-0.5 text-[9.5px] text-muted-foreground ring-1 ring-foreground/5 backdrop-blur">
                        {roleLabels[membership.role]}
                      </span>
                      <span className="absolute end-2.5 top-2.5 grid size-7 translate-y-1 place-items-center rounded-lg bg-card/90 text-foreground opacity-0 shadow-sm ring-1 ring-foreground/10 backdrop-blur transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRightIcon className="size-3.5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="tint-bg tint-text grid size-6 place-items-center rounded-lg text-[11px]"
                          style={tintStyle(accent)}
                        >
                          {workspace.icon ?? "🎨"}
                        </span>
                        <h3 className="truncate text-[13px] font-semibold">
                          {workspace.name}
                        </h3>
                      </div>
                      <p className="mt-1.5 line-clamp-1 flex-1 text-[11px] text-muted-foreground">
                        {workspace.slug}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
                        <span className="text-[10px] text-muted-foreground">
                          ساخته‌شده {faDate(workspace.createdAt)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {timeAgo(workspace.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {(memberships ?? []).length === 0 && (
              <Link
                href="/workspaces"
                className="group flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-4 transition-colors hover:border-brand/40 hover:bg-card"
              >
                <span className="tint-bg tint-text grid size-9 shrink-0 place-items-center rounded-xl text-[15px]" style={tintStyle("clay")}>
                  🎨
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-medium">
                    اولین فضای کاری‌ات را بساز
                  </span>
                  <span className="mt-0.5 block text-[10px] text-muted-foreground">
                    جایی برای ایده‌ها و کارهایت
                  </span>
                </span>
                <PlusIcon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <section className="rounded-2xl bg-card p-4 shadow-card ring-1 ring-foreground/8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[14px] font-semibold">این هفته</h2>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                    {weekTasks.length - doneCount} کار مانده تا جمعه
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{
                        width: `${(doneCount / weekTasks.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10.5px] tabular-nums text-muted-foreground">
                    {doneCount} از {weekTasks.length}
                  </span>
                  <Link
                    href="/tasks"
                    className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    برد وظایف
                    <ArrowLeftIcon className="size-3" />
                  </Link>
                </div>
              </div>

              <div className="mt-3 divide-y divide-border/60">
                {weekTasks.map((task) => (
                  <label
                    key={task.title}
                    className="group flex cursor-pointer items-center gap-3 py-2.5 transition-colors hover:bg-muted/30"
                  >
                    <span
                      className={cn(
                        "grid size-[18px] shrink-0 place-items-center rounded-[6px] border transition-colors",
                        task.done
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-card group-hover:border-brand/50",
                      )}
                    >
                      {task.done && (
                        <svg viewBox="0 0 12 12" className="size-2.5">
                          <path
                            d="M2.5 6.2 4.8 8.5 9.4 3.6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-[12.5px]",
                        task.done && "text-muted-foreground line-through",
                      )}
                    >
                      {task.title}
                    </span>
                    {!task.done && (
                      <Badge
                        variant="outline"
                        className="text-[9.5px] text-muted-foreground"
                      >
                        امروز
                      </Badge>
                    )}
                  </label>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        <aside className="space-y-4">
          <Reveal delay={0.12}>
            <section className="relative overflow-hidden rounded-2xl bg-[#221e1a] p-4 text-[#f6f1e9] shadow-lift ring-1 ring-white/5">
              <div
                aria-hidden="true"
                className="absolute inset-0 dot-grid opacity-[0.1]"
              />
              <div
                aria-hidden="true"
                className="absolute -end-8 -top-10 size-32 rounded-full bg-brand/35 blur-2xl"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium">تمرکز امروز</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-white/60">
                    ۳ رویداد
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {today.map((item) => (
                    <div
                      key={item.time}
                      className="flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-2.5 py-2 ring-1 ring-white/5"
                    >
                      <span className="text-[9px] tabular-nums text-white/45">
                        {item.time}
                      </span>
                      <span className="flex-1 text-[10.5px]">{item.title}</span>
                      <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] text-white/55">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/tasks"
                  className="mt-3 flex h-8 items-center justify-center gap-1.5 rounded-[9px] bg-[#f6f1e9] text-[11.5px] font-medium text-[#221e1a] transition-opacity hover:opacity-90"
                >
                  دیدن همهٔ کارهای امروز
                  <ArrowLeftIcon className="size-3" />
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.14}>
            <section className="rounded-2xl bg-card p-4 shadow-card ring-1 ring-foreground/8">
              <SectionHeading
                title="اعلان‌ها"
                description={
                  unreadCount > 0
                    ? `${unreadCount.toLocaleString("fa-IR")} خوانده‌نشده`
                    : "همه خوانده شده"
                }
                action={
                  <button
                    type="button"
                    onClick={() => readAll.mutate()}
                    disabled={readAll.isPending || unreadCount === 0}
                    className="flex items-center gap-1 text-[11.5px] text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                  >
                    خواندن همه
                    <ArrowLeftIcon className="size-3" />
                  </button>
                }
              />
              <div className="mt-4 space-y-3">
                {(notifications ?? []).slice(0, 5).map((notification) => (
                  <div key={notification.id} className="flex gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ring-2 ring-card",
                        notification.isRead
                          ? "bg-muted text-muted-foreground"
                          : "bg-brand/15 text-brand",
                      )}
                    >
                      <BellIcon className="size-3" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-[11.5px] leading-5",
                          !notification.isRead && "font-medium",
                        )}
                      >
                        {notification.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <ClockIcon className="size-2.5" />
                        {timeAgo(notification.createdAt)}
                        {!notification.isRead && (
                          <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[8.5px] font-medium text-brand">
                            جدید
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {(notifications ?? []).length === 0 && (
                  <p className="text-[11px] text-muted-foreground">
                    اعلانی نداری؛ هر وقت اتفاقی بیفتد اینجا می‌بینی.
                  </p>
                )}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.16}>
            <section className="rounded-2xl bg-gradient-to-br from-brand/10 via-card to-card p-4 shadow-card ring-1 ring-brand/15">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-medium">فضای مصرفی</span>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  ۲٫۱ از ۵ گیگ
                </span>
              </div>
              <Progress value={42} className="mt-2.5 gap-0">
                <span className="sr-only">۴۲ درصد</span>
              </Progress>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  { value: "۱۰۰", label: "بوم" },
                  { value: "۸", label: "همکار" },
                  { value: "۱۲", label: "قالب" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-card/70 py-1.5 ring-1 ring-border/60"
                  >
                    <div className="text-[12.5px] font-semibold tabular-nums">
                      {item.value}
                    </div>
                    <div className="text-[9.5px] text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/plans"
                className="mt-3 flex items-center justify-center gap-1 text-[11px] font-medium text-brand hover:underline"
              >
                ارتقا به تیم
                <ArrowUpRightIcon className="size-3" />
              </Link>
            </section>
          </Reveal>

          <Reveal delay={0.18}>
            <Link
              href="/workspaces"
              className="group flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-3.5 transition-colors hover:border-brand/40 hover:bg-card"
            >
              <span
                className="tint-bg tint-text grid size-9 shrink-0 place-items-center rounded-xl text-[15px]"
                style={tintStyle("clay")}
              >
                {recentCanvases[0].emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-medium">
                  {recentCanvases[0].title}
                </span>
                <span className="mt-0.5 block text-[10px] text-muted-foreground">
                  آخرین بوم بازشده
                </span>
              </span>
              <CheckIcon className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
            </Link>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}
