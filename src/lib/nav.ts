import {
  Frame,
  FolderKanban,
  LayoutDashboard,
  LayoutTemplate,
  Sparkles,
  SquareCheck,
  Star,
  Trash2,
  Users,
} from "lucide-react";

export const navGroups = [
  {
    label: "فضای کاری",
    items: [
      { label: "داشبورد", href: "/dashboard", icon: LayoutDashboard },
      { label: "بوم‌های من", href: "/workspaces", icon: Frame },
      { label: "پروژه‌ها", href: "/projects", icon: FolderKanban },
      { label: "وظایف", href: "/tasks", icon: SquareCheck },
      {
        label: "دستیار هوش مصنوعی",
        href: "/ai",
        icon: Sparkles,
        badge: "تازه",
      },
    ],
  },
  {
    label: "کتابخانه",
    items: [
      { label: "قالب‌ها", href: "/templates", icon: LayoutTemplate },
      { label: "نشان‌شده‌ها", href: "/favorites", icon: Star },
      { label: "سطل زباله", href: "/trash", icon: Trash2 },
    ],
  },
];

export const pageTitles: Record<string, string> = {
  "/dashboard": "داشبورد",
  "/workspaces": "بوم‌های من",
  "/projects": "پروژه‌ها",
  "/tasks": "وظایف",
  "/templates": "قالب‌ها",
  "/ai": "دستیار هوش مصنوعی",
  "/favorites": "نشان‌شده‌ها",
  "/trash": "سبد زباله",
  "/team": "تیم",
  "/profile": "پروفایل",
  "/plans": "طرح‌ها و قیمت‌ها",
  "/blog": "وبلاگ",
};
