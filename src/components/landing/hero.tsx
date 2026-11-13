"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ImageIcon,
  MousePointer2Icon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  StickyNoteIcon,
  Table2Icon,
  TypeIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const people = ["س‌م", "ن‌ک", "ا‌ر"];

function LiveCursor({
  name,
  color,
  className,
  delay = 0,
}: {
  name: string;
  color: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-20 hidden items-start gap-1 sm:flex",
        className,
      )}
    >
      <motion.div
        className="flex items-start gap-1"
        animate={{ x: [0, 16, -6, 0], y: [0, -12, 8, 0] }}
        transition={{
          duration: 12,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 16 20" className="size-4 drop-shadow-sm">
          <path
            d="M2 1.5 13.5 9.2 8 10.4l-2.6 5.4L2 1.5Z"
            fill={color}
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="rounded px-1.5 py-0.5 text-[9px] font-medium text-white shadow-sm"
          style={{ background: color }}
        >
          {name}
        </span>
      </motion.div>
    </div>
  );
}

function WindowChrome() {
  return (
    <div className="flex h-10 items-center gap-3 border-b border-border/70 bg-card/80 px-3">
      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[#e8837a]" />
        <span className="size-2 rounded-full bg-[#e8c15a]" />
        <span className="size-2 rounded-full bg-[#8dbf87]" />
      </div>
      <div className="mx-auto hidden w-64 items-center justify-center gap-1.5 rounded-md bg-background/80 py-1 text-[8.5px] text-muted-foreground ring-1 ring-border sm:flex">
        <span className="size-1.5 rounded-full bg-emerald-500/70" />
        boom.studio / نقشهٔ راه بهار
      </div>
      <div className="ms-auto flex items-center gap-2">
        <div className="flex -space-x-1.5 rtl:space-x-reverse">
          {people.map((person) => (
            <Avatar key={person} size="sm" className="size-5 ring-2 ring-card">
              <AvatarFallback className="bg-muted text-[7px]">
                {person}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="rounded-md bg-primary px-2 py-1 text-[7.5px] font-medium text-primary-foreground">
          اشتراک
        </span>
      </div>
    </div>
  );
}

function MiniSidebar() {
  const items = ["داشبورد", "بوم‌های من", "پروژه‌ها", "وظایف", "دستیار"];
  return (
    <div className="hidden flex-col gap-0.5 border-e border-border/60 bg-sidebar/60 p-2.5 sm:flex">
      <div className="mb-2 flex items-center gap-1.5 rounded-md bg-card px-1.5 py-1 text-[8.5px] font-medium ring-1 ring-border/70">
        <span className="grid size-3.5 place-items-center rounded bg-brand/15 text-[7px]">
          🎨
        </span>
        استودیو بوم
      </div>
      <div className="mb-2 flex items-center gap-1 rounded-md bg-card/60 px-1.5 py-1 text-[7.5px] text-muted-foreground ring-1 ring-border/50">
        <SearchIcon className="size-2" />
        جست‌وجو…
      </div>
      {items.map((item, index) => (
        <div
          key={item}
          className={cn(
            "flex items-center gap-1.5 rounded px-1.5 py-[5px] text-[7.5px]",
            index === 0
              ? "bg-sidebar-accent font-medium text-foreground"
              : "text-muted-foreground",
          )}
        >
          <span className="size-1.5 rounded-sm bg-current opacity-40" />
          {item}
        </div>
      ))}
      <div className="mt-3 text-[7px] text-muted-foreground/60">آخرین بوم‌ها</div>
      <div className="mt-1 space-y-1">
        {["نقشهٔ راه بهار", "بریف نوروز", "دفترچهٔ جلسه‌ها"].map((name, index) => (
          <div
            key={name}
            className="flex items-center gap-1 text-[7px] text-muted-foreground"
          >
            <span
              className={cn(
                "size-1 rounded-full",
                index === 0 ? "bg-brand" : "bg-foreground/20",
              )}
            />
            {name}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-md bg-card/70 p-1.5 ring-1 ring-border/60">
        <div className="flex items-center justify-between text-[6.5px] text-muted-foreground">
          <span>فضای مصرفی</span>
          <span>۴۲٪</span>
        </div>
        <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-border">
          <div className="h-full w-[42%] rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

function CanvasBody() {
  return (
    <div className="relative h-[330px] overflow-hidden bg-background dot-grid sm:h-[440px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklab,var(--brand)_9%,transparent),transparent)]" />

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-3, -2.4, -3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="note-shadow absolute start-[4%] top-[8%] w-[31%] rounded-lg bg-[#fdf6d8] p-2.5 text-[#4a4230] sm:start-[5%] sm:w-[21%]"
      >
        <div className="text-[7.5px] font-bold opacity-60">ایده‌های خام</div>
        <div className="mt-1.5 space-y-1">
          {["یک شروع سبک", "بدون قالب سفت", "جست‌وجوی همه‌جا"].map((line) => (
            <div key={line} className="flex items-center gap-1">
              <span className="size-1 rounded-full bg-[#b59a4a]" />
              <span className="text-[7.5px] sm:text-[8.5px]">{line}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-px bg-[#e5d9a8]" />
        <div className="mt-1.5 text-[6.5px] opacity-50">همین‌جا، وسط فکرها</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease }}
        className="absolute start-[37%] top-[5%] w-[55%] overflow-hidden rounded-lg bg-card shadow-lg ring-1 ring-foreground/10 sm:start-[33%] sm:w-[35%]"
      >
        <div className="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
          <span className="size-1 rounded-full bg-brand" />
          <span className="text-[8px] font-medium">نقشهٔ راه بهار</span>
          <span className="ms-auto rounded bg-muted px-1 py-0.5 text-[6.5px] text-muted-foreground">
            تیم
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-2">
          {[
            { title: "جرقه", count: 2, tone: "bg-[#f6e3da]" },
            { title: "ساختن", count: 3, tone: "bg-[#ddecea]" },
            { title: "انتشار", count: 1, tone: "bg-[#e8e3f3]" },
          ].map((column) => (
            <div key={column.title}>
              <div className="mb-1 flex items-center justify-between text-[6.5px] text-muted-foreground">
                {column.title}
                <span>{column.count}</span>
              </div>
              <div className="space-y-1">
                {Array.from({ length: column.count }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded bg-muted/60 p-1 ring-1 ring-foreground/5",
                      index === 0 && column.tone,
                    )}
                  >
                    <div className="h-0.5 w-3/4 rounded-full bg-foreground/25" />
                    <div className="mt-1 h-0.5 w-1/2 rounded-full bg-foreground/10" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute end-[4%] top-[30%] hidden w-[17%] rounded-lg bg-card p-2 shadow-lg ring-1 ring-foreground/10 sm:block"
      >
        <div className="flex items-center gap-1">
          <span className="grid size-3.5 place-items-center rounded bg-[#e4ecdf] text-[6px]">
            ✓
          </span>
          <span className="text-[7.5px] font-medium">کارهای امروز</span>
        </div>
        <div className="mt-1.5 space-y-1">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex items-center gap-1">
              <span
                className={cn(
                  "size-1.5 rounded-[2px] border",
                  row === 1
                    ? "border-[#5f7d5a] bg-[#5f7d5a]"
                    : "border-foreground/20",
                )}
              />
              <span className="h-0.5 flex-1 rounded-full bg-foreground/10" />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9, ease }}
        className="absolute start-[8%] bottom-[18%] z-10 w-[46%] rounded-lg bg-card p-2.5 shadow-lg ring-1 ring-foreground/10 sm:start-[9%] sm:w-[24%]"
      >
        <div className="mb-1.5 flex items-center gap-1 text-[7px] text-muted-foreground">
          <Table2Icon className="size-2" />
          مراجع بصری
        </div>
        <div className="space-y-1">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-1">
              <span className="size-1 rounded-full bg-brand/60" />
              <span className="h-0.5 flex-1 rounded-full bg-foreground/10" />
              <span className="h-1.5 w-4 rounded-sm bg-muted" />
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1 border-t border-border/60 pt-1.5">
          <Avatar size="sm" className="size-3">
            <AvatarFallback className="bg-[#f6e3da] text-[5px]">
              ن‌ک
            </AvatarFallback>
          </Avatar>
          <span className="text-[6.5px] text-muted-foreground">۲ نظر تازه</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.15, ease }}
        className="absolute end-[5%] bottom-[22%] z-20 w-[46%] sm:w-[24%]"
      >
        <div className="rounded-lg bg-card/95 p-2 shadow-xl ring-1 ring-foreground/10 backdrop-blur">
          <div className="flex items-center gap-1">
            <span className="grid size-3.5 place-items-center rounded bg-brand/15 text-brand">
              <SparklesIcon className="size-2" />
            </span>
            <span className="text-[7px] font-medium">بوم ۲</span>
            <span className="ms-auto flex items-center gap-0.5">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="size-0.5 rounded-full bg-brand"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: dot * 0.18,
                  }}
                />
              ))}
            </span>
          </div>
          <div className="mt-1.5 rounded bg-muted/50 p-1.5 text-[7px] leading-4">
            سه تصمیم از جلسهٔ دیروز پیدا کردم؛ ببینم موافقی؟
          </div>
        </div>
        <span className="absolute -end-1 -top-1 grid size-3 place-items-center rounded-full bg-brand ring-2 ring-background">
          <SparklesIcon className="size-1.5 text-brand-foreground" />
        </span>
      </motion.div>

      <LiveCursor
        name="نگار"
        color="#7464a8"
        className="start-[30%] top-[44%]"
        delay={0.4}
      />
      <LiveCursor
        name="امیر"
        color="#3c7d7a"
        className="end-[26%] bottom-[34%]"
        delay={1.6}
      />

      <div className="absolute bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-0.5 rounded-xl bg-card/95 p-1 shadow-lg ring-1 ring-foreground/10 backdrop-blur">
        {[
          { icon: MousePointer2Icon, label: "انتخاب", active: true },
          { icon: StickyNoteIcon, label: "یادداشت" },
          { icon: TypeIcon, label: "متن" },
          { icon: ImageIcon, label: "تصویر" },
          { icon: Table2Icon, label: "جدول" },
          { icon: PlusIcon, label: "افزودن" },
        ].map((tool) => (
          <span
            key={tool.label}
            className={cn(
              "grid size-6 place-items-center rounded-lg",
              tool.active
                ? "bg-foreground text-background"
                : "text-muted-foreground",
            )}
          >
            <tool.icon className="size-3" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 22 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [5, -5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [-3.5, 3.5]);

  return (
    <section
      className="relative overflow-hidden"
      onPointerMove={(event) => {
        if (reduce || event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 paper" />
        <div className="absolute inset-x-0 top-0 h-[720px] grid-lines opacity-80" />
        <div className="absolute left-1/2 top-[-260px] size-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--brand)_20%,transparent),transparent_65%)] blur-2xl" />
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 py-1 pe-3 ps-1 text-[11px] text-muted-foreground shadow-sm backdrop-blur"
        >
          <span className="flex items-center gap-1 rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
            <SparklesIcon className="size-3" />
            نسخهٔ ۲
          </span>
          دستیار بوم حالا هم‌فکر است، نه فقط پاسخ‌گو
          <ArrowUpRightIcon className="size-3" />
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="text-balance mx-auto mt-6 max-w-[840px] text-[33px] font-bold leading-[1.4] tracking-[-0.01em] sm:text-[48px] sm:leading-[1.35] lg:text-[64px] lg:leading-[1.28]"
        >
          هر چیزی که در ذهن داری،
          <br />
          روی یک{" "}
          <span className="relative inline-block">
            <span className="text-gradient">بوم</span>
            <motion.span
              aria-hidden="true"
              initial={reduce ? false : { scaleX: 0 }}
              animate={reduce ? undefined : { scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="absolute inset-x-0 bottom-1.5 -z-10 h-3 origin-right rounded-sm bg-highlight/65 sm:bottom-2 sm:h-4"
            />
          </span>{" "}
          زنده می‌شود.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-balance mx-auto mt-5 max-w-[560px] text-[13px] leading-7 text-muted-foreground sm:mt-6 sm:text-[14.5px] sm:leading-8"
        >
          بوم نه مدیر پروژه است، نه فقط دفترچهٔ یادداشت. یک فضای منعطف که
          یادداشت، سند، جدول و کار تیم را کنار هم نگه می‌دارد — بدون قالب‌های
          سفت و منوهای تودرتو.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
        >
          <Link
            href="/signup"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary pe-5 ps-6 text-[13px] font-medium text-primary-foreground shadow-[0_10px_30px_-12px_rgba(33,30,27,0.65)] transition-transform hover:-translate-y-0.5"
          >
            شروع رایگان
            <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
          <Link
            href="#product"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border/90 bg-card/70 px-5 text-[13px] font-medium text-foreground/80 backdrop-blur transition-colors hover:bg-card hover:text-foreground"
          >
            <span className="grid size-5 place-items-center rounded-full bg-brand/12 text-brand">
              <svg viewBox="0 0 24 24" className="size-2.5 fill-current">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
            بوم را در عمل ببین
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10.5px] text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <span className="flex -space-x-1.5 rtl:space-x-reverse">
              {people.map((person, index) => (
                <Avatar key={person} className="size-5 ring-2 ring-background">
                  <AvatarFallback
                    className={cn(
                      "text-[6.5px]",
                      index === 0
                        ? "bg-[#f6e3da]"
                        : index === 1
                          ? "bg-[#ddecea]"
                          : "bg-[#e8e3f3]",
                    )}
                  >
                    {person}
                  </AvatarFallback>
                </Avatar>
              ))}
            </span>
            بیش از ۲٬۴۰۰ تیم و سازنده
          </span>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span className="flex items-center gap-1">
            <span className="flex gap-0.5 text-brand">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="size-2.5 fill-current" />
              ))}
            </span>
            ۴٫۹ از ۵ در بازخورد کاربران
          </span>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-10 w-full max-w-[1180px] px-3 sm:mt-14 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[12%] top-8 h-64 rounded-full bg-brand/20 blur-[90px]"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 46, scale: 0.975 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          style={
            reduce
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1400,
                  transformStyle: "preserve-3d",
                }
          }
          className="window-shadow relative rounded-2xl bg-card/85 p-1.5 ring-1 ring-foreground/10 backdrop-blur"
        >
          <div className="overflow-hidden rounded-xl border border-border/70 bg-background">
            <WindowChrome />
            <div className="grid grid-cols-1 sm:grid-cols-[158px_1fr]">
              <MiniSidebar />
              <CanvasBody />
            </div>
          </div>
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/70 to-transparent"
        />
      </div>
    </section>
  );
}
