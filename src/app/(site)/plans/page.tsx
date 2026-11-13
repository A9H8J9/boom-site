"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  MinusIcon,
} from "lucide-react";
import { Pricing } from "@/components/pricing";
import { Button } from "@/components/ui/button";
import { usePlans } from "@/lib/apis";

const comparison = [
  { feature: "تعداد بوم", free: "۳", pro: "نامحدود", team: "نامحدود" },
  { feature: "بلوک در هر بوم", free: "۲۰۰", pro: "نامحدود", team: "نامحدود" },
  { feature: "فضای ذخیره‌سازی", free: "۵ مگابایت", pro: "۲۰ گیگابایت", team: "۱۰۰ گیگابایت" },
  { feature: "تاریخچهٔ نسخه‌ها", free: false, pro: "۳۰ روز", team: "نامحدود" },
  { feature: "دستیار هوش مصنوعی", free: "۲۰ پیام", pro: "نامحدود", team: "نامحدود" },
  { feature: "مجوزهای پیشرفته", free: false, pro: false, team: true },
  { feature: "پشتیبانی اولویت‌دار", free: false, pro: false, team: true },
];

const faqs = [
  {
    q: "می‌توانم هر زمان طرح را عوض کنم؟",
    a: "بله. ارتقا یا تنزل طرح بلافاصله اعمال می‌شود و مبلغ باقی‌مانده به‌صورت اعتبار محاسبه می‌شود. هیچ قرارداد بلندمدتی وجود ندارد.",
  },
  {
    q: "بوم رایگان چه محدودیتی دارد؟",
    a: "سه بوم، دویست بلوک و بیست پیام دستیار. برای شروع و آزمون‌وخطا کافی است؛ وقتی به فضای بیشتری نیاز داشتی ارتقا بده.",
  },
  {
    q: "دانشجویی یا تخفیف تیمی دارید؟",
    a: "برای دانشجوها و سازمان‌های مردم‌نهاد ۵۰٪ تخفیف در نظر گرفته‌ایم. کافی است با ایمیل دانشگاهی ثبت‌نام کنی.",
  },
  {
    q: "اطلاعات من کجا ذخیره می‌شود؟",
    a: "داده‌ها روی سرورهای اروپایی و با رمزنگاری ذخیره می‌شوند. هر زمان بخواهی می‌توانی همهٔ داده‌هایت را خروجی بگیری و پاک کنی.",
  },
];

export default function PlansPage() {
  const { data: plans, isLoading } = usePlans();

  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10.5px] text-muted-foreground">
          قیمت‌گذاری شفاف
        </span>
        <h1 className="mt-4 text-[30px] font-bold leading-[1.35] tracking-tight sm:text-[38px]">
          برای هر مرحله از ساختن،
          <br className="hidden sm:block" /> یک طرح ساده.
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[12.5px] leading-6 text-muted-foreground">
          از یک صفحهٔ خالی تا فضای کاری کامل تیم. هر طرح شامل بوم آزاد، قالب‌ها و
          جست‌وجوی سریع است. هر وقت خواستی تغییرش بده.
        </p>
      </div>

      <div className="mt-9">
        <Pricing plans={plans ?? []} loading={isLoading} />
      </div>

      <section className="mt-14">
        <h2 className="text-[16px] font-semibold tracking-tight">
          مقایسهٔ جزئیات
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl bg-card ring-1 ring-foreground/8 thin-scrollbar">
          <table className="w-full min-w-[560px] text-start">
            <thead>
              <tr className="border-b border-border/70 text-[10px] text-muted-foreground">
                <th className="px-4 py-3 text-start font-normal">امکانات</th>
                <th className="w-28 px-3 py-3 text-center font-normal">رایگان</th>
                <th className="w-28 px-3 py-3 text-center font-medium text-foreground">
                  حرفه‌ای
                </th>
                <th className="w-28 px-3 py-3 text-center font-normal">تیم</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-border/50 text-[11.5px] last:border-0"
                >
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {row.feature}
                  </td>
                  {[row.free, row.pro, row.team].map((value, index) => (
                    <td
                      key={index}
                      className="px-3 py-2.5 text-center text-[10.5px]"
                    >
                      {value === false ? (
                        <MinusIcon className="mx-auto size-3 text-muted-foreground/40" />
                      ) : value === true ? (
                        <CheckIcon className="mx-auto size-3.5 text-brand" />
                      ) : (
                        <span className="text-foreground">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[16px] font-semibold tracking-tight">
          پرسش‌های پرتکرار
        </h2>
        <div className="mt-4 divide-y divide-border/70 rounded-xl bg-card ring-1 ring-foreground/8">
          {faqs.map((faq) => (
            <details key={faq.q} className="group px-4 py-3.5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[12px] font-medium marker:hidden">
                {faq.q}
                <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 max-w-2xl text-[11px] leading-6 text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-l from-brand/[0.09] to-muted/40 px-6 py-9 text-center ring-1 ring-foreground/5">
        <h2 className="text-[20px] font-bold tracking-tight">
          هنوز مطمئن نیستی؟
        </h2>
        <p className="max-w-md text-[12px] leading-6 text-muted-foreground">
          با طرح رایگان شروع کن. بدون کارت بانکی، بدون محدودیت زمانی. هر وقت
          دیدی بوم بخشی از روزت شده، ارتقا بده.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link href="/signup">
            <Button size="lg" className="gap-1.5">
              شروع رایگان
              <ArrowLeftIcon className="size-4" />
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="outline" size="lg">
              حساب دارم
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
