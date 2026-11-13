import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Logo } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "محصول", href: "/#product" },
  { label: "قالب‌ها", href: "/templates" },
  { label: "قیمت‌ها", href: "/plans" },
  { label: "وبلاگ", href: "/blog" },
];

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b",
        transparent
          ? "border-transparent bg-background/60 backdrop-blur-md"
          : "border-border/70 bg-background/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1140px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-2.5 py-1.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <ThemeToggle />
          <Link href="/signin" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              ورود
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="gap-1.5">
              شروع رایگان
              <ArrowLeftIcon className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

const footerGroups = [
  {
    title: "محصول",
    links: [
      { label: "بوم آزاد", href: "/#product" },
      { label: "قالب‌ها", href: "/templates" },
      { label: "دستیار هوش مصنوعی", href: "/ai" },
      { label: "قیمت‌ها", href: "/plans" },
    ],
  },
  {
    title: "شرکت",
    links: [
      { label: "دربارهٔ ما", href: "/blog" },
      { label: "وبلاگ", href: "/blog" },
      { label: "فرصت‌های شغلی", href: "/blog" },
      { label: "تماس", href: "/blog" },
    ],
  },
  {
    title: "منابع",
    links: [
      { label: "راهنمای شروع", href: "/templates" },
      { label: "مرکز کمک", href: "/blog" },
      { label: "تغییرات نسخه", href: "/blog" },
      { label: "وضعیت سرویس", href: "/blog" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-muted/30">
      <div className="mx-auto w-full max-w-[1140px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-[11.5px] leading-6 text-muted-foreground">
              بوم یک فضای کاری خلاقانه و منعطف است؛ برای فکر کردن، ایده‌پردازی،
              ساختن و سازمان‌دهی هر چیزی که در ذهن داری.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5 rounded-full bg-card px-2 py-1 ring-1 ring-border">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                همهٔ سرویس‌ها فعال
              </span>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[11.5px] font-medium">{group.title}</div>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-start justify-between gap-2 border-t border-border/70 pt-5 text-[10px] text-muted-foreground sm:flex-row sm:items-center">
          <span>© ۱۴۰۵ بوم. ساخته‌شده برای فکرهای نیمه‌کاره.</span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hover:text-foreground">
              حریم خصوصی
            </Link>
            <Link href="/blog" className="hover:text-foreground">
              شرایط استفاده
            </Link>
            <span>فارسی · RTL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
