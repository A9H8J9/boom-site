"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import {
  AuthCard,
  AuthField,
  AuthTabs,
  OrDivider,
  OAuthButtons,
  cartoonSubmit,
} from "@/components/auth/auth-kit";
import { apiErrorMessage, useLogin } from "@/lib/apis";
import { setToken } from "@/lib/axios";

export default function SignInPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = useLogin();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: (result) => {
          setToken(result.accessToken);
          queryClient.setQueryData(["me"], result.user);
          router.replace("/dashboard");
        },
        onError: (mutationError) => {
          toast.error(
            apiErrorMessage(mutationError, "ورود ناموفق بود؛ دوباره تلاش کن."),
          );
        },
      },
    );
  };

  return (
    <div>
      <AuthCard>
        <AuthTabs active="signin" />

        <div className="mt-5">
          <h1 className="text-[23px] leading-tight font-bold tracking-tight">
            خوش برگشتی
          </h1>
          <p className="mt-1.5 text-[12px] leading-6 text-muted-foreground">
            وارد شو تا بوم‌ها و ایده‌های نیمه‌تمامت همان‌جا باشند که رها کردی.
          </p>
        </div>

        <div className="mt-4">
          <OAuthButtons />
        </div>

        <OrDivider />

        <form className="space-y-3" onSubmit={onSubmit}>
          <AuthField
            id="email"
            label="ایمیل"
            type="email"
            dir="ltr"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="text-start"
          />

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                htmlFor="password"
                className="text-[11.5px] font-medium"
              >
                رمز عبور
              </label>
              <button
                type="button"
                className="text-[10.5px] text-muted-foreground transition-colors hover:text-foreground"
              >
                فراموشی رمز؟
              </button>
            </div>
            <PasswordInput
              id="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          <label className="flex w-fit cursor-pointer items-center gap-2 text-[11px] text-muted-foreground">
            <input
              type="checkbox"
              defaultChecked
              className="size-3.5 cursor-pointer accent-[var(--brand)]"
            />
            مرا به خاطر بسپار
          </label>

          <Button type="submit" className={cartoonSubmit} disabled={login.isPending}>
            {login.isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowLeftIcon className="size-4" />
            )}
            {login.isPending ? "در حال ورود…" : "ورود به بوم"}
          </Button>
        </form>
      </AuthCard>

      <p className="mt-5 text-center text-[11.5px] text-muted-foreground">
        حساب نداری؟{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground underline decoration-brand/60 decoration-1 underline-offset-4 hover:decoration-brand"
        >
          ساخت حساب تازه
        </Link>
      </p>
    </div>
  );
}
