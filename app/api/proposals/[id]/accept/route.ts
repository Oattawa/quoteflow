import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { acceptProposal } from "@/lib/supabase/proposals";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { message = "" } = await req.json();

    if (typeof message !== "string" || message.length > 1000) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    const admin = createAdminClient();
    await acceptProposal(admin, params.id, message.trim());
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to accept proposal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
