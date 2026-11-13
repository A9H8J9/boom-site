"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  MenuIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  ShareIcon,
  SparklesIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  XIcon,
} from "lucide-react";
import { LogoMark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiConversations, currentUser } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
  list?: { title: string; body: string }[];
  meta?: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "user",
    text: "از این پنج مصاحبهٔ کاربر یک خلاصهٔ یک‌صفحه‌ای بساز و سه الگوی تکرارشونده را جدا کن.",
  },
  {
    id: 2,
    role: "assistant",
    text: "پنج مصاحبه (۱۲٬۴۰۰ کلمه) را خواندم. سه الگویی که بیش از همه تکرار شد:",
    list: [
      {
        title: "شروع از صفحهٔ خالی ترسناک است",
        body: "۴ از ۵ نفر گفتند بدون یک نقطهٔ شروع مشخص، کار را رها می‌کنند. یک قالب سبک کافی است، نه یک فرایند کامل.",
      },
      {
        title: "می‌خواهند ساختار را خودشان عوض کنند",
        body: "قالب‌های سفت‌وسخت سریع کنار گذاشته می‌شوند. آزادی جابه‌جایی بلوک‌ها مهم‌تر از تعداد قالب‌هاست.",
      },
      {
        title: "جست‌وجو نقطهٔ اتصال است",
        body: "همه دنبال یک چیز بودند: پیدا کردن سریع آن ایدهٔ نیمه‌کاره که هفتهٔ پیش جایی نوشته‌اند.",
      },
    ],
    meta: "منبع: پژوهش کاربر · ۵ فایل",
  },
];

const starterCards = [
  {
    title: "ایده برای کمپین",
    hint: "سه مسیر تازه برای «کمپین بهار»",
    prompt: "برای کمپین بهار سه ایدهٔ اجرایی با بودجهٔ کم پیشنهاد بده.",
  },
  {
    title: "مرتب کردن یادداشت‌ها",
    hint: "از پراکندگی به یک ساختار روشن",
    prompt: "یادداشت‌های پراکندهٔ این هفته را دسته‌بندی کن.",
  },
  {
    title: "خلاصهٔ جلسه",
    hint: "نکته‌ها، تصمیم‌ها و کارهای بعدی",
    prompt: "خلاصهٔ جلسهٔ دیروز را با فهرست تصمیم‌ها بنویس.",
  },
  {
    title: "ساخت نقشهٔ راه",
    hint: "از جرقه تا انتشار در چهار قدم",
    prompt: "برای نسخهٔ دوم محصول یک نقشهٔ راه چهار هفته‌ای بساز.",
  },
];

const cannedReply =
  "باشه، پیشنهاد من این است:\n\n۱. یک بوم خالی بساز و سه ستون «جرقه، ساختن، انتشار» بگذار.\n۲. هر ایده را بدون ویرایش در ستون اول رها کن.\n۳. فقط سه مورد را به ستون دوم ببر و برای هر کدام یک قدم مشخص بنویس.\n\nاگر بخواهی، همین حالا ساختار بلوک‌ها را برایت می‌چینم.";

let nextId = 10;

