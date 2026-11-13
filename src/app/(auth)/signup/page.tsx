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
import { apiErrorMessage, useRegister } from "@/lib/apis";
import { setToken } from "@/lib/axios";

export default function SignUpPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const register = useRegister();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }
    register.mutate(
      { name, email, password },
      {
        onSuccess: (result) => {
          setToken(result.accessToken);
          queryClient.setQueryData(["me"], result.user);
          router.replace("/dashboard");
        },
        onError: (mutationError) => {
          toast.error(
            apiErrorMessage(mutationError, "ثبت‌نام ناموفق بود؛ دوباره تلاش کن."),
          );
        },
      },
    );
  };

  return (
    <div>
      <AuthCard>
        <AuthTabs active="signup" />

        <div className="mt-5">
          <h1 className="text-[23px] leading-tight font-bold tracking-tight">
            ساخت حساب تازه
          </h1>
          <p className="mt-1.5 text-[12px] leading-6 text-muted-foreground">
            در کمتر از یک دقیقه اولین بومت را شروع کن؛ رایگان و بدون کارت
            بانکی.
          </p>
        </div>

        <div className="mt-4">
          <OAuthButtons />
        </div>

        <OrDivider />

        <form className="space-y-3" onSubmit={onSubmit}>
          <AuthField
            id="name"
            label="نام"
            placeholder="سارا محمدی"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
          />
          <AuthField
            id="email"
            label="ایمیل"
            type="email"
            dir="ltr"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="text-start"
          />

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[11.5px] font-medium"
            >
              رمز عبور
            </label>
            <PasswordInput
              id="password"
              placeholder="حداقل ۸ کاراکتر"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
            />
            <p className="mt-1.5 text-[9.5px] text-muted-foreground">
              حداقل ۸ کاراکتر، شامل یک عدد
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-2 pt-0.5 text-[10.5px] leading-5 text-muted-foreground">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 size-3.5 shrink-0 cursor-pointer accent-[var(--brand)]"
            />
            <span>
              شرایط استفاده و حریم خصوصی بوم را می‌پذیرم و می‌خواهم گاهی خبرهای
              تازه دریافت کنم.
            </span>
          </label>

          <Button
            type="submit"
            className={cartoonSubmit}
            disabled={register.isPending}
          >
            {register.isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowLeftIcon className="size-4" />
            )}
            {register.isPending ? "در حال ساخت حساب…" : "ساخت حساب"}
          </Button>
        </form>
      </AuthCard>

      <p className="mt-5 text-center text-[11.5px] text-muted-foreground">
        حساب داری؟{" "}
        <Link
          href="/signin"
          className="font-medium text-foreground underline decoration-brand/60 decoration-1 underline-offset-4 hover:decoration-brand"
        >
          وارد شو
        </Link>
      </p>
    </div>
  );
}
