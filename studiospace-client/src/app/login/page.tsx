"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Aperture,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/apple-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      toast.error("Missing Fields", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (res?.error) {
        const errorText =
          res.error.message ||
          "Invalid email or password. Please check your credentials.";
        setErrorMessage(errorText);
        toast.error("Login Failed", errorText);
      } else {
        toast.success(
          "Welcome Back!",
          "You have logged in successfully to StudioSpace."
        );
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during login.";
      setErrorMessage(msg);
      toast.error("Authentication Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading(true);
    setErrorMessage("");
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });

      if (res?.error) {
        const msg =
          res.error.message ||
          "Could not authenticate with Google. Ensure Google OAuth credentials are set in environment.";
        setErrorMessage(msg);
        toast.error("Google Sign-In Notice", msg);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Google sign-in could not be completed. Check OAuth configuration.";
      setErrorMessage(msg);
      toast.error("Google Sign-In Error", msg);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Brand Icon & Heading */}
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c9a87c] via-[#b87333] to-[#8c501e] shadow-xl shadow-[#b87333]/25 ring-1 ring-white/20">
          <Aperture className="h-6 w-6 text-black" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Sign in to manage your workspaces, bookings, and creator portfolio
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-8 backdrop-blur-2xl shadow-2xl">
        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <div className="flex-1 leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Social Login: Google Only */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={socialLoading || loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-xs font-medium text-white transition-all hover:bg-white/[0.07] hover:border-white/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {socialLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#c9a87c]" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-full border-t border-white/[0.08]" />
          <span className="absolute bg-[#0a0a0a] px-3 text-[11px] font-medium tracking-wider text-white/30 uppercase">
            Or continue with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@studiospace.io"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-2.5 pr-4 pl-10 text-sm text-white placeholder:text-white/25 focus:border-[#c9a87c] focus:outline-none focus:ring-1 focus:ring-[#c9a87c] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-white/70">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-[#c9a87c] hover:text-[#b87333] transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.02] py-2.5 pr-10 pl-10 text-sm text-white placeholder:text-white/25 focus:border-[#c9a87c] focus:outline-none focus:ring-1 focus:ring-[#c9a87c] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading || socialLoading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#c9a87c] to-[#b87333] py-3 text-sm font-semibold text-black shadow-lg shadow-[#b87333]/20 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Footer Switcher */}
      <div className="mt-8 text-center text-xs text-white/50">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-[#c9a87c] hover:text-[#b87333] transition-colors underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a87c]/15 text-[#c9a87c]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Password Reset Notice
            </h3>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              In accordance with the project specification, self-service password
              reset is currently disabled. If you need account recovery, please
              contact the StudioSpace support team or create a new account.
            </p>
            <div className="mt-5">
              <Button
                onClick={() => setShowForgotModal(false)}
                className="w-full rounded-xl bg-white/10 text-xs font-medium text-white hover:bg-white/15"
              >
                Close Notice
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-white/40">
            <Loader2 className="h-6 w-6 animate-spin text-[#c9a87c] mr-2" />
            <span>Loading...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
