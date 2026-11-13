import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { LogoMark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mascot } from "@/components/auth/auth-kit";

const faces = [
  { initial: "س", bg: "#EBD9C8", fg: "#6d4a33" },
  { initial: "ن", bg: "#D6E4DA", fg: "#3c5b4a" },
  { initial: "ا", bg: "#E2DCEE", fg: "#4e4368" },
];

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-svh bg-[#FCF8F1] text-foreground sm:p-3 dark:bg-[#17140F]">
      <div className="grid min-h-svh sm:min-h-[calc(100svh-1.5rem)] sm:gap-3 lg:grid-cols-[1.03fr_0.97fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden rounded-[26px] border border-ink/8 bg-[#F6ECDA] p-10 lg:flex xl:p-12 dark:bg-[#262019]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -start-24 -top-24 size-72 rounded-full bg-[#E8C87E]/40 blur-3xl dark:bg-[#E8C87E]/10"
          />
          <div className="mx-auto flex w-full max-w-[440px] items-center gap-2.5">
            <LogoMark className="size-9" />
            <span className="flex flex-col leading-none">
              <span className="text-[18px] font-bold">بوم</span>
              <span className="mt-1 text-[9px] tracking-wide text-foreground/45">
                boom studio
              </span>
            </span>
            <span className="ms-auto text-[10px] text-foreground/40">
              نسخهٔ نمایشی
            </span>
          </div>

          <div className="relative mx-auto my-8 w-full max-w-[440px]">
            <p className="text-[10.5px] font-medium tracking-[0.14em] text-foreground/45">
              فضای فکر کردن و ساختن
            </p>
            <h2 className="mt-3 text-[34px] leading-[1.4] font-bold tracking-tight xl:text-[38px]">
              جای فکرهای{" "}
              <span className="relative whitespace-nowrap">
                نیمه‌کاره
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[6px] h-[9px] rounded-full bg-[#F0C96D]/70 dark:bg-[#F0C96D]/25"
                />
              </span>{" "}
              هم اینجاست.
            </h2>
            <p className="mt-3.5 max-w-[36ch] text-[12.5px] leading-6 text-foreground/55">
              یک فضای آرام برای نوشتن، چیدن و ساختن؛ بدون اینکه مجبور باشی از
              قبل بدانی چه می‌خواهی.
            </p>

            <div className="mt-8 flex justify-center">
              <Mascot className="bob w-[178px]" />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[440px] items-center gap-3 border-t border-ink/8 pt-5">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {faces.map((face) => (
                <span
                  key={face.initial}
                  className="grid size-6 place-items-center rounded-full ring-2 ring-[#F6ECDA] text-[9.5px] font-medium dark:ring-[#1E1A14]"
                  style={{ background: face.bg, color: face.fg }}
                >
                  {face.initial}
                </span>
              ))}
            </div>
            <p className="text-[10.5px] text-foreground/50">
              ۲٬۴۰۰ تیم ایرانی همین حالا روی بوم کار می‌کنند
            </p>
            <span className="ms-auto text-[10px] text-foreground/35">
              © ۱۴۰۵ بوم
            </span>
          </div>
        </aside>

        <section className="relative flex min-h-svh flex-col px-4 py-4 sm:min-h-0 sm:px-8 sm:py-6 lg:px-10">
          <header className="mx-auto flex w-full max-w-[420px] items-center justify-between gap-2">
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <LogoMark className="size-8" />
              <span className="text-[16px] font-bold">بوم</span>
            </Link>
            <div className="ms-auto flex items-center gap-1.5 lg:ms-0 lg:w-full lg:justify-end">
              <ThemeToggle />
              <Link
                href="/"
                className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                بازگشت به خانه
                <ArrowRightIcon className="size-3" />
              </Link>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-8">
            {children}
            <p className="mt-4 text-center text-[9.5px] text-muted-foreground">
              با ادامه، شرایط استفاده و حریم خصوصی بوم را می‌پذیری.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
