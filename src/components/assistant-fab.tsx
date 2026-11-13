"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  Maximize2Icon,
  SparklesIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Message = { id: number; role: "user" | "assistant"; text: string };

const starters = [
  "امروز چه کاری عقب افتاده؟",
  "برای «کمپین بهار» ایده بده",
  "یادداشت‌های پراکنده را مرتب کن",
];

const reply =
  "پیشنهاد می‌کنم با یک بوم خالی شروع کنی و سه ستون «جرقه، ساختن، انتشار» بسازی. هر ایده را در ستون اول رها کن، بدون ویرایش. بعد فقط سه مورد را به ستون دوم ببر. برای این کار آماده‌ای؟";

let nextId = 2;

export function AssistantFab() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [value, setValue] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      const node = listRef.current;
      if (node) node.scrollTop = node.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, typing, open]);

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
        { id: nextId++, role: "assistant", text: reply },
      ]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] transition-opacity sm:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-label="دستیار بوم"
        aria-hidden={!open}
        className={cn(
          "fixed bottom-[4.75rem] left-3 z-50 flex w-[min(380px,calc(100vw-1.5rem))] origin-bottom-left flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10 transition-all duration-200 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <header className="flex items-center gap-2.5 border-b border-border/70 px-3.5 py-3">
          <span className="tint-bg-strong tint-text grid size-8 place-items-center rounded-xl">
            <SparklesIcon className="size-4" />
          </span>
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold">دستیار بوم</div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              همیشه در دسترس
            </div>
          </div>
          <div className="ms-auto flex items-center gap-0.5">
            <Link href="/ai" aria-label="باز کردن صفحهٔ کامل دستیار">
              <Button variant="ghost" size="icon-sm">
                <Maximize2Icon />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="بستن دستیار"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </Button>
          </div>
        </header>

        <div
          ref={listRef}
          className="thin-scrollbar h-[286px] space-y-3 overflow-y-auto px-3.5 py-3.5"
        >
          {messages.length === 0 && !typing && (
            <div className="space-y-3">
              <div className="rounded-xl bg-muted/55 px-3 py-2.5 text-[12px] leading-6">
                سلام {currentUser.name.split(" ")[0]}! هرجا گیر کردی همین‌جا
                بپرس. سریع جواب می‌دهم و اگر خواستی به بوم اضافه‌اش می‌کنیم.
              </div>
              <div className="space-y-1.5">
                {starters.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => send(starter)}
                    className="flex w-full items-center gap-2 rounded-lg border border-dashed px-2.5 py-2 text-start text-[11.5px] text-muted-foreground transition-colors hover:border-brand/45 hover:bg-brand/5 hover:text-foreground"
                  >
                    <SparklesIcon className="size-3 shrink-0 text-brand" />
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[88%] rounded-2xl px-3 py-2 text-[12px] leading-6",
                message.role === "user"
                  ? "ms-auto rounded-se-md bg-secondary"
                  : "rounded-ss-md bg-muted/55",
              )}
            >
              {message.text}
            </div>
          ))}

          {typing && (
            <div className="flex w-fit items-center gap-1 rounded-2xl rounded-ss-md bg-muted/55 px-3 py-2.5">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-1.5 animate-pulse rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${dot * 140}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(value);
          }}
          className="border-t border-border/70 p-2.5"
        >
          <div className="rounded-xl bg-background p-1.5 ring-1 ring-border focus-within:ring-2 focus-within:ring-brand/30">
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
              placeholder="هرچی در ذهنت هست بپرس…"
              className="w-full resize-none bg-transparent px-1.5 py-1 text-[12px] leading-6 outline-none placeholder:text-muted-foreground"
            />
            <div className="flex items-center gap-1 px-0.5">
              <span className="text-[9.5px] text-muted-foreground">
                نمایشی · بدون ارسال واقعی
              </span>
              <Button
                type="submit"
                size="icon-sm"
                aria-label="ارسال"
                disabled={!value.trim() || typing}
                className="ms-auto rounded-full"
              >
                <ArrowUpIcon />
              </Button>
            </div>
          </div>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-label={open ? "بستن دستیار" : "باز کردن دستیار"}
        className={cn(
          "group fixed bottom-4 left-3 z-50 flex h-12 items-center gap-2 rounded-full pe-3.5 ps-3 text-[12.5px] font-medium text-brand-foreground shadow-lg shadow-brand/25 ring-1 ring-brand/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30 sm:bottom-6 sm:left-6",
          "bg-brand",
        )}
      >
        <span className="relative grid size-7 place-items-center">
          {open ? (
            <XIcon className="size-4" />
          ) : (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.6s]" />
              <SparklesIcon className="relative size-4" />
            </>
          )}
        </span>
        <span className="hidden sm:block">{open ? "بستن" : "دستیار"}</span>
        {!open && <ArrowLeftIcon className="hidden size-3.5 opacity-70 sm:block" />}
      </button>
    </>
  );
}
