"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Check if we are in a browser environment before initializing
if (typeof window !== "undefined") {
  Sentry.init({
    // IMPORTANT: Replace this with your actual DSN from Sentry.
    // You should probably use an environment variable for this.
    dsn: "https://YOUR_DSN@sentry.io/123456", 
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // You can also add more configuration options here
    // environment: process.env.NODE_ENV,
  });
}

function SentryErrorFallback() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            backgroundColor: '#121212',
            color: 'white',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>एक अप्रत्याशित त्रुटि हुई</h1>
            <p style={{ marginTop: '1rem', color: '#a0a0a0' }}>हमारी टीम को सूचित कर दिया गया है। कृपया पृष्ठ को रीफ़्रेश करने का प्रयास करें या बाद में वापस आएं।</p>
            <button
                onClick={() => window.location.reload()}
                style={{
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    backgroundColor: '#1a73e8',
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                पृष्ठ रीफ़्रेश करें
            </button>
        </div>
    );
}

export default function SentryProvider({ children }: { children: React.ReactNode }) {
  // This component will wrap your app and provide the Sentry Error Boundary
  return (
    <Sentry.ErrorBoundary fallback={<SentryErrorFallback />}>
      {children}
    </Sentry.ErrorBoundary>
  );
}
