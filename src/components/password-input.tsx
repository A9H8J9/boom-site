"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      className={cn(
        "relative rounded-[11px] border border-ink/14 bg-background/60 transition-[border-color,box-shadow] focus-within:border-brand/60 focus-within:ring-3 focus-within:ring-brand/12 dark:bg-input/20",
        className,
      )}
    >
      <Input
        type={visible ? "text" : "password"}
        dir="ltr"
        className="h-11 rounded-[10px] border-0 bg-transparent px-3 pe-11 text-[13px] shadow-none focus-visible:ring-0 dark:bg-transparent"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? "پنهان کردن رمز" : "نمایش رمز"}
        className="absolute start-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {visible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
