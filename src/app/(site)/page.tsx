import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CommandIcon,
  FileTextIcon,
  FrameIcon,
  LayoutGridIcon,
  LayoutTemplateIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  StickyNoteIcon,
  Table2Icon,
  UsersIcon,
} from "lucide-react";
import { Hero } from "@/components/landing/hero";
import { ProductTour } from "@/components/landing/product-tour";
import { Reveal } from "@/components/reveal";
import { Preview } from "@/components/preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { templates } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "بوم — فضای آزاد برای فکر کردن و ساختن",
  description:
    "بوم یک فضای کاری خلاقانه و منعطف است؛ جایی برای ایده‌پردازی، ساختن و سازمان‌دهی هر چیزی که در ذهن داری.",
};

const logos = [
  "آتلیه نور",
  "استودیو رها",
  "مدرسهٔ فردا",
  "کافهٔ کاغذی",
  "تیم پارسا",
  "دفتر معماری کاج",
];

function CanvasMini() {
  return (
    <div className="relative h-24 overflow-hidden rounded-xl bg-muted/30 dot-grid-sm">
      <div className="note-shadow absolute start-3 top-3 w-[46%] -rotate-2 rounded-md bg-[#fdf6d8] p-2">
        <div className="h-1 w-2/3 rounded-full bg-[#b59a4a]/40" />
        <div className="mt-1.5 h-1 w-full rounded-full bg-[#b59a4a]/20" />
        <div className="mt-1 h-1 w-4/5 rounded-full bg-[#b59a4a]/20" />
      </div>
      <div className="absolute end-3 top-5 w-[38%] rotate-2 rounded-md bg-card p-2 shadow-sm ring-1 ring-foreground/8">
        <span className="mb-1 block size-2 rounded-full bg-brand/70" />
        <div className="h-1 w-full rounded-full bg-foreground/10" />
        <div className="mt-1 h-1 w-2/3 rounded-full bg-foreground/10" />
      </div>
      <div className="absolute start-1/3 bottom-2 w-[42%] rounded-md bg-card p-1.5 shadow-sm ring-1 ring-foreground/8">
        <div className="flex gap-1">
          <span className="h-4 flex-1 rounded-sm bg-brand/15" />
          <span className="h-4 flex-1 rounded-sm bg-foreground/5" />
          <span className="h-4 flex-1 rounded-sm bg-foreground/5" />
        </div>
      </div>
    </div>
  );
}

const blockTypes = [
  { icon: FileTextIcon, label: "سند" },
  { icon: StickyNoteIcon, label: "یادداشت" },
  { icon: Table2Icon, label: "جدول" },
  { icon: LayoutGridIcon, label: "تخته" },
  { icon: FrameIcon, label: "گالری" },
  { icon: PlusIcon, label: "بیشتر" },
];

function ShapesMini() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {blockTypes.map((block) => (
        <div
          key={block.label}
          className="flex items-center gap-1.5 rounded-lg bg-muted/40 px-1.5 py-2 ring-1 ring-border/50"
        >
          <block.icon className="size-3 text-brand/80" />
          <span className="text-[9px] text-muted-foreground">{block.label}</span>
        </div>
      ))}
    </div>
  );
}

function AssistantMini() {
  return (
    <div className="space-y-2">
      <div className="ms-auto w-fit rounded-xl rounded-se-sm bg-primary px-2.5 py-1.5 text-[9px] leading-4 text-primary-foreground">
        خلاصهٔ جلسهٔ دیروز را بده
      </div>
      <div className="w-fit max-w-[92%] rounded-xl rounded-ss-sm bg-muted/50 px-2.5 py-2 text-[9px] leading-5">
        سه تصمیم کلیدی پیدا کردم و دو کار باز...
        <span className="mt-1.5 flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-1 rounded-full bg-brand/50" />
          ))}
        </span>
      </div>
    </div>
  );
}

function TemplatesMini() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <Preview kind="doc" accent="teal" className="h-16 rounded-lg" />
      <Preview kind="board" accent="amber" className="h-16 rounded-lg" />
      <Preview kind="table" accent="violet" className="h-16 rounded-lg" />
    </div>
  );
}

function SearchMini() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 rounded-lg bg-background px-2 py-1.5 text-[9px] text-muted-foreground ring-1 ring-border">
        <SearchIcon className="size-2.5" />
        نقشهٔ راه
        <span className="ms-auto rounded border border-border px-1 text-[8px]">
          ⌘K
        </span>
      </div>
      {["نقشهٔ راه بهار", "بازبینی نقشهٔ راه", "یادداشت جلسه"].map((row) => (
        <div
          key={row}
          className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[9px] text-muted-foreground"
        >
          <FrameIcon className="size-2.5" />
          {row}
        </div>
      ))}
    </div>
  );
}

