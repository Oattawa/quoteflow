import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { markProposalViewed } from "@/lib/supabase/proposals";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = createAdminClient();
    await markProposalViewed(admin, params.id);
    return NextResponse.json({ ok: true });
  } catch {
    // Non-critical — silently ignore errors so the share page still works
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
