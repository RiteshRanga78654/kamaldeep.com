"use client";

import { useEffect } from "react";

const HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;1,500&family=Work+Sans:wght@400;500;600&display=swap";

/**
 * Loads the Cormorant (display) + Work Sans (body) families used by the
 * blogs / projects / about / contact pages. The link id is shared with the
 * other pages that load the same stylesheet, so it is only ever fetched once.
 */
export default function PageFonts() {
  useEffect(() => {
    if (document.getElementById("rk-fonts")) return;
    const link = document.createElement("link");
    link.id = "rk-fonts";
    link.rel = "stylesheet";
    link.href = HREF;
    document.head.appendChild(link);
  }, []);

  return null;
}
