import Link from "next/link";
import { ArrowLeftIcon, CompassIcon } from "lucide-react";
import { Logo } from "@/components/brand";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="paper relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="relative w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        <div className="relative mx-auto mb-8 h-36 w-52">
          <div className="note-shadow absolute start-2 top-2 w-32 rotate-[-6deg] rounded-lg bg-[#fdf6d8] p-3 text-start">
            <div className="h-1.5 w-2/3 rounded-full bg-[#b59a4a]/60" />
            <div className="mt-2 h-1 w-full rounded-full bg-[#b59a4a]/25" />
            <div className="mt-1.5 h-1 w-4/5 rounded-full bg-[#b59a4a]/25" />
          </div>
          <div className="note-shadow absolute end-0 top-8 w-28 rotate-[5deg] rounded-lg bg-card p-3 text-start ring-1 ring-foreground/10">
            <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
              <CompassIcon className="size-2.5" />
              اینجا خالی است
            </div>
            <div className="mt-2 h-1 w-full rounded-full bg-foreground/10" />
            <div className="mt-1.5 h-1 w-2/3 rounded-full bg-foreground/10" />
          </div>
          <span className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] rounded-md bg-brand px-2 py-1 text-[10px] font-medium text-brand-foreground shadow-lg">
            ۴۰۴
          </span>
        </div>

        <h1 className="text-[24px] font-bold tracking-tight">
          این صفحه روی بوم نیست
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[11.5px] leading-6 text-muted-foreground">
          شاید جابه‌جا شده، حذف شده یا هنوز ساخته نشده. می‌توانی به داشبورد
          برگردی یا از یک صفحهٔ خالی شروع کنی.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link href="/dashboard">
            <Button size="lg" className="gap-1.5">
              بازگشت به داشبورد
              <ArrowLeftIcon className="size-4" />
            </Button>
          </Link>
          <Link href="/workspaces">
            <Button variant="outline" size="lg">
              بوم‌های من
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-[9.5px] text-muted-foreground">
          اگر فکر می‌کنی این یک اشتباه است،{" "}
          <Link href="/blog" className="underline hover:text-foreground">
            به ما بگو
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
