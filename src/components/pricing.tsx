"use client";

import * as React from "react";
import Link from "next/link";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/apis";
import { cn } from "@/lib/utils";

export function Pricing({
  plans,
  loading = false,
}: {
  plans: Plan[];
  loading?: boolean;
}) {
  const [yearly, setYearly] = React.useState(true);

  if (loading) {
    return (
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-[420px] animate-pulse rounded-2xl bg-card ring-1 ring-foreground/8"
          />
        ))}
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <p className="mt-7 rounded-2xl bg-card px-6 py-10 text-center text-[12px] text-muted-foreground ring-1 ring-foreground/8">
        هنوز طرحی تعریف نشده؛ به‌زودی قیمت‌ها اینجا منتشر می‌شوند.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-1 rounded-full bg-muted p-1 text-[11.5px]">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              !yearly
                ? "bg-card font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            ماهانه
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
              yearly
                ? "bg-card font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            سالانه
            <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[9px] text-brand">
              ۲ ماه هدیه
            </span>
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl p-5",
                plan.isPopular
                  ? "bg-card shadow-xl shadow-brand/10 ring-2 ring-brand/60"
                  : "bg-card ring-1 ring-foreground/8",
              )}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 right-5 flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[9.5px] font-medium text-brand-foreground">
                  <SparklesIcon className="size-2.5" />
                  پیشنهاد ما
                </span>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-semibold">{plan.name}</h3>
                <span className="text-[10px] text-muted-foreground">
                  {plan.description}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-[30px] font-bold tracking-tight tabular-nums">
                  {price === 0 ? "۰" : price.toLocaleString("fa-IR")}
                </span>
                <span className="text-[10.5px] text-muted-foreground">
                  هزار تومان / ماه
                </span>
              </div>
              <p className="mt-1 h-4 text-[9.5px] text-muted-foreground">
                {price === 0
                  ? "برای همیشه رایگان"
                  : yearly
                    ? "با پرداخت سالانه · لغو هر زمان"
                    : "بدون تعهد بلندمدت"}
              </p>

              <Link href="/signup" className="mt-4">
                <Button
                  variant={plan.isPopular ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  انتخاب طرح {plan.name}
                </Button>
              </Link>

              <div className="mt-5 space-y-2.5 border-t border-border/60 pt-4">
                {(Array.isArray(plan.features) ? plan.features : []).map(
                  (feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-[11px] leading-5"
                    >
                      <CheckIcon
                        className={cn(
                          "mt-0.5 size-3.5 shrink-0",
                          plan.isPopular
                            ? "text-brand"
                            : "text-muted-foreground",
                        )}
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
