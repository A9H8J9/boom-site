import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "@/lib/axios";

// ---------- Types ----------

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResult = {
  accessToken: string;
  expiresIn: number;
  user: User;
};

export type Plan = {
  id: string;
  name: string;
  description: string;
  slug: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  features: string[];
  createdAt: string;
  updatedAt: string;
};

export type BlogAuthor = { id: string; name: string };
export type BlogTag = { id: string; name: string };

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  author: BlogAuthor;
  tags: BlogTag[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type InboxNotification = {
  id: string;
  title: string;
  description: string | null;
  type:
    | "GENERAL"
    | "WORKSPACE"
    | "COMMENT"
    | "MENTION"
    | "INVITATION"
    | "SYSTEM"
    | "BILLING";
  isRead: boolean;
  userId: string;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Workspace = {
  id: string;
  name: string;
  icon: string | null;
  slug: string;
  allowPublicLinks: boolean;
  allowMemberExport: boolean;
  allowMemberInvites: boolean;
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER" | "GUEST";

export type WorkspaceMembership = {
  id: string;
  role: WorkspaceRole;
  workspaceId: string;
  userId: string;
  joinedAt: string;
  updatedAt: string;
  workspace: Workspace;
};

export type UserSettings = {
  id: string;
  language: string;
  startPage: "DASHBOARD" | "LAST_VISITED" | "AI" | "PROJECT" | "ALL_BOOM";
  timezone: string;
  autoDetectTimezone: boolean;
  sidebarCollapsed: boolean;
  newPageTitleMode: "UNTITLED" | "DATE";
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NotificationSettings = {
  id: string;
  desktopEnabled: boolean;
  inAppEnabled: boolean;
  emailEnabled: boolean;
  soundEnabled: boolean;
  mentionEnabled: boolean;
  commentEnabled: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

// ---------- Auth ----------

export const authApi = {
  login: async (data: { email: string; password: string }): Promise<AuthResult> =>
    (await api.post<AuthResult>("/auth/login", data)).data,

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResult> => (await api.post<AuthResult>("/auth/register", data)).data,
};

// ---------- User ----------

export type UpdateUserSettingsInput = {
  language?: string;
  startPage?: UserSettings["startPage"];
  timezone?: string;
  autoDetectTimezone?: boolean;
  sidebarCollapsed?: boolean;
  newPageTitleMode?: UserSettings["newPageTitleMode"];
};

export type UpdateNotificationSettingsInput = {
  desktopEnabled?: boolean;
  inAppEnabled?: boolean;
  emailEnabled?: boolean;
  soundEnabled?: boolean;
  mentionEnabled?: boolean;
  commentEnabled?: boolean;
};

export const userApi = {
  me: async (): Promise<User> => (await api.get<User>("/users/me")).data,

  getSettings: async (): Promise<UserSettings> =>
    (await api.get<UserSettings>("/users/settings")).data,

  updateSettings: async (data: UpdateUserSettingsInput): Promise<UserSettings> =>
    (await api.patch<UserSettings>("/users/settings", data)).data,

  getNotificationSettings: async (): Promise<NotificationSettings> =>
    (await api.get<NotificationSettings>("/users/notification-settings")).data,

  updateNotificationSettings: async (
    data: UpdateNotificationSettingsInput,
  ): Promise<NotificationSettings> =>
    (await api.patch<NotificationSettings>("/users/notification-settings", data)).data,
};

// ---------- Plans ----------

export const plansApi = {
  list: async (): Promise<Plan[]> => (await api.get<Plan[]>("/plans")).data,
};

// ---------- Blog ----------

export const blogApi = {
  list: async (): Promise<BlogPost[]> => (await api.get<BlogPost[]>("/blog")).data,

  getBySlug: async (slug: string): Promise<BlogPost> =>
    (await api.get<BlogPost>(`/blog/${slug}`)).data,
};

// ---------- Inbox (notifications) ----------

export const inboxApi = {
  list: async (): Promise<InboxNotification[]> =>
    (await api.get<InboxNotification[]>("/inbox")).data,

  readAll: async (): Promise<{ count: number }> =>
    (await api.patch<{ count: number }>("/inbox/read-all")).data,
};

// ---------- Workspaces ----------

export const workspacesApi = {
  list: async (): Promise<WorkspaceMembership[]> =>
    (await api.get<WorkspaceMembership[]>("/workspaces")).data,

  create: async (data: { name: string; icon?: string }): Promise<Workspace> =>
    (await api.post<Workspace>("/workspaces", data)).data,
};

// ---------- Error helper ----------

/** Pulls the first human-readable message out of an axios error from the API. */
export function apiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: unknown } } })
      .response;
    const message = response?.data?.message;
    if (typeof message === "string") return message;
    if (Array.isArray(message) && message.length > 0) return message[0];
  }
  return fallback;
}

// ---------- TanStack Query hooks ----------
// Every request the app makes goes through these; components never touch axios.

export function useLogin() {
  return useMutation({ mutationFn: authApi.login });
}

export function useRegister() {
  return useMutation({ mutationFn: authApi.register });
}

export function useMe(enabled = true) {
  return useQuery({ queryKey: ["me"], queryFn: userApi.me, enabled });
}

export function useUserSettings(enabled = true) {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: userApi.getSettings,
    enabled,
  });
}

export function useUpdateUserSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateSettings,
    onSuccess: (data) => queryClient.setQueryData(["user-settings"], data),
  });
}

export function useNotificationSettings(enabled = true) {
  return useQuery({
    queryKey: ["notification-settings"],
    queryFn: userApi.getNotificationSettings,
    enabled,
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateNotificationSettings,
    onSuccess: (data) =>
      queryClient.setQueryData(["notification-settings"], data),
  });
}

export function usePlans() {
  return useQuery({ queryKey: ["plans"], queryFn: plansApi.list });
}

export function useBlog() {
  return useQuery({ queryKey: ["blog"], queryFn: blogApi.list });
}

export function useInbox() {
  return useQuery({ queryKey: ["inbox"], queryFn: inboxApi.list });
}

export function useReadAllInbox() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inboxApi.readAll,
    onSuccess: () => {
      // Mark everything read in the cache right away, then sync with the server.
      const readAt = new Date().toISOString();
      queryClient.setQueryData<InboxNotification[]>(["inbox"], (items) =>
        items?.map((item) =>
          item.isRead ? item : { ...item, isRead: true, readAt },
        ),
      );
      queryClient.invalidateQueries({ queryKey: ["inbox"] });
    },
  });
}

export function useWorkspaces() {
  return useQuery({ queryKey: ["workspaces"], queryFn: workspacesApi.list });
}
