import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get or create Stripe customer
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id, plan")
    .eq("user_id", user.id)
    .single();

  if (sub?.plan === "pro") {
    return NextResponse.json(
      { error: "Already subscribed to Pro." },
      { status: 400 }
    );
  }

  let customerId = sub?.stripe_customer_id as string | undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    // Persist customer ID immediately
    await supabase.from("subscriptions").upsert(
      { user_id: user.id, stripe_customer_id: customerId, plan: "free" },
      { onConflict: "user_id" }
    );
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: user.id,
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product: process.env.STRIPE_PRO_PRODUCT_ID!, // existing QuoteFlow Pro product
          unit_amount: 1900, // $19.00
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/dashboard/new-proposal?upgraded=true`,
    cancel_url: `${origin}/dashboard/upgrade`,
  });

  return NextResponse.json({ url: session.url });
}
