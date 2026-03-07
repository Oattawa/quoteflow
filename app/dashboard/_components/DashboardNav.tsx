"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardNav({ email }: { email: string }) {
  const router = useRouter();

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

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block truncate max-w-[200px]">
            {email}
          </span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
