"use client";

import * as React from "react";
import { MonitorIcon, MoonIcon, SunIcon, CheckIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mode = "light" | "dark" | "system";

const options: { value: Mode; label: string; icon: typeof SunIcon }[] = [
  { value: "light", label: "روشن", icon: SunIcon },
  { value: "dark", label: "تاریک", icon: MoonIcon },
  { value: "system", label: "هم‌رنگ سیستم", icon: MonitorIcon },
];

function apply(mode: Mode) {
  const dark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  localStorage.setItem("boom-theme", mode);
}

export function ThemeToggle({
  align = "end",
  variant = "ghost",
  className,
}: {
  align?: "start" | "end" | "center";
  variant?: "ghost" | "outline";
  className?: string;
}) {
  const [mode, setMode] = React.useState<Mode>("system");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("boom-theme") as Mode | null;
    if (stored) setMode(stored);
    else setMode("system");

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((localStorage.getItem("boom-theme") as Mode | null) === "system") {
        apply("system");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const ActiveIcon = mounted
    ? document.documentElement.classList.contains("dark")
      ? MoonIcon
      : SunIcon
    : SunIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={variant}
            size="icon-sm"
            aria-label="تغییر ظاهر"
            className={className}
          />
        }
      >
        <ActiveIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-44">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              setMode(option.value);
              apply(option.value);
            }}
            className="gap-2"
          >
            <option.icon className="size-4 text-muted-foreground" />
            <span>{option.label}</span>
            <CheckIcon
              className={cn(
                "ms-auto size-4",
                mode === option.value ? "opacity-100" : "opacity-0",
              )}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
