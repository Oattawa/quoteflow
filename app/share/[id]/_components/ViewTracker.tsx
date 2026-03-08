"use client";

import { useEffect } from "react";

export function ViewTracker({ proposalId }: { proposalId: string }) {
  useEffect(() => {
    // Fire-and-forget: record that the client opened the share link
    fetch(`/api/proposals/${proposalId}/view`, { method: "POST" }).catch(() => {});
  }, [proposalId]);

  return null;
}
