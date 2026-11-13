"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  SearchIcon,
  SettingsIcon,
  PanelRightClose,
} from "lucide-react";
import { Logo } from "@/components/brand";
import { SearchDialog } from "@/components/search-dialog";
import { AssistantFab } from "@/components/assistant-fab";
import { SettingsDialog } from "@/components/settings-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { navGroups } from "@/lib/nav";
import { recentCanvases } from "@/lib/mock-data";
import {
  useInbox,
  useMe,
  useReadAllInbox,
  useWorkspaces,
} from "@/lib/apis";
import { initialsOf, timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { tintStyle } from "@/lib/accents";

const workspaceAccent = tintStyle("clay");

function Sidebar({
  open,
  onClose,
  onSearch,
  onOpenSettings,
  onOpenNotifications,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
}) {
  const pathname = usePathname();
  const { data: me } = useMe();
  const { data: memberships } = useWorkspaces();
  const { data: notifications } = useInbox();
  const [workspaceId, setWorkspaceId] = React.useState<string | null>(null);

  const unreadCount = (notifications ?? []).filter((n) => !n.isRead).length;
  const activeMembership =
    memberships?.find((m) => m.workspace.id === workspaceId) ??
    memberships?.[0];
  const activeWorkspace = activeMembership?.workspace;

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        data-open={open}
        className="app-drawer fixed inset-y-0 right-0 z-50 flex w-[278px] flex-col border-s border-sidebar-border bg-sidebar transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-svh lg:shrink-0"
      >
        <div className="flex h-14 items-center justify-between gap-2 px-3">
          <Logo />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onOpenNotifications}
              aria-label="اعلان‌ها"
              className="relative"
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span className="absolute end-1 top-1 grid min-w-3.5 place-items-center rounded-full bg-brand px-1 text-[8px] font-medium leading-none text-brand-foreground">
                  {unreadCount > 9
                    ? "+۹"
                    : unreadCount.toLocaleString("fa-IR")}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              aria-label="بستن سایدبار"
            >
              <PanelRightClose />
            </Button>
          </div>
        </div>

        <div className="px-2">
          <Select
            value={activeWorkspace?.id ?? ""}
            onValueChange={(value) => setWorkspaceId(value ?? null)}
          >
            <SelectTrigger className="h-auto border-0 bg-transparent px-2 py-1.5 shadow-none hover:bg-sidebar-accent focus:ring-0">
              <div className="flex w-full items-center gap-2.5 text-start">
                <span
                  className="tint-bg-strong tint-text grid size-6 shrink-0 place-items-center rounded-md text-[13px]"
                  style={workspaceAccent}
                >
                  {activeWorkspace?.icon ?? "🎨"}
                </span>
                <SelectValue placeholder="انتخاب فضای کاری" />
              </div>
            </SelectTrigger>
            <SelectContent align="start">
              {(memberships ?? []).map((membership) => (
                <SelectItem
                  key={membership.workspace.id}
                  value={membership.workspace.id}
                >
                  <span className="flex items-center gap-2">
                    <span>{membership.workspace.icon ?? "🎨"}</span>
                    <span>{membership.workspace.name}</span>
                  </span>
                </SelectItem>
              ))}
              {(memberships ?? []).length === 0 && (
                <div className="px-2 py-1.5 text-[11px] text-muted-foreground">
                  هنوز فضای کاری نداری
                </div>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="px-2 pt-2">
          <button
            type="button"
            onClick={onSearch}
            className="flex h-8 w-full items-center gap-2 rounded-lg bg-card/70 px-2 text-[13px] text-muted-foreground ring-1 ring-border transition-colors hover:bg-card"
          >
            <SearchIcon className="size-4" />
            <span>جست‌وجو در بوم…</span>
            <span className="ms-auto rounded border border-border px-1 py-0.5 text-[10px] text-muted-foreground">
              ⌘K
            </span>
          </button>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-2 pb-2 thin-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <div className="px-2 pb-1.5 text-[10.5px] font-medium text-muted-foreground/80">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      data-active={active}
                      className="group/nav relative flex h-8 items-center gap-2.5 rounded-[9px] px-2 text-[12.5px] text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground"
                    >
                      {active && (
                        <span className="absolute inset-y-2 start-0 w-[2px] rounded-full bg-brand" />
                      )}
                      <item.icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/nav:text-foreground group-data-[active=true]/nav:text-brand" />
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className="tint-bg tint-text ms-auto rounded-full px-1.5 py-px text-[9.5px] font-medium"
                          style={tintStyle("clay")}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <div className="flex items-center justify-between px-2 pb-1.5">
              <span className="text-[10.5px] font-medium text-muted-foreground/80">
                آخرین بوم‌ها
              </span>
              <Link
                href="/workspaces"
                className="text-[10.5px] text-muted-foreground transition-colors hover:text-foreground"
              >
                همه
              </Link>
            </div>
            <div className="space-y-0.5">
              {recentCanvases.map((canvas) => (
                <Link
                  key={canvas.title}
                  href="/workspaces"
                  onClick={onClose}
                  className="flex h-8 items-center gap-2.5 rounded-lg px-2 text-[12.5px] text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <span
                    className="tint-dot size-1.5 shrink-0 rounded-full opacity-80"
                    style={tintStyle(canvas.accent)}
                  />
                  <span className="truncate">{canvas.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t border-sidebar-border p-2">
          <div className="flex items-center gap-1 rounded-lg p-0.5 transition-colors hover:bg-sidebar-accent/70">
            <Link
              href="/profile"
              onClick={onClose}
              className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md px-1.5 py-1"
            >
              <Avatar size="sm">
                <AvatarFallback
                  className="tint-bg tint-text text-[10px] font-medium"
                  style={tintStyle("clay")}
                >
                  {me ? initialsOf(me.name) : "…"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-medium">
                  {me?.name ?? ""}
                </div>
                <div className="truncate text-[10.5px] text-muted-foreground">
                  {me?.email ?? ""}
                </div>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="تنظیمات"
              onClick={onOpenSettings}
            >
              <SettingsIcon />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const { data: notifications } = useInbox();
  const readAll = useReadAllInbox();
  const unreadCount = (notifications ?? []).filter((n) => !n.isRead).length;

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-3 z-50 flex max-h-[70svh] w-80 flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10">
        <div className="flex items-center justify-between gap-2 border-b border-border/70 px-3.5 py-2.5">
          <span className="text-[12.5px] font-semibold">اعلان‌ها</span>
          <button
            type="button"
            onClick={() => readAll.mutate()}
            disabled={readAll.isPending || unreadCount === 0}
            className="rounded-full px-2 py-1 text-[10.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {readAll.isPending ? "…" : "همه رو خوندم"}
          </button>
        </div>
        <div className="thin-scrollbar overflow-y-auto p-2">
          {(notifications ?? []).map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-muted/50",
                !notification.isRead && "bg-brand/5",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full",
                  notification.isRead
                    ? "bg-muted text-muted-foreground"
                    : "bg-brand/15 text-brand",
                )}
              >
                <BellIcon className="size-3" />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-[11.5px] leading-5",
                    !notification.isRead && "font-medium",
                  )}
                >
                  {notification.title}
                </p>
                <span className="text-[10px] text-muted-foreground">
                  {timeAgo(notification.createdAt)}
                </span>
              </div>
              {!notification.isRead && (
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
              )}
            </div>
          ))}
          {(notifications ?? []).length === 0 && (
            <p className="px-2.5 py-6 text-center text-[11px] text-muted-foreground">
              اعلانی نداری.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => setSearchOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1">{children}</main>
      </div>
      <AssistantFab />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      {notificationsOpen && (
        <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
      )}
    </div>
  );
}
