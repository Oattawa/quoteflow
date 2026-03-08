"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FileText, LogOut, LayoutList, PlusCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { LanguageToggle } from "@/app/_components/LanguageToggle";
import { useLanguage } from "@/lib/language-context";

export default function DashboardNav({ email }: { email: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard/new-proposal" className="flex items-center gap-2">
          <div className="bg-violet-600 rounded-lg p-1.5">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold text-gray-900">QuoteFlow</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/dashboard/proposals"
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              pathname?.startsWith("/dashboard/proposals")
                ? "text-violet-700 bg-violet-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <LayoutList className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.myProposals}</span>
          </Link>
          <Link
            href="/dashboard/new-proposal"
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
              pathname === "/dashboard/new-proposal"
                ? "text-violet-700 bg-violet-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.new}</span>
          </Link>
          <LanguageToggle />
          <span className="text-sm text-gray-400 hidden md:block truncate max-w-[160px] px-2">
            {email}
          </span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.signOut}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
