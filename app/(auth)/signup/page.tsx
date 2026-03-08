"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LanguageToggle } from "@/app/_components/LanguageToggle";
import { useLanguage } from "@/lib/language-context";

export default function SignupPage() {
  const { t } = useLanguage();
  const s = t.signup;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 8) {
      setError(s.passwordError);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-violet-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{s.successTitle}</h2>
          <p className="text-sm text-gray-500">
            {s.successBody1}{" "}
            <span className="font-medium text-gray-700">{email}</span>.{" "}
            {s.successBody2}
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 text-sm text-violet-600 font-medium hover:underline"
          >
            {s.backToSignIn}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo + toggle */}
      <div className="flex items-center gap-2 justify-center mb-8 relative">
        <div className="bg-violet-600 rounded-lg p-1.5">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">QuoteFlow</span>
        <div className="absolute right-0">
          <LanguageToggle />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{s.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{s.subtitle}</p>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-3 py-2.5 text-sm mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              {s.email}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              {s.password}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={s.passwordPlaceholder}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all hover:-translate-y-0.5 disabled:translate-y-0 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {s.creating}
              </>
            ) : (
              s.create
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 mt-5">
        {s.hasAccount}{" "}
        <Link href="/login" className="text-violet-600 font-medium hover:underline">
          {s.signIn}
        </Link>
      </p>
    </div>
  );
}
