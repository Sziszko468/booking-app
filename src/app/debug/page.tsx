"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DebugPage() {
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    setInfo({
      url: window.location.href,
      pathname: window.location.pathname,
      localStorage_token: localStorage.getItem("token"),
      localStorage_keys: Object.keys(localStorage),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>🔍 Debug Info</h1>
      
      <pre style={{ 
        background: "#f5f5f5", 
        padding: "20px", 
        borderRadius: "8px", 
        overflow: "auto",
        fontSize: "12px",
      }}>
        {JSON.stringify(info, null, 2)}
      </pre>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Link href="/login" style={{ padding: "10px 20px", background: "#0070f3", color: "white", borderRadius: "6px", textDecoration: "none" }}>
          Go to Login
        </Link>
        <Link href="/" style={{ padding: "10px 20px", background: "#333", color: "white", borderRadius: "6px", textDecoration: "none" }}>
          Go to Home
        </Link>
        <button 
          onClick={() => {
            localStorage.setItem("token", "fake-jwt-token");
            window.location.href = "/dashboard";
          }}
          style={{ padding: "10px 20px", background: "#22c55e", color: "white", borderRadius: "6px", border: "none", cursor: "pointer" }}
        >
          Force Login & Go to Dashboard
        </button>
      </div>
    </div>
  );
}