function CollabMini() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex -space-x-2 rtl:space-x-reverse">
        {["س‌م", "ن‌ک", "ا‌ر", "پ‌ن"].map((person, index) => (
          <Avatar key={person} className="size-7 ring-2 ring-card">
            <AvatarFallback
              className={cn(
                "text-[9px]",
                ["bg-[#f6e3da]", "bg-[#ddecea]", "bg-[#e8e3f3]", "bg-[#e4ecdf]"][
                  index
                ],
              )}
            >
              {person}
            </AvatarFallback>
          </Avatar>
        ))}
        <span className="grid size-7 place-items-center rounded-full bg-muted text-[9px] text-muted-foreground ring-2 ring-card">
          +۴
        </span>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-card px-2 py-1 text-[9.5px] text-muted-foreground ring-1 ring-border">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        ۳ نفر آنلاین
      </span>
      <span className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2 py-1 text-[9.5px]">
        <span className="size-1.5 rounded-full bg-brand" />
        نگار: «این بخش را با هم ببینیم؟»
      </span>
    </div>
  );
}

const features = [
  {
    icon: FrameIcon,
    title: "بومِ بی‌مرز",
    description:
      "صفحه‌ای که ته ندارد. هر چیزی را هرجا خواستی بگذار؛ هیچ ساختاری تحمیل نمی‌شود.",
    accent: "clay" as const,
    span: "lg:col-span-3",
    visual: <CanvasMini />,
  },
  {
    icon: LayoutGridIcon,
    title: "هر شکلی که بخواهی",
    description:
      "یادداشت چسبان، سند، جدول، تخته و گالری — همه در یک بوم و کنار هم.",
    accent: "amber" as const,
    span: "lg:col-span-3",
    visual: <ShapesMini />,
  },
  {
    icon: SparklesIcon,
    title: "دستیار هم‌فکر",
    description:
      "از دل نوشته‌هایت خلاصه می‌سازد، ساختار پیشنهاد می‌دهد و راه نشان می‌دهد.",
    accent: "violet" as const,
    span: "lg:col-span-2",
    visual: <AssistantMini />,
  },
  {
    icon: LayoutTemplateIcon,
    title: "قالب‌های آزاد",
    description:
      "قالب فقط یک نقطهٔ شروع است؛ هر بخشش را عوض کن یا از نو بساز.",
    accent: "teal" as const,
    span: "lg:col-span-2",
    visual: <TemplatesMini />,
  },
  {
    icon: SearchIcon,
    title: "جست‌وجوی همه‌چیز",
    description:
      "با یک میان‌بر، هر بلوک و فایلی را در همهٔ بوم‌هایت پیدا کن.",
    accent: "sky" as const,
    span: "lg:col-span-2",
    visual: <SearchMini />,
  },
  {
    icon: UsersIcon,
    title: "ساختن با هم",
    description:
      "نظر بده، منشن کن و بوم را با تیم یا مهمان‌ها به اشتراک بگذار؛ بدون شلوغی.",
    accent: "sage" as const,
    span: "lg:col-span-6",
    visual: <CollabMini />,
  },
];

