import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY || "";
  const isRealKey = apiKey && apiKey !== "re_your_api_key_here";
  
  return NextResponse.json({
    configured: isRealKey,
    testMode: !isRealKey,
    fromEmail: process.env.FROM_EMAIL || "onboarding@resend.dev",
  });
}
