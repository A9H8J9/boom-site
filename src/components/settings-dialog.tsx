"use client";

import * as React from "react";
import {
  BellIcon,
  CreditCardIcon,
  GlobeIcon,
  KeyboardIcon,
  LayoutGridIcon,
  LogOutIcon,
  MonitorIcon,
  MonitorSmartphoneIcon,
  MoonIcon,
  PlugIcon,
  ReceiptIcon,
  SettingsIcon,
  SmartphoneIcon,
  SparklesIcon,
  SunIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useMe,
  useNotificationSettings,
  useUpdateNotificationSettings,
  useUpdateUserSettings,
  useUserSettings,
  type UpdateNotificationSettingsInput,
  type UserSettings,
} from "@/lib/apis";
import { clearToken } from "@/lib/axios";
import { cn } from "@/lib/utils";

type Tab =
  | "account-info"
  | "notifications"
  | "personal-settings"
  | "workspace-general"
  | "people"
  | "invoices"
  | "plans"
  | "connections"
  | "ai"
  | "keyboard-shortcuts";

type Mode = "light" | "dark" | "system";
type Language = "fa" | "en";
type StartPage = "dashboard" | "last-visit" | "ai" | "projects" | "my-canvases";
type TitleMode = "untitled" | "date";

const sections = [
  {
    title: "حساب",
    items: [
      {
        id: "account-info" as Tab,
        label: "اطلاعات حساب کاربری",
        icon: UserIcon,
      },
      { id: "notifications" as Tab, label: "اعلان ها", icon: BellIcon },
      {
        id: "personal-settings" as Tab,
        label: "تنظیمات شخصی",
        icon: SettingsIcon,
      },
    ],
  },
  {
    title: "فضای کاری",
    items: [
      { id: "workspace-general" as Tab, label: "عمومی", icon: LayoutGridIcon },
      { id: "people" as Tab, label: "افراد", icon: UsersIcon },
    ],
  },
  {
    title: "دسترسی و پرداخت",
    items: [
      { id: "invoices" as Tab, label: "صورت‌حساب‌ها", icon: ReceiptIcon },
      { id: "plans" as Tab, label: "طرح‌ها و اشتراک", icon: CreditCardIcon },
    ],
  },
  {
    title: "قابلیت‌ها",
    items: [
      { id: "connections" as Tab, label: "اتصال ها", icon: PlugIcon },
      { id: "ai" as Tab, label: "هوش مصنوعی", icon: SparklesIcon },
    ],
  },
];

const standaloneTab = {
  id: "keyboard-shortcuts" as Tab,
  label: "میانبر های صفحه کلید",
  icon: KeyboardIcon,
};

const modeOptions: { value: Mode; label: string; icon: typeof SunIcon }[] = [
  { value: "light", label: "روشن", icon: SunIcon },
  { value: "dark", label: "تاریک", icon: MoonIcon },
  { value: "system", label: "سیستم", icon: MonitorIcon },
];

const startPageOptions = [
  { value: "dashboard" as StartPage, label: "داشبورد" },
  { value: "last-visit" as StartPage, label: "آخرین بازدید" },
  { value: "ai" as StartPage, label: "هوش مصنوعی" },
  { value: "projects" as StartPage, label: "پروژه ها" },
  { value: "my-canvases" as StartPage, label: "بوم های من" },
];

const timezoneOptions = [
  { value: "Asia/Tehran", label: "تهران (UTC+3:30)" },
  { value: "Europe/London", label: "لندن (UTC+0)" },
  { value: "America/New_York", label: "نیویورک (UTC-5)" },
  { value: "Asia/Dubai", label: "دبی (UTC+4)" },
];

const startPageToApi: Record<StartPage, UserSettings["startPage"]> = {
  dashboard: "DASHBOARD",
  "last-visit": "LAST_VISITED",
  ai: "AI",
  projects: "PROJECT",
  "my-canvases": "ALL_BOOM",
};

const startPageFromApi: Record<UserSettings["startPage"], StartPage> = {
  DASHBOARD: "dashboard",
  LAST_VISITED: "last-visit",
  AI: "ai",
  PROJECT: "projects",
  ALL_BOOM: "my-canvases",
};

