import type { Metadata } from "next";
import {
  ArrowLeftIcon,
  CrownIcon,
  MailIcon,
  MoreHorizontalIcon,
  SearchIcon,
  ShieldIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { team } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "تیم" };

const roleTint: Record<string, string> = {
  مالک: "tint-bg tint-text",
  مدیر: "bg-muted text-foreground",
  ویرایشگر: "bg-muted text-muted-foreground",
  عضو: "bg-muted text-muted-foreground",
  مهمان: "bg-transparent text-muted-foreground ring-1 ring-border",
};

export default function TeamPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="استودیو بوم"
        title="تیم"
        description="آدم‌هایی که با هم می‌سازید. نقش‌ها را ساده نگه داشتیم: هر کس به اندازهٔ کاری که دارد دسترسی می‌گیرد."
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <ShieldIcon className="size-3.5" />
          نقش‌ها و دسترسی
        </Button>
        <Button size="sm" className="gap-1.5">
          <UserPlusIcon className="size-3.5" />
          دعوت عضو
        </Button>
      </PageHeader>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <UsersIcon className="size-3.5 text-muted-foreground" />
              <span className="text-[12px] font-medium">
                {team.length} عضو
              </span>
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                ۱ دعوت در انتظار
              </span>
            </div>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جست‌وجوی عضو"
                className="h-7 w-44 bg-background ps-7 text-[10.5px]"
              />
            </div>
          </div>

          <div className="divide-y divide-border/60">
            {team.map((member) => (
              <div
                key={member.email}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30"
              >
                <Avatar className="size-8">
                  <AvatarFallback
                    className="tint-bg tint-text text-[10px] font-medium"
                    style={tintStyle(member.accent)}
                  >
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[12px] font-medium">
                      {member.name}
                    </span>
                    {member.role === "مالک" && (
                      <CrownIcon className="size-3 text-brand" />
                    )}
                    {member.status === "دعوت‌شده" && (
                      <Badge
                        variant="outline"
                        className="h-4 text-[8.5px] text-muted-foreground"
                      >
                        دعوت‌شده
                      </Badge>
                    )}
                  </div>
                  <div className="truncate text-[9.5px] text-muted-foreground">
                    {member.email} · {member.lastSeen}
                  </div>
                </div>
                <span
                  className={cn(
                    "hidden rounded-full px-2 py-0.5 text-[9px] font-medium sm:block",
                    roleTint[member.role],
                  )}
                  style={member.role === "مالک" ? tintStyle("clay") : undefined}
                >
                  {member.role}
                </span>
                {member.status === "دعوت‌شده" ? (
                  <Button variant="outline" size="xs" className="gap-1">
                    <MailIcon className="size-3" />
                    پیگیری
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="بیشتر"
                    className="text-muted-foreground"
                  >
                    <MoreHorizontalIcon />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border/70 bg-muted/30 px-4 py-2.5">
            <span className="text-[10px] text-muted-foreground">
              نمایش ۷ نفر از ۲۰ صندلی
            </span>
            <button className="flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground">
              تاریخچهٔ دعوت‌ها
              <ArrowLeftIcon className="size-2.5" />
            </button>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="rounded-xl bg-gradient-to-b from-brand/[0.07] to-card p-4 ring-1 ring-foreground/8">
            <div className="text-[12px] font-semibold">دعوت به فضای کاری</div>
            <p className="mt-1 text-[10.5px] leading-5 text-muted-foreground">
              ایمیل همکار را وارد کن. لینک دعوت تا ۷ روز معتبر است.
            </p>
            <div className="mt-3 space-y-2">
              <Input
                placeholder="name@company.com"
                dir="ltr"
                className="h-8 bg-background text-[11px]"
              />
              <div className="flex gap-2">
                <select
                  defaultValue="ویرایشگر"
                  className="h-8 flex-1 rounded-lg border border-input bg-background px-2 text-[10.5px] outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                >
                  <option>ویرایشگر</option>
                  <option>عضو</option>
                  <option>مهمان</option>
                  <option>مدیر</option>
                </select>
                <Button size="sm" className="gap-1">
                  <UserPlusIcon className="size-3.5" />
                  دعوت
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/8">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-medium">صندلی‌ها</span>
              <span className="text-[10px] text-muted-foreground">۷ از ۲۰</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[35%] rounded-full bg-brand" />
            </div>
            <div className="mt-3 space-y-2 text-[10px]">
              {[
                { label: "ویرایشگر", value: "۲ نفر" },
                { label: "عضو", value: "۲ نفر" },
                { label: "مهمان", value: "۱ نفر" },
                { label: "صندلی خالی", value: "۱۳" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-muted-foreground"
                >
                  <span>{row.label}</span>
                  <span className="text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="xs" className="mt-3 w-full">
              مدیریت طرح تیم
            </Button>
          </div>

          <div className="rounded-xl border border-dashed p-4">
            <div className="text-[11.5px] font-medium">دسترسی مهمان</div>
            <p className="mt-1 text-[10px] leading-5 text-muted-foreground">
              مهمان‌ها فقط بوم‌هایی را می‌بینند که برایشان به اشتراک گذاشته
              شود؛ بقیهٔ فضای کاری برایشان پنهان است.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
