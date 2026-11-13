import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { TooltipProvider } from "@/components/ui/tooltip";

const vazirmatn = localFont({
  src: [
    {
      path: "../../public/assets/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "بوم — فضای آزاد برای فکر کردن و ساختن",
    template: "%s · بوم",
  },
  description:
    "بوم یک فضای کاری خلاقانه و منعطف است؛ جایی برای ایده‌پردازی، ساختن و سازمان‌دهی هر چیزی که در ذهن داری.",
  applicationName: "بوم",
};

const themeScript = `(function(){try{var t=localStorage.getItem("boom-theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${vazirmatn.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-svh bg-background text-foreground">
        <Providers>
          <TooltipProvider>{children}</TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
