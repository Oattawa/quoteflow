import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "QuoteFlow — AI Proposal Generator for Freelancers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #3b0764 0%, #6d28d9 55%, #7c3aed 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Subtle background circle */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(167, 139, 250, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(167, 139, 250, 0.1)",
            display: "flex",
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 18,
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* FileText icon */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            QuoteFlow
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: 24,
            maxWidth: 960,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          Write winning proposals in{" "}
          <span style={{ color: "#c4b5fd", marginLeft: 16 }}>60 seconds</span>
        </div>

        {/* Sub-headline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            marginBottom: 52,
            maxWidth: 680,
            display: "flex",
          }}
        >
          AI-powered proposals for freelancers — professional, client-ready, instant.
        </div>

        {/* Feature badges */}
        <div style={{ display: "flex", gap: 14 }}>
          {["Free to start", "No credit card", "Export as PDF"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 50,
                padding: "10px 22px",
                color: "rgba(255,255,255,0.9)",
                fontSize: 20,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
