"use client";

import { create } from "zustand";

interface AdminStore {
  /** null = unknown (checking), true/false = authed or not */
  authed: boolean | null;
  /** login modal open */
  loginOpen: boolean;
  /** admin panel open */
  open: boolean;
  checkAuth: () => Promise<void>;
  openLogin: () => void;
  closeLogin: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  openAdmin: () => void;
  closeAdmin: () => void;
  /** Double-click logo: open admin if authed, else open login. */
  trigger: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  authed: null,
  loginOpen: false,
  open: false,

  checkAuth: async () => {
    try {
      const res = await fetch("/api/admin/auth", { cache: "no-store" });
      const json = await res.json();
      set({ authed: Boolean(json.authed) });
    } catch {
      set({ authed: false });
    }
  },

  openLogin: () => set({ loginOpen: true }),
  closeLogin: () => set({ loginOpen: false }),

  login: async (email, password) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      set({ authed: true, loginOpen: false, open: true });
      return true;
    } catch {
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    set({ authed: false, open: false });
  },

  openAdmin: () => set({ open: true }),
  closeAdmin: () => set({ open: false }),

  trigger: async () => {
    const { authed, checkAuth, openAdmin, openLogin } = get();
    let a = authed;
    if (a === null) {
      await checkAuth();
      a = get().authed;
    }
    if (a) openAdmin();
    else openLogin();
  },
}));
