"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
        },
        success: {
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "var(--color-bg)",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "var(--color-bg)",
          },
        },
      }}
    />
  );
}
