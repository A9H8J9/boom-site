import type { Metadata } from "next";
import {
  BellIcon,
  CameraIcon,
  CheckIcon,
  CreditCardIcon,
  GlobeIcon,
  LinkIcon,
  LockIcon,
  LogOutIcon,
  PaletteIcon,
  ShieldIcon,
  SparklesIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { currentUser, stats } from "@/lib/mock-data";
import { tintStyle } from "@/lib/accents";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "پروفایل" };

const tabs = [
  { label: "پروفایل", icon: UserIcon, active: true },
  { label: "ظاهر", icon: PaletteIcon },
  { label: "اعلان‌ها", icon: BellIcon },
  { label: "امنیت", icon: ShieldIcon },
  { label: "صورتحساب", icon: CreditCardIcon },
];

const notifications = [
  { label: "دعوت به بوم", description: "وقتی کسی تو را به بومی اضافه می‌کند", on: true },
  { label: "پاسخ و منشن", description: "وقتی در نوشته‌ای به تو اشاره می‌شود", on: true },
  { label: "تغییرات مشترک", description: "وقتی همکاری بوم مشترک را ویرایش می‌کند", on: false },
  { label: "خبرنامهٔ بوم", description: "ماهی یک ایمیل دربارهٔ تازه‌ها", on: true },
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-start sm:gap-4">
      <div className="pt-0.5">
        <div className="text-[11.5px] font-medium">{label}</div>
        {hint && (
          <div className="mt-0.5 text-[9.5px] leading-4 text-muted-foreground">
            {hint}
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Switch({ on, label }: { on?: boolean; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-checked={on}
      role="switch"
      className={cn(
        "flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors",
        on ? "bg-brand" : "bg-muted-foreground/25",
      )}
    >
      <span
        className={cn(
          "size-4 rounded-full bg-white shadow-sm transition-transform",
          on ? "-translate-x-4" : "translate-x-0",
        )}
      />
    </button>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <PageHeader
        eyebrow="تنظیمات حساب"
        title="پروفایل"
        description="ظاهر، اعلان‌ها و اطلاعات حسابت را از اینجا مدیریت کن."
      >
        <Button variant="outline" size="sm">
          مشاهدهٔ نمایهٔ عمومی
        </Button>
        <Button size="sm" className="gap-1.5">
          <CheckIcon className="size-3.5" />
          ذخیرهٔ تغییرات
        </Button>
      </PageHeader>

      <div className="mt-6 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8">
        <div
          className="relative h-28 tint-cover"
          style={tintStyle("clay")}
        >
          <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
          <Button
            variant="outline"
            size="xs"
            className="absolute end-3 top-3 gap-1 bg-card/80 backdrop-blur"
          >
            <CameraIcon className="size-3" />
            تغییر پس‌زمینه
          </Button>
        </div>

        <div className="relative px-4 pb-4 sm:px-6">
          <div className="-mt-8 flex flex-wrap items-end gap-3">
            <div className="relative">
              <Avatar className="size-16 ring-4 ring-card">
                <AvatarFallback
                  className="tint-bg tint-text text-[18px] font-bold"
                  style={tintStyle("clay")}
                >
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <button
                aria-label="تغییر تصویر"
                className="absolute -end-0.5 -bottom-0.5 grid size-6 place-items-center rounded-full bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"
              >
                <CameraIcon className="size-3" />
              </button>
            </div>
            <div className="pb-0.5">
              <h2 className="text-[17px] font-bold tracking-tight">
                {currentUser.name}
              </h2>
              <p className="text-[11px] text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
            <span
              className="tint-bg tint-text mb-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-medium"
              style={tintStyle("amber")}
            >
              <SparklesIcon className="size-2.5" />
              طرح {currentUser.plan}
            </span>
            <div className="ms-auto flex items-center gap-2 pb-0.5">
              <span className="text-[10px] text-muted-foreground">
                عضو از مهر ۱۴۰۴
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto border-t border-border/70 px-3 no-scrollbar sm:px-5">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={cn(
                "flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-[11.5px] transition-colors",
                tab.active
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <tab.icon className="size-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <section className="rounded-xl bg-card p-4 ring-1 ring-foreground/8 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <UserIcon className="size-3.5 text-muted-foreground" />
              <h3 className="text-[12.5px] font-semibold">اطلاعات پایه</h3>
            </div>
            <div className="space-y-4">
              <Field label="نام نمایشی">
                <Input defaultValue={currentUser.name} className="h-8 bg-background text-[11.5px]" />
              </Field>
              <Field
                label="نام کاربری"
                hint="آدرس نمایهٔ عمومی تو در بوم"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] text-muted-foreground">
                    boom.studio/
                  </span>
                  <Input
                    defaultValue="sara"
                    dir="ltr"
                    className="h-8 max-w-40 bg-background text-[11.5px]"
                  />
                </div>
              </Field>
              <Field label="ایمیل" hint="برای ورود و اعلان‌ها استفاده می‌شود">
                <Input
                  defaultValue={currentUser.email}
                  dir="ltr"
                  className="h-8 bg-background text-[11.5px]"
                />
              </Field>
              <Field label="معرفی کوتاه" hint="حداکثر ۱۶۰ کاراکتر">
                <textarea
                  rows={3}
                  defaultValue="طراح محصول و علاقه‌مند به ساختن فضاهای آزاد برای فکر کردن. معمولاً روی بوم، وسط ایده‌های نیمه‌کاره پیدا می‌شوم."
                  className="w-full resize-none rounded-lg border border-input bg-background px-2.5 py-2 text-[11.5px] leading-6 outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                />
              </Field>
              <Field label="منطقهٔ زمانی">
                <select
                  defaultValue="Asia/Tehran"
                  className="h-8 w-full rounded-lg border border-input bg-background px-2 text-[11.5px] outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                >
                  <option value="Asia/Tehran">تهران (GMT+3:30)</option>
                  <option value="Asia/Dubai">دبی (GMT+4)</option>
                  <option value="Europe/Berlin">برلین (GMT+1)</option>
                </select>
              </Field>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] text-muted-foreground">
                آخرین ذخیره: ۲ دقیقه پیش
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  انصراف
                </Button>
                <Button size="sm">ذخیره</Button>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-card p-4 ring-1 ring-foreground/8 sm:p-5">
            <div className="mb-1 flex items-center gap-2">
              <BellIcon className="size-3.5 text-muted-foreground" />
              <h3 className="text-[12.5px] font-semibold">اعلان‌ها</h3>
            </div>
            <p className="mb-3 text-[10.5px] text-muted-foreground">
              انتخاب کن چه چیزهایی را در ایمیل و اپ ببینی.
            </p>
            <div className="divide-y divide-border/60">
              {notifications.map((notification) => (
                <div
                  key={notification.label}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <div>
                    <div className="text-[11.5px] font-medium">
                      {notification.label}
                    </div>
                    <div className="text-[9.5px] text-muted-foreground">
                      {notification.description}
                    </div>
                  </div>
                  <Switch on={notification.on} label={notification.label} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-xl bg-card p-4 ring-1 ring-foreground/8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
                <PaletteIcon className="size-3.5 text-muted-foreground" />
                ظاهر
              </div>
              <ThemeToggle variant="outline" />
            </div>
            <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
              ظاهر روشن، تاریک یا هم‌رنگ سیستم. تغییر بلافاصله اعمال می‌شود.
            </p>

            <Separator className="my-3" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px]">
                <GlobeIcon className="size-3 text-muted-foreground" />
                زبان
              </div>
              <span className="rounded-md bg-muted px-2 py-0.5 text-[9.5px] text-muted-foreground">
                فارسی
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px]">
                <LinkIcon className="size-3 text-muted-foreground" />
                جهت
              </div>
              <span className="rounded-md bg-muted px-2 py-0.5 text-[9.5px] text-muted-foreground">
                راست‌به‌چپ
              </span>
            </div>
          </section>

          <section className="rounded-xl bg-card p-4 ring-1 ring-foreground/8">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-medium">طرح فعلی</span>
              <span
                className="tint-bg tint-text rounded-full px-2 py-0.5 text-[9.5px]"
                style={tintStyle("amber")}
              >
                {currentUser.plan}
              </span>
            </div>
            <div className="mt-3 space-y-2 text-[10px]">
              {stats.slice(0, 3).map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between text-muted-foreground"
                >
                  <span>{stat.label}</span>
                  <span className="text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="xs" className="mt-3 w-full gap-1">
              <CreditCardIcon className="size-3" />
              مدیریت اشتراک
            </Button>
          </section>

          <section className="rounded-xl bg-card p-4 ring-1 ring-foreground/8">
            <div className="flex items-center gap-1.5 text-[11.5px] font-medium">
              <ShieldIcon className="size-3.5 text-muted-foreground" />
              امنیت
            </div>
            <div className="mt-3 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-1.5 text-[10.5px]"
              >
                <LockIcon className="size-3" />
                تغییر رمز عبور
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-1.5 text-[10.5px]"
              >
                <LogOutIcon className="size-3" />
                خروج از همهٔ دستگاه‌ها
              </Button>
            </div>
          </section>

          <section className="rounded-xl border border-destructive/25 p-4">
            <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-destructive">
              <Trash2Icon className="size-3.5" />
              حذف حساب
            </div>
            <p className="mt-1.5 text-[10px] leading-4 text-muted-foreground">
              همهٔ بوم‌ها و فایل‌ها پاک می‌شوند. این کار قابل بازگشت نیست.
            </p>
            <Button
              variant="destructive"
              size="xs"
              className="mt-2.5 w-full"
            >
              حذف حساب کاربری
            </Button>
          </section>
        </aside>
      </div>
    </div>
  );
}
