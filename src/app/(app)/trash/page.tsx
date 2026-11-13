import type { Metadata } from "next";
import {
  AlertTriangleIcon,
  ClockIcon,
  DatabaseIcon,
  FileTextIcon,
  FrameIcon,
  RotateCcwIcon,
  SearchIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trashItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "سبد زباله" };

const typeIcon: Record<string, typeof FrameIcon> = {
  بوم: FrameIcon,
  سند: FileTextIcon,
  "پایگاه‌داده": DatabaseIcon,
  یادداشت: FileTextIcon,
  فایل: FileTextIcon,
};

export default function TrashPage() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="بازگشت‌پذیر"
        title="سبد زباله"
        description="چیزهایی که حذف کردی تا ۳۰ روز اینجا می‌مانند. هر وقت خواستی می‌توانی برگردانی؛ بعد از آن برای همیشه پاک می‌شوند."
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <SearchIcon className="size-3.5" />
          جست‌وجو
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-destructive hover:text-destructive"
        >
          <Trash2Icon className="size-3.5" />
          خالی کردن سبد
        </Button>
      </PageHeader>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[var(--highlight)]/25 px-3.5 py-3 ring-1 ring-foreground/5">
        <ClockIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
        <p className="text-[11px] leading-5 text-muted-foreground">
          نزدیک‌ترین مورد <span className="font-medium text-foreground">۲۹ روز</span>{" "}
          دیگر پاک می‌شود. تا آن موقع می‌توانی هر آیتم را بازگردانی کنی.
        </p>
        <button
          aria-label="بستن"
          className="ms-auto grid size-5 place-items-center rounded text-muted-foreground hover:bg-foreground/5"
        >
          <XIcon className="size-3" />
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8">
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Trash2Icon className="size-3.5 text-muted-foreground" />
            <span className="text-[11.5px] font-medium">
              {trashItems.length} مورد
            </span>
          </div>
          <div className="relative hidden sm:block">
            <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="جست‌وجو در سبد"
              className="h-7 w-48 bg-background ps-7 text-[10.5px]"
            />
          </div>
        </div>

        <div className="divide-y divide-border/60">
          {trashItems.map((item) => {
            const Icon = typeIcon[item.type];
            return (
              <div
                key={item.title}
                className="group flex flex-col gap-2 px-4 py-3 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[12px] font-medium">
                      {item.title}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[9.5px] text-muted-foreground">
                      <span className="rounded bg-muted px-1.5 py-px">
                        {item.type}
                      </span>
                      <span>حذف: {item.deleted}</span>
                      <span className="text-muted-foreground/60">·</span>
                      <span>توسط {item.by}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 ps-11 sm:ps-0">
                  <div className="hidden w-20 sm:block">
                    <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                      <ClockIcon className="size-2.5" />
                      {item.days} روز
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          item.days <= 14 ? "bg-brand" : "bg-muted-foreground/40",
                        )}
                        style={{ width: `${(item.days / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="gap-1 text-muted-foreground"
                  >
                    <RotateCcwIcon className="size-3" />
                    بازیابی
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="حذف برای همیشه"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
        <AlertTriangleIcon className="size-3" />
        حذف برای همیشه قابل بازگشت نیست؛ فایل‌های پیوست هم پاک می‌شوند.
      </div>
    </div>
  );
}