const notificationRows: {
  field: keyof UpdateNotificationSettingsInput;
  label: string;
  hint: string;
}[] = [
  { field: "desktopEnabled", label: "اعلان دسکتاپ", hint: "نمایش اعلان روی دستگاه تو" },
  { field: "inAppEnabled", label: "اعلان داخل برنامه", hint: "اعلان‌ها در خود بوم" },
  { field: "emailEnabled", label: "اعلان ایمیلی", hint: "خلاصه‌ی فعالیت‌ها با ایمیل" },
  { field: "soundEnabled", label: "صدای اعلان", hint: "پخش صدا هنگام رسیدن اعلان" },
  { field: "mentionEnabled", label: "اعلان منشن‌ها", hint: "وقتی کسی تو را منشن کند" },
  { field: "commentEnabled", label: "اعلان کامنت‌ها", hint: "وقتی روی کارهایت کامنت بگذارند" },
];

const devices = [
  {
    name: "MacBook Pro",
    type: "لپ‌تاپ",
    location: "تهران",
    lastActive: "الان",
    current: true,
    icon: MonitorSmartphoneIcon,
  },
  {
    name: "iPhone 15",
    type: "موبایل",
    location: "اصفهان",
    lastActive: "۲ ساعت پیش",
    current: false,
    icon: SmartphoneIcon,
  },
  {
    name: "Windows PC",
    type: "کامپیوتر",
    location: "مشهد",
    lastActive: "دیروز",
    current: false,
    icon: MonitorSmartphoneIcon,
  },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors",
        checked ? "justify-end bg-brand" : "justify-start bg-muted",
      )}
    >
      <span className="size-4 rounded-full bg-card shadow-sm transition-all" />
    </button>
  );
}

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = React.useState<Tab>("account-info");
  const [mode, setMode] = React.useState<Mode>("system");
  const [language, setLanguage] = React.useState<Language>("fa");
  const [startPage, setStartPage] = React.useState<StartPage>("dashboard");
  const [timezone, setTimezone] = React.useState("Asia/Tehran");
  const [autoTimezone, setAutoTimezone] = React.useState(true);
  const [collapsedSidebar, setCollapsedSidebar] = React.useState(false);
  const [titleMode, setTitleMode] = React.useState<TitleMode>("untitled");

  // Each tab only asks for the data it actually shows, when it is opened.
  const { data: me } = useMe(open && tab === "account-info");
  const { data: settings } = useUserSettings(
    open && tab === "personal-settings",
  );
  const { data: notifSettings } = useNotificationSettings(
    open && tab === "notifications",
  );

  const saveSettings = useUpdateUserSettings();
  const saveNotificationSettings = useUpdateNotificationSettings();

  // Hydrate the form once the real settings arrive.
  React.useEffect(() => {
    if (!settings) return;
    setLanguage(settings.language === "en" ? "en" : "fa");
    setStartPage(startPageFromApi[settings.startPage] ?? "dashboard");
    setTimezone(settings.timezone);
    setAutoTimezone(settings.autoDetectTimezone);
    setCollapsedSidebar(settings.sidebarCollapsed);
    setTitleMode(settings.newPageTitleMode === "DATE" ? "date" : "untitled");
  }, [settings]);

  const updateSettingsField = (
    data: Parameters<typeof saveSettings.mutate>[0],
  ) => saveSettings.mutate(data);

  const toggleNotification = (
    field: keyof UpdateNotificationSettingsInput,
    value: boolean,
  ) => saveNotificationSettings.mutate({ [field]: value });

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/30 p-3 backdrop-blur-[3px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="تنظیمات"
        className="relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10"
      >
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute end-3 top-3 z-10"
          aria-label="بستن تنظیمات"
          onClick={() => onOpenChange(false)}
        >
          <XIcon />
        </Button>

        {(saveSettings.isPending || saveNotificationSettings.isPending) && (
          <span className="absolute end-12 top-4.5 text-[10px] text-muted-foreground">
            در حال ذخیره…
          </span>
        )}

        <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
          <nav className="thin-scrollbar flex gap-1 overflow-x-auto border-b border-border/70 p-3 sm:w-60 sm:shrink-0 sm:flex-col sm:border-b-0 sm:border-e sm:overflow-y-auto">
            {sections.map((section, index) => (
              <div key={section.title} className={index > 0 ? "mt-4" : ""}>
                <div className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTab(item.id)}
                      data-active={tab === item.id}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground"
                    >
                      <item.icon className="size-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-4 border-t border-border/60 pt-3">
              <button
                type="button"
                onClick={() => setTab(standaloneTab.id)}
                data-active={tab === standaloneTab.id}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground"
              >
                <standaloneTab.icon className="size-3.5 shrink-0" />
                <span className="truncate">{standaloneTab.label}</span>
              </button>
            </div>
          </nav>

          <div className="thin-scrollbar min-h-0 flex-1 overflow-y-auto p-5 sm:p-8">
            {tab === "account-info" && (
              <div className="mx-auto max-w-2xl space-y-10">
                <div className="flex items-center gap-5">
                  <Avatar size="lg" className="size-20">
                    <AvatarFallback className="bg-muted text-xl font-medium">
                      {me
                        ? me.name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("‌")
                        : "…"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold">
                      {me?.name ?? ""}
                    </div>
                    <div className="mt-0.5 text-sm text-muted-foreground">
                      تصویر پروفایل
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="mb-1.5 text-[12.5px] font-medium text-muted-foreground">
                      نام
                    </div>
                    <div className="rounded-xl border border-border/70 bg-background px-4 py-3 text-[14px]">
                      {me?.name ?? ""}
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 text-[12.5px] font-medium text-muted-foreground">
                      ایمیل
                    </div>
                    <div className="rounded-xl border border-border/70 bg-background px-4 py-3 text-[14px]">
                      {me?.email ?? ""}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border/70 bg-background p-5">
                  <div className="text-[14px] font-medium">
                    فراموشی رمز عبور
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-5 text-muted-foreground">
                    اگر رمز عبور خود را فراموش کرده‌اید، می‌توانید از طریق ایمیل
                    لینک بازیابی دریافت کنید.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 h-9 px-4">
                    ارسال لینک بازیابی
                  </Button>
                </div>

                <div>
                  <div className="mb-4 text-[15px] font-medium">دستگاه‌ها</div>
                  <div className="space-y-3">
                    {devices.map((device) => (
                      <div
                        key={device.name}
                        className="flex items-center gap-4 rounded-xl border border-border/70 bg-background px-4 py-3.5"
                      >
                        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted">
                          <device.icon className="size-4.5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[13.5px] font-medium">
                              {device.name}
                            </span>
                            {device.current && (
                              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">
                                این دستگاه
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-[12px] text-muted-foreground">
                            {device.type} · {device.location} ·{" "}
                            {device.lastActive}
                          </div>
                        </div>
                        {!device.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[12px]"
                          >
                            خروج
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
                  <div className="text-[14px] font-medium text-destructive">
                    خروج از حساب کاربری
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-5 text-muted-foreground">
                    با خروج از حساب، از این دستگاه خارج می‌شوید. برای ورود مجدد
                    نیاز به رمز عبور دارید.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 h-9 gap-1.5 border-destructive/40 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      clearToken();
                      window.location.href = "/signin";
                    }}
                  >
                    <LogOutIcon className="size-3.5" />
                    خروج از حساب
                  </Button>
                </div>
              </div>
            )}

            {tab === "personal-settings" && (
              <div className="mx-auto max-w-2xl space-y-8">
                {/* تم */}
                <div>
                  <div className="mb-1.5 text-[12.5px] font-medium text-muted-foreground">
                    تم
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {modeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setMode(option.value)}
                        data-active={mode === option.value}
                        className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-3.5 text-[12px] transition-colors hover:bg-muted data-[active=true]:border-brand/60 data-[active=true]:bg-brand/5 data-[active=true]:text-foreground"
                      >
                        <option.icon className="size-4" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* زبان */}
                <div>
                  <div className="mb-1.5 flex items-center gap-2 text-[12.5px] font-medium text-muted-foreground">
                    <GlobeIcon className="size-3.5" />
                    زبان
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("fa");
                        updateSettingsField({ language: "fa" });
                      }}
                      data-active={language === "fa"}
                      className="rounded-xl border border-border bg-background px-4 py-3 text-[13px] transition-colors hover:bg-muted data-[active=true]:border-brand/60 data-[active=true]:bg-brand/5 data-[active=true]:font-medium"
                    >
                      فارسی
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage("en");
                        updateSettingsField({ language: "en" });
                      }}
                      data-active={language === "en"}
                      className="rounded-xl border border-border bg-background px-4 py-3 text-[13px] transition-colors hover:bg-muted data-[active=true]:border-brand/60 data-[active=true]:bg-brand/5 data-[active=true]:font-medium"
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* شروع صفحه */}
                <div>
                  <div className="mb-1.5 text-[12.5px] font-medium text-muted-foreground">
                    شروع صفحه
                  </div>
                  <select
                    value={startPage}
                    onChange={(e) => {
                      const next = e.target.value as StartPage;
                      setStartPage(next);
                      updateSettingsField({ startPage: startPageToApi[next] });
                    }}
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-[13px] outline-none focus:border-brand/60"
                  >
                    {startPageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* منطقه زمانی */}
                <div>
                  <div className="mb-1.5 text-[12.5px] font-medium text-muted-foreground">
                    منطقه زمانی
                  </div>
                  <select
                    value={timezone}
                    onChange={(e) => {
                      const next = e.target.value;
                      setTimezone(next);
                      updateSettingsField({ timezone: next });
                    }}
                    disabled={autoTimezone}
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-[13px] outline-none focus:border-brand/60 disabled:opacity-50"
                  >
                    {timezoneOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* تشخیص خودکار منطقه زمانی */}
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-4 py-3.5">
                  <div>
                    <div className="text-[13px] font-medium">
                      تشخیص خودکار منطقه زمانی
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                      بر اساس موقعیت دستگاه تنظیم شود
                    </div>
                  </div>
                  <Toggle
                    label="تشخیص خودکار منطقه زمانی"
                    checked={autoTimezone}
                    onChange={(value) => {
                      setAutoTimezone(value);
                      updateSettingsField({ autoDetectTimezone: value });
                    }}
                  />
                </div>

                {/* نوار کناری جمع‌شده */}
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-4 py-3.5">
                  <div>
                    <div className="text-[13px] font-medium">
                      نوار کناری جمع‌شده
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                      نوار کناری به‌صورت پیش‌فرض جمع باشد
                    </div>
                  </div>
                  <Toggle
                    label="نوار کناری جمع‌شده"
                    checked={collapsedSidebar}
                    onChange={(value) => {
                      setCollapsedSidebar(value);
                      updateSettingsField({ sidebarCollapsed: value });
                    }}
                  />
                </div>

                {/* حالت عنوان صفحه جدید */}
                <div>
                  <div className="mb-1.5 text-[12.5px] font-medium text-muted-foreground">
                    حالت عنوان صفحه جدید
                  </div>
                  <select
                    value={titleMode}
                    onChange={(e) => {
                      const next = e.target.value as TitleMode;
                      setTitleMode(next);
                      updateSettingsField({
                        newPageTitleMode: next === "date" ? "DATE" : "UNTITLED",
                      });
                    }}
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-[13px] outline-none focus:border-brand/60"
                  >
                    <option value="untitled">بدون عنوان</option>
                    <option value="date">تاریخ</option>
                  </select>
                </div>
              </div>
            )}

            {tab === "notifications" && (
              <div className="mx-auto max-w-2xl space-y-3">
                <p className="text-[12px] leading-5 text-muted-foreground">
                  انتخاب کن کجاها خبرت کنیم؛ هر تغییری همین‌جا ذخیره می‌شود.
                </p>
                {notificationRows.map((row) => (
                  <div
                    key={row.field}
                    className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-4 py-3.5"
                  >
                    <div>
                      <div className="text-[13px] font-medium">{row.label}</div>
                      <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                        {row.hint}
                      </div>
                    </div>
                    <Toggle
                      label={row.label}
                      checked={Boolean(notifSettings?.[row.field])}
                      onChange={(value) => toggleNotification(row.field, value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