const steps = [
  {
    title: "بساز",
    description: "یک صفحهٔ خالی بردار و اولین فکرت را همان‌جا بگذار.",
  },
  {
    title: "بچین",
    description: "هرجا لازم شد جدول، تخته یا یادداشت اضافه کن. ساختار بعداً می‌آید.",
  },
  {
    title: "به اشتراک بگذار",
    description: "لینک بوم را برای تیم بفرست یا مهمان دعوت کن.",
  },
];

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-9 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] tracking-wide text-muted-foreground">
            مورد اعتماد تیم‌های کوچک و بزرگ
          </p>
          <div className="marquee-mask mt-5 overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-12">
              {[...logos, ...logos].map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-foreground/45"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductTour />

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/8 px-2.5 py-1 text-[10.5px] font-medium text-brand ring-1 ring-brand/15">
            <SparklesIcon className="size-3" />
            یک ابزار، هزار شکل
          </span>
          <h2 className="text-balance mt-4 text-[25px] font-bold leading-[1.5] sm:text-[34px] sm:leading-[1.45]">
            ساخته‌شده برای فکرهایی که هنوز شکل نگرفته‌اند.
          </h2>
          <p className="mt-3 max-w-lg text-[12px] leading-6 text-muted-foreground sm:text-[13px] sm:leading-7">
            ابزارهای معمول از تو می‌خواهند اول تصمیم بگیری چه می‌سازی. بوم برعکس
            است: اول بساز، بعد تصمیم بگیر.
          </p>
        </div>

        <div className="mt-7 grid gap-3 lg:grid-cols-6">
          {features.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={index * 0.04}
              className={feature.span}
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card p-5 shadow-card ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className="flex items-center gap-2.5">
                  <span
                    className="tint-bg tint-text grid size-8 place-items-center rounded-xl"
                    style={tintStyle(feature.accent)}
                  >
                    <feature.icon className="size-4" />
                  </span>
                  <h3 className="text-[13.5px] font-semibold">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 flex-1 text-[11.5px] leading-6 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-4">{feature.visual}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(120deg,#211d19,#2a231c_55%,#38291f)] px-5 py-8 text-[#f4efe7] shadow-lift sm:px-9 sm:py-11">
            <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.1]" />
            <div
              aria-hidden="true"
              className="absolute -end-24 -top-24 size-72 rounded-full bg-brand/35 blur-[80px]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 start-1/4 size-64 rounded-full bg-[#c9a227]/15 blur-[70px]"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1 text-[10px] text-white/70 ring-1 ring-white/10">
                  <SparklesIcon className="size-3" />
                  دستیار بوم ۲
                </span>
                <h2 className="text-balance mt-3 text-[25px] font-bold leading-[1.5] sm:text-[32px]">
                  دستیاری که بومت را
                  <br className="hidden sm:block" /> خوانده است.
                </h2>
                <p className="mt-3 max-w-md text-[12px] leading-6 text-white/60">
                  لازم نیست همه‌چیز را از صفر توضیح بدهی. دستیار در بوم‌های خودت
                  جست‌وجو می‌کند، منابع را می‌آورد و فقط پیشنهاد می‌دهد — تصمیم
                  با توست.
                </p>
                <div className="mt-5 space-y-2">
                  {[
                    "خلاصهٔ جلسه‌ها و مصاحبه‌ها",
                    "تبدیل یادداشت پراکنده به ساختار",
                    "پیشنهاد قدم بعدی روی نقشهٔ راه",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[11px]">
                      <span className="grid size-4 place-items-center rounded-full bg-brand/20 text-brand">
                        <CheckIcon className="size-2.5" />
                      </span>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/ai"
                  className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-[#f6f1e9] px-3.5 text-[12px] font-medium text-[#221e1a] transition-transform hover:-translate-y-0.5"
                >
                  گفتگو با دستیار
                  <ArrowLeftIcon className="size-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl bg-[#f8f4ec] p-3 text-[#2c2620] shadow-2xl ring-1 ring-white/10">
                <div className="flex items-center gap-2 border-b border-black/5 pb-2">
                  <span className="grid size-6 place-items-center rounded-lg bg-[#7464a8]/12 text-[#7464a8]">
                    <SparklesIcon className="size-3" />
                  </span>
                  <span className="text-[10.5px] font-medium">بوم ۲</span>
                  <span className="ms-auto flex items-center gap-1 text-[8px] text-[#8a7f70]">
                    <span className="size-1 rounded-full bg-emerald-500" />
                    آنلاین
                  </span>
                </div>
                <div className="space-y-2.5 pt-3">
                  <div className="ms-auto w-fit max-w-[85%] rounded-xl rounded-se-sm bg-[#221e1a] px-2.5 py-1.5 text-[9.5px] leading-4 text-[#f6f1e9]">
                    از یادداشت‌های جلسهٔ دیروز یک خلاصه بساز.
                  </div>
                  <div className="w-fit max-w-[92%] rounded-xl rounded-ss-sm bg-white px-2.5 py-2 text-[9.5px] leading-5 ring-1 ring-black/5">
                    سه تصمیم اصلی: شروع با قالب سبک، حذف مرحلهٔ تأیید دوم، و
                    تغییر نام «فضا» به «بوم». دو کار باز هم پیدا کردم:
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {["بازبینی متن", "دعوت مهمان"].map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full bg-[#f4efe6] px-1.5 py-0.5 text-[8px] text-[#6b5f52] ring-1 ring-black/5"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-white px-2 py-1.5 ring-1 ring-black/8">
                    <span className="text-[9px] text-[#8a7f70]">چیزی بپرس…</span>
                    <span className="caret ms-auto h-3 w-px bg-[#221e1a]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border/60 bg-muted/25">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="text-[10.5px] font-medium text-brand">
              سه قدم ساده
            </span>
            <h2 className="text-balance mt-3 text-[25px] font-bold leading-[1.5] sm:text-[32px]">
              از یک صفحهٔ خالی تا چیزی که به آن افتخار می‌کنی.
            </h2>
          </Reveal>

          <div className="relative mt-9 grid gap-3 sm:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute inset-x-[16%] top-9 hidden h-px border-t border-dashed border-border sm:block"
            />
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="relative flex h-full flex-col rounded-2xl bg-card p-5 shadow-card ring-1 ring-foreground/8">
                  <span className="grid size-8 place-items-center rounded-full bg-brand/10 text-[11px] font-bold text-brand ring-1 ring-brand/15">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 text-[13.5px] font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[900px] px-4 py-16 text-center sm:px-6 sm:py-20">
        <Reveal>
          <div className="flex justify-center gap-0.5 text-brand">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} className="size-3.5 fill-current" />
            ))}
          </div>
          <blockquote className="text-balance mx-auto mt-4 max-w-2xl text-[18px] font-medium leading-[1.9] sm:text-[24px]">
            «مدت‌ها دنبال ابزاری بودم که به من نگوید چه کار کنم. بوم همان است؛
            یک صفحهٔ آزاد که هر وقت خواستم مرتبش کردم.»
          </blockquote>
          <div className="mt-5 flex items-center justify-center gap-2.5">
            <Avatar className="size-8">
              <AvatarFallback className="tint-bg tint-text text-[10px]">
                ا‌ر
              </AvatarFallback>
            </Avatar>
            <div className="text-start">
              <div className="text-[11.5px] font-medium">امیر رضایی</div>
              <div className="text-[10px] text-muted-foreground">
                مدیر محصول، استودیو رها
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-bold tracking-tight sm:text-[24px]">
                از یک نقطهٔ شروع مطمئن
              </h2>
              <p className="mt-1.5 max-w-md text-[11.5px] leading-6 text-muted-foreground">
                قالب‌ها فقط پیشنهادند. هرکدام را برداشتی، همه‌چیز قابل تغییر
                است.
              </p>
            </div>
            <Link
              href="/templates"
              className="flex shrink-0 items-center gap-1 text-[11.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              همهٔ قالب‌ها
              <ArrowLeftIcon className="size-3.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {templates.slice(1, 4).map((template, index) => (
            <Reveal key={template.name} delay={index * 0.06}>
              <Link
                href="/templates"
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <Preview
                  kind={template.kind}
                  accent={template.accent}
                  className="h-36"
                />
                <div className="flex items-center gap-2 p-3.5">
                  <div className="min-w-0">
                    <div className="truncate text-[12px] font-medium">
                      {template.name}
                    </div>
                    <div className="text-[9.5px] text-muted-foreground">
                      {template.category} · {template.uses} استفاده
                    </div>
                  </div>
                  <ArrowUpRightIcon className="ms-auto size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-18 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[#211e1b] px-6 py-12 text-center text-[#f6f1e9] shadow-lift sm:px-10 sm:py-16">
            <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.12]" />
            <div
              aria-hidden="true"
              className="absolute -end-24 -top-24 size-72 rounded-full bg-brand/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 -start-16 size-80 rounded-full bg-[#c9a227]/20 blur-3xl"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9.5px] text-white/70">
                <CommandIcon className="size-2.5" />
                امروز یک صفحهٔ خالی، فردا یک فضای کاری
              </span>
              <h2 className="text-balance mt-4 text-[26px] font-bold leading-[1.5] sm:text-[34px]">
                جایی برای آن فکری که
                <br /> هنوز جایی نداشته.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[11.5px] leading-6 text-white/60">
                رایگان شروع کن، بدون کارت بانکی. اگر بوم بخشی از روزت شد، آن‌وقت
                به ارتقا فکر کن.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center gap-1.5 rounded-[10px] bg-[#f6f1e9] px-4 text-[12.5px] font-medium text-[#211e1b] transition-transform hover:-translate-y-0.5"
                >
                  شروع رایگان
                  <ArrowLeftIcon className="size-4" />
                </Link>
                <Link
                  href="/plans"
                  className="inline-flex h-10 items-center rounded-[10px] border border-white/15 px-4 text-[12.5px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  دیدن قیمت‌ها
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
