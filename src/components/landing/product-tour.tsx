"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckIcon,
  FileTextIcon,
  FrameIcon,
  LayoutGridIcon,
  MousePointer2Icon,
  PlusIcon,
  SparklesIcon,
  StickyNoteIcon,
  Table2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const tabs = [
  { id: "canvas", label: "بوم", icon: FrameIcon },
  { id: "doc", label: "سند", icon: FileTextIcon },
  { id: "table", label: "جدول", icon: Table2Icon },
  { id: "board", label: "تخته", icon: LayoutGridIcon },
] as const;

type TabId = (typeof tabs)[number]["id"];

function CanvasView() {
  return (
    <div className="relative h-full overflow-hidden bg-background dot-grid">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,color-mix(in_oklab,var(--brand)_8%,transparent),transparent)]" />

      <div className="note-shadow absolute start-[5%] top-[9%] w-[36%] -rotate-3 rounded-lg bg-[#fdf6d8] p-3 text-[#4a4230] sm:w-[22%]">
        <div className="text-[9px] font-bold opacity-60">جرقه‌های هفته</div>
        <div className="mt-2 space-y-1.5">
          {["حذف گام اضافه", "یک شروع سبک", "جست‌وجوی سریع"].map((line) => (
            <div key={line} className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-[#b59a4a]" />
              <span className="text-[9px] sm:text-[10px]">{line}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute start-[44%] top-[7%] w-[52%] overflow-hidden rounded-xl bg-card shadow-lg ring-1 ring-foreground/10 sm:start-[34%] sm:w-[38%]">
        <div className="flex items-center gap-1.5 border-b border-border/60 px-3 py-2">
          <span className="size-1.5 rounded-full bg-brand" />
          <span className="text-[10px] font-medium">نقشهٔ راه بهار</span>
          <span className="ms-auto rounded bg-muted px-1.5 py-0.5 text-[8px] text-muted-foreground">
            تیم محصول
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {[
            { title: "جرقه", count: 2, tone: "bg-[#f6e3da]" },
            { title: "ساختن", count: 3, tone: "bg-[#ddecea]" },
            { title: "انتشار", count: 1, tone: "bg-[#e8e3f3]" },
          ].map((column) => (
            <div key={column.title}>
              <div className="mb-1.5 flex items-center justify-between text-[8px] text-muted-foreground">
                {column.title}
                <span>{column.count}</span>
              </div>
              <div className="space-y-1.5">
                {Array.from({ length: column.count }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-md bg-muted/60 p-1.5 ring-1 ring-foreground/5",
                      index === 0 && column.tone,
                    )}
                  >
                    <div className="h-1 w-3/4 rounded-full bg-foreground/25" />
                    <div className="mt-1.5 h-1 w-1/2 rounded-full bg-foreground/10" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute start-[8%] bottom-[14%] w-[54%] rounded-xl bg-card p-3 shadow-lg ring-1 ring-foreground/10 sm:start-[12%] sm:w-[26%]">
        <div className="mb-2 flex items-center gap-1.5 text-[9px] text-muted-foreground">
          <SparklesIcon className="size-2.5 text-brand" />
          خلاصهٔ دستیار
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-foreground/12" />
          <div className="h-1.5 w-5/6 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-foreground/10" />
        </div>
        <div className="mt-2.5 flex gap-1">
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[8px] text-brand">
            سه تصمیم
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[8px] text-muted-foreground">
            دو کار باز
          </span>
        </div>
      </div>

      <div className="absolute end-[6%] bottom-[16%] hidden w-[25%] rounded-xl bg-card p-3 shadow-lg ring-1 ring-foreground/10 sm:block">
        <div className="flex items-center gap-2">
          <div className="h-12 w-10 rounded bg-gradient-to-br from-[#f6e3da] to-[#e8e3f3]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-foreground/25" />
            <div className="h-1 w-full rounded-full bg-foreground/10" />
            <div className="h-1 w-2/3 rounded-full bg-foreground/10" />
            <div className="mt-1.5 flex -space-x-1 rtl:space-x-reverse">
              {["ن‌ک", "ا‌ر"].map((person) => (
                <Avatar
                  key={person}
                  size="sm"
                  className="size-4 ring-2 ring-card"
                >
                  <AvatarFallback className="bg-muted text-[6px]">
                    {person}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute end-[8%] top-[38%] hidden w-[17%] rounded-xl bg-card p-2.5 shadow-lg ring-1 ring-foreground/10 sm:block">
        <div className="flex items-center gap-1.5">
          <span className="grid size-4 place-items-center rounded bg-[#e4ecdf] text-[8px] text-[#5f7d5a]">
            ✓
          </span>
          <span className="text-[9px] font-medium">امروز</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-1.5">
              <span
                className={cn(
                  "size-2 rounded-[3px] border",
                  row === 1
                    ? "border-[#5f7d5a] bg-[#5f7d5a]"
                    : "border-foreground/20",
                )}
              />
              <span className="h-1 flex-1 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-xl bg-card/95 p-1 shadow-lg ring-1 ring-foreground/10 backdrop-blur">
        {[
          MousePointer2Icon,
          StickyNoteIcon,
          FileTextIcon,
          Table2Icon,
          PlusIcon,
        ].map((Icon, index) => (
          <span
            key={index}
            className={cn(
              "grid size-6 place-items-center rounded-lg",
              index === 0
                ? "bg-foreground text-background"
                : "text-muted-foreground",
            )}
          >
            <Icon className="size-3" />
          </span>
        ))}
      </div>
    </div>
  );
}

function DocView() {
  return (
    <div className="h-full overflow-hidden bg-background p-4 sm:p-8">
      <div className="mx-auto h-full max-w-[460px] overflow-hidden rounded-xl bg-card p-4 shadow-sm ring-1 ring-foreground/8 sm:p-6">
        <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
          <span className="rounded bg-brand/10 px-1.5 py-0.5 text-brand">
            بریف
          </span>
          آخرین ویرایش ۳ دقیقه پیش
        </div>
        <h3 className="mt-3 text-[17px] font-bold sm:text-[21px]">
          بریف کمپین نوروز
        </h3>
        <p className="mt-2 text-[10px] leading-5 text-muted-foreground sm:text-[11px]">
          کمپینی برای معرفی نسخهٔ تازهٔ بوم؛ تمرکز روی سادگی شروع و آزادی در
          چیدمان.
        </p>
        <div className="mt-3 rounded-lg bg-[#fdf6d8]/70 p-2.5 text-[9.5px] leading-5 text-[#6b5a2e] ring-1 ring-[#e5d9a8] sm:text-[10.5px]">
          تصمیم مهم: پیام اصلی روی «اول بساز، بعد تصمیم بگیر» می‌ماند.
        </div>
        <div className="mt-3 space-y-1.5">
          {["مخاطب: تیم‌های طراحی و محصول", "کانال: وب، خبرنامه، لینکدین"].map(
            (row) => (
              <div key={row} className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-foreground/30" />
                <span className="text-[9.5px] text-muted-foreground sm:text-[10px]">
                  {row}
                </span>
              </div>
            ),
          )}
        </div>
        <div className="mt-3 border-t border-border/70 pt-3">
          {[
            { label: "نهایی‌کردن متن صفحهٔ اصلی", done: true },
            { label: "طراحی سه بنر", done: true },
            { label: "هماهنگی انتشار", done: false },
          ].map((task) => (
            <div key={task.label} className="flex items-center gap-2 py-1">
              <span
                className={cn(
                  "grid size-3.5 place-items-center rounded-[4px] border",
                  task.done
                    ? "border-[#5f7d5a] bg-[#5f7d5a] text-white"
                    : "border-foreground/20",
                )}
              >
                {task.done && <CheckIcon className="size-2.5" />}
              </span>
              <span
                className={cn(
                  "text-[9.5px] sm:text-[10px]",
                  task.done && "text-muted-foreground line-through",
                )}
              >
                {task.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const rows = [
  { name: "بازبینی متن صفحهٔ اصلی", owner: "ن‌ک", status: "در حال انجام", progress: 62, tone: "bg-[#f6e3da] text-[#a5543b]" },
  { name: "طراحی سه بنر کمپین", owner: "ا‌ر", status: "بازبینی", progress: 80, tone: "bg-[#e8e3f3] text-[#6b5a9e]" },
  { name: "هماهنگی انتشار نسخه", owner: "س‌م", status: "انجام‌شده", progress: 100, tone: "bg-[#e4ecdf] text-[#4f6d4a]" },
  { name: "مصاحبه با سه کاربر", owner: "پ‌ن", status: "در حال انجام", progress: 35, tone: "bg-[#ddecea] text-[#3c7d7a]" },
  { name: "به‌روزرسانی نقشهٔ راه", owner: "م‌ت", status: "باز", progress: 12, tone: "bg-muted text-muted-foreground" },
];

function TableView() {
  return (
    <div className="h-full overflow-hidden bg-background p-4 sm:p-8">
      <div className="mx-auto h-full overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-foreground/8">
        <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
          <Table2Icon className="size-3.5 text-muted-foreground" />
          <span className="text-[11px] font-medium">کارهای کمپین نوروز</span>
          <span className="ms-auto rounded-full bg-muted px-2 py-0.5 text-[9px] text-muted-foreground">
            ۱۲ کار
          </span>
        </div>
        <div className="grid grid-cols-[1.8fr_0.7fr_0.8fr_1fr] gap-2 border-b border-border/70 bg-muted/40 px-4 py-2 text-[9px] text-muted-foreground">
          <span>عنوان</span>
          <span>مسئول</span>
          <span>وضعیت</span>
          <span>پیشرفت</span>
        </div>
        {rows.map((row, index) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 * index, duration: 0.3 }}
            className="grid grid-cols-[1.8fr_0.7fr_0.8fr_1fr] items-center gap-2 border-b border-border/40 px-4 py-2.5 last:border-0"
          >
            <span className="truncate text-[9.5px] sm:text-[10.5px]">
              {row.name}
            </span>
            <Avatar size="sm" className="size-5">
              <AvatarFallback className="bg-muted text-[7px]">
                {row.owner}
              </AvatarFallback>
            </Avatar>
            <span className={cn("w-fit rounded-full px-1.5 py-0.5 text-[8px]", row.tone)}>
              {row.status}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-brand/70"
                  style={{ width: `${row.progress}%` }}
                />
              </span>
              <span className="w-6 text-[8px] text-muted-foreground">
                {row.progress}٪
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BoardView() {
  const columns = [
    {
      title: "جرقه",
      items: ["ایدهٔ کمپین بهار", "بررسی بازخورد کاربران"],
      tone: "bg-[#f6e3da]",
    },
    {
      title: "ساختن",
      items: ["صفحهٔ اصلی تازه", "سه بنر", "راهنمای شروع"],
      tone: "bg-[#ddecea]",
    },
    {
      title: "انتشار",
      items: ["خبرنامهٔ هفته"],
      tone: "bg-[#e8e3f3]",
    },
  ];
  return (
    <div className="h-full overflow-hidden bg-background p-4 dot-grid-sm sm:p-6">
      <div className="grid h-full grid-cols-3 gap-2.5">
        {columns.map((column) => (
          <div key={column.title} className="flex min-h-0 flex-col">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[10px] font-medium">{column.title}</span>
              <span className="text-[9px] text-muted-foreground">
                {column.items.length}
              </span>
            </div>
            <div className="flex-1 space-y-2 overflow-hidden rounded-lg bg-muted/30 p-1.5">
              {column.items.map((item, index) => (
                <div
                  key={item}
                  className="rounded-md bg-card p-2 shadow-sm ring-1 ring-foreground/6"
                >
                  <span className={cn("mb-1.5 block h-1 w-8 rounded-full", column.tone)} />
                  <div className="text-[8.5px] leading-4 sm:text-[9.5px]">
                    {item}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <Avatar size="sm" className="size-3.5">
                      <AvatarFallback className="bg-muted text-[5px]">
                        {["ن‌ک", "س‌م", "ا‌ر"][index % 3]}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <span className="rounded bg-muted px-1 py-0.5 text-[6.5px] text-muted-foreground">
                        ۲ نظر
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-1 rounded-md border border-dashed border-border px-2 py-1.5 text-[8px] text-muted-foreground">
                <PlusIcon className="size-2.5" />
                افزودن کار
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const views: Record<TabId, () => React.JSX.Element> = {
  canvas: CanvasView,
  doc: DocView,
  table: TableView,
  board: BoardView,
};

export function ProductTour() {
  const [active, setActive] = React.useState<TabId>("canvas");
  const reduce = useReducedMotion();
  const ActiveView = views[active];

  return (
    <section
      id="product"
      className="relative mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-[640px] text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/8 px-2.5 py-1 text-[10.5px] font-medium text-brand ring-1 ring-brand/15">
          <FrameIcon className="size-3" />
          تور کوتاه محصول
        </span>
        <h2 className="text-balance mt-4 text-[25px] font-bold leading-[1.5] sm:text-[34px] sm:leading-[1.45]">
          هر مرحله از فکر، در همان بومی که
          <br className="hidden sm:block" /> شروعش کردی.
        </h2>
        <p className="text-balance mx-auto mt-3 max-w-lg text-[12px] leading-6 text-muted-foreground sm:text-[13px] sm:leading-7">
          بین یادداشت، سند، جدول و تخته جابه‌جا شو؛ بدون باز کردن تب تازه یا
          کپی‌کردن محتوا. همین پایین امتحان کن.
        </p>
      </div>

      <div className="mt-7 flex justify-center">
        <div
          role="tablist"
          aria-label="نمایش بخش‌های محصول"
          className="inline-flex items-center gap-0.5 rounded-full border border-border/70 bg-card/80 p-1 shadow-soft backdrop-blur"
        >
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative flex h-8 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-medium transition-colors sm:px-4",
                  selected
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="tour-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <tab.icon className="size-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="window-shadow relative mt-6 rounded-2xl bg-card/80 p-1.5 ring-1 ring-foreground/10"
      >
        <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
          <div className="flex h-9 items-center gap-2 border-b border-border/70 bg-card/70 px-3">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#e8837a]" />
              <span className="size-2 rounded-full bg-[#e8c15a]" />
              <span className="size-2 rounded-full bg-[#8dbf87]" />
            </div>
            <span className="mx-auto hidden rounded-md bg-background/80 px-3 py-0.5 text-[8.5px] text-muted-foreground ring-1 ring-border sm:block">
              boom.studio / کمپین نوروز
            </span>
            <span className="ms-auto flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[8px] text-muted-foreground">
              <span className="size-1 rounded-full bg-emerald-500" />
              ۳ نفر آنلاین
            </span>
          </div>

          <div className="h-[360px] sm:h-[440px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
                className="h-full"
              >
                <ActiveView />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10.5px] text-muted-foreground">
        {[
          "همه‌چیز قابل تغییر است",
          "بدون قالب اجباری",
          "همگام با تیم، در لحظه",
        ].map((item) => (
          <span key={item} className="flex items-center gap-1.5">
            <CheckIcon className="size-3 text-brand" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
