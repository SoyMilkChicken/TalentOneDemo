"use client";

import { useEffect } from "react";

// Prevents the browser from restoring scroll position to a hash anchor on
// page refresh. Without this, clicking a nav link (e.g. #latent-space) sets
// the URL hash and the browser scrolls to that element on every subsequent
// refresh.
export default function ScrollReset() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
  return null;
}
