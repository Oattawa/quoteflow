import { createClient } from "@supabase/supabase-js";

/**
 * Admin client with service role key — bypasses RLS.
 * Only use in server-side code (API routes / webhooks). Never expose to client.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
