"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useAdminStore } from "@/stores/useAdminStore";
import { useContent } from "@/components/layout/ContentProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginModal() {
  const { loginOpen, closeLogin, login } = useAdminStore();
  const { content } = useContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginOpen) {
      // Reset form fields each time the login modal opens.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [loginOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLogin();
    };
    if (loginOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loginOpen, closeLogin]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError("Invalid email or password. Please try again.");
  };

  return (
    <AnimatePresence>
      {loginOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            onClick={closeLogin}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-white shadow-2xl"
          >
            {/* accent header */}
            <div className="relative overflow-hidden bg-foreground px-6 py-8 text-background">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange/30 blur-2xl" />
              <button
                type="button"
                onClick={closeLogin}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-lg font-bold tracking-tight">
                    Admin Access
                  </div>
                  <div className="text-xs text-white/70">
                    {content.site.brand} — control panel
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4 p-6">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Email
                </span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="pl-9"
                    autoComplete="email"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Password
                </span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9"
                    autoComplete="current-password"
                  />
                </div>
              </label>

              {error && (
                <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="group h-12 w-full rounded-full bg-foreground text-base font-semibold text-background"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Unlock Admin
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Only authorized access. Changes save automatically.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