function AssistantList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="mt-3 space-y-3">
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-2.5">
          <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-[10px] font-medium text-brand">
            {index + 1}
          </span>
          <span className="text-[13px] leading-6">
            <span className="font-medium">{item.title}.</span>{" "}
            <span className="text-muted-foreground">{item.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function MessageActions() {
  return (
    <div className="mt-2 flex items-center gap-0.5 text-muted-foreground opacity-0 transition-opacity group-hover/message:opacity-100">
      <Button variant="ghost" size="icon-xs" aria-label="کپی">
        <CopyIcon />
      </Button>
      <Button variant="ghost" size="icon-xs" aria-label="پسندیدم">
        <ThumbsUpIcon />
      </Button>
      <Button variant="ghost" size="icon-xs" aria-label="نپسندیدم">
        <ThumbsDownIcon />
      </Button>
      <Button variant="ghost" size="icon-xs" aria-label="تلاش دوباره">
        <RefreshCwIcon />
      </Button>
    </div>
  );
}

export function AiChat() {
  const [railOpen, setRailOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [value, setValue] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [activeConversation, setActiveConversation] = React.useState(0);
  const endRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ block: "end" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, typing]);

  React.useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((previous) => [
      ...previous,
      { id: nextId++, role: "user", text: trimmed },
    ]);
    setValue("");
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { id: nextId++, role: "assistant", text: cannedReply },
      ]);
      setTyping(false);
    }, 1000);
  };

  const startNewChat = () => {
    setMessages([]);
    setTyping(false);
    setValue("");
    setRailOpen(false);
  };

  return (
    <div className="relative flex h-[calc(100svh-3.5rem)] overflow-hidden bg-background">
      <div
        onClick={() => setRailOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] transition-opacity lg:hidden",
          railOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        data-open={railOpen}
        className="app-drawer fixed inset-y-0 right-0 z-50 flex w-[272px] flex-col border-e border-border/70 bg-sidebar transition-transform duration-300 lg:static lg:z-auto lg:h-full lg:shrink-0"
      >
        <div className="flex h-12 items-center justify-between px-3 lg:h-14">
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <LogoMark className="size-6" />
            دستیار بوم
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label="بستن فهرست گفتگوها"
            onClick={() => setRailOpen(false)}
          >
            <XIcon />
          </Button>
        </div>

        <div className="space-y-2 px-2.5">
          <button
            type="button"
            onClick={startNewChat}
            className="flex h-9 w-full items-center gap-2 rounded-xl border border-border bg-card px-2.5 text-[12.5px] font-medium shadow-sm transition-colors hover:bg-muted"
          >
            <PlusIcon className="size-4 text-brand" />
            گفتگوی تازه
          </button>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جست‌وجوی گفتگو"
              className="h-8 bg-card ps-8 text-[11.5px]"
            />
          </div>
        </div>

        <div className="thin-scrollbar mt-3 flex-1 overflow-y-auto px-2.5 pb-3">
          {["امروز", "پیش‌تر"].map((group, groupIndex) => (
            <div key={group} className="mb-4">
              <div className="px-1.5 pb-1 text-[10px] font-medium text-muted-foreground">
                {group}
              </div>
              <div className="space-y-0.5">
                {aiConversations
                  .filter((_, index) => (groupIndex === 0 ? index < 2 : index >= 2))
                  .map((conversation) => {
                    const index = aiConversations.indexOf(conversation);
                    const active = index === activeConversation;
                    return (
                      <button
                        key={conversation.title}
                        type="button"
                        onClick={() => {
                          setActiveConversation(index);
                          setRailOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-start text-[11.5px] transition-colors",
                          active
                            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                        )}
                      >
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={tintStyle(conversation.accent)}
                        />
                        <span className="truncate">{conversation.title}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t border-border/70 p-2.5">
          <div className="rounded-xl bg-card p-2.5 ring-1 ring-border">
            <div className="flex items-center justify-between text-[10.5px]">
              <span className="font-medium">استفادهٔ امروز</span>
              <span className="text-muted-foreground">۳۸ از ۱۰۰</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[38%] rounded-full bg-brand" />
            </div>
            <Link
              href="/plans"
              className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-brand hover:underline"
            >
              <SparklesIcon className="size-2.5" />
              ارتقا به نامحدود
            </Link>
          </div>
          <div className="flex items-center gap-2 px-1 py-1">
            <span
              className="tint-bg tint-text grid size-6 place-items-center rounded-full text-[9px] font-medium"
              style={tintStyle("clay")}
            >
              {currentUser.initials}
            </span>
            <span className="truncate text-[11px]">{currentUser.name}</span>
            <Link
              href="/profile"
              className="ms-auto text-[10px] text-muted-foreground hover:text-foreground"
            >
              حساب
            </Link>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-1.5 border-b border-border/60 px-3 sm:px-5">
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label="فهرست گفتگوها"
            onClick={() => setRailOpen(true)}
          >
            <MenuIcon />
          </Button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-semibold transition-colors hover:bg-muted"
          >
            بوم ۲
            <ChevronDownIcon className="size-3.5 text-muted-foreground" />
          </button>
          <span className="hidden rounded-full bg-muted px-2 py-0.5 text-[9.5px] text-muted-foreground sm:inline">
            نسخهٔ آزمایشی
          </span>
          <div className="ms-auto flex items-center gap-0.5">
            <Button variant="ghost" size="icon-sm" aria-label="اشتراک‌گذاری">
              <ShareIcon />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="گزینه‌های بیشتر">
              <MoreHorizontalIcon />
            </Button>
          </div>
        </header>

        <div className="thin-scrollbar flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="mx-auto flex h-full w-full max-w-[760px] flex-col items-center justify-center px-5 pb-16 text-center">
              <LogoMark className="size-11" />
              <h1 className="mt-4 text-[24px] font-bold tracking-tight">
                چه چیزی می‌سازیم؟
              </h1>
              <p className="mt-1.5 max-w-sm text-[12.5px] leading-6 text-muted-foreground">
                هر چیزی که در ذهن داری بنویس؛ از یک جرقهٔ کوچک تا یک نقشهٔ کامل.
              </p>
              <div className="mt-7 grid w-full max-w-xl gap-2 sm:grid-cols-2">
                {starterCards.map((card) => (
                  <button
                    key={card.title}
                    type="button"
                    onClick={() => send(card.prompt)}
                    className="rounded-2xl bg-card p-3.5 text-start ring-1 ring-foreground/8 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="block text-[12.5px] font-medium">
                      {card.title}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] text-muted-foreground">
                      {card.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[760px] space-y-7 px-4 py-6 sm:px-6">
              {messages.map((message) =>
                message.role === "user" ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-3xl rounded-se-lg bg-secondary px-4 py-2.5 text-[13px] leading-6">
                      {message.text}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="group/message flex gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <SparklesIcon className="size-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10.5px] font-medium text-muted-foreground">
                        دستیار بوم
                      </div>
                      <p className="mt-1 whitespace-pre-line text-[13.5px] leading-7">
                        {message.text}
                      </p>
                      {message.list && <AssistantList items={message.list} />}
                      {message.meta && (
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">
                          <CheckIcon className="size-2.5" />
                          {message.meta}
                        </div>
                      )}
                      <MessageActions />
                    </div>
                  </div>
                ),
              )}

              {typing && (
                <div className="flex gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <SparklesIcon className="size-3.5" />
                  </span>
                  <div className="flex items-center gap-1 pt-2.5">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60"
                        style={{ animationDelay: `${dot * 140}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          )}
        </div>

        <div className="bg-gradient-to-t from-background via-background to-transparent px-3 pb-3 pt-1 sm:px-6 sm:pb-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(value);
            }}
            className="mx-auto w-full max-w-[760px]"
          >
            <div className="rounded-[26px] bg-card p-2 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)] ring-1 ring-border focus-within:ring-2 focus-within:ring-brand/30">
              <textarea
                rows={2}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send(value);
                  }
                }}
                placeholder="پیامت را بنویس…"
                className="max-h-40 w-full resize-none bg-transparent px-2.5 py-2 text-[13px] leading-6 outline-none placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-1 px-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="پیوست فایل"
                  className="rounded-full"
                >
                  <PaperclipIcon />
                </Button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[10.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <SparklesIcon className="size-3 text-brand" />
                  ابزارها
                </button>
                <span className="ms-auto hidden text-[9.5px] text-muted-foreground sm:block">
                  Enter برای ارسال
                </span>
                <Button
                  type="submit"
                  size="icon-sm"
                  aria-label="ارسال پیام"
                  disabled={!value.trim() || typing}
                  className="ms-1 rounded-full"
                >
                  <ArrowUpIcon />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-center text-[9.5px] text-muted-foreground">
              دستیار ممکن است اشتباه کند. پیش از تصمیم‌های مهم، منابع را بررسی
              کن.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
