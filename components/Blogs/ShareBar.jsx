"use client";

import { useEffect, useState } from "react";
import { Link2, Check } from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

export function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs tracking-widest2 text-stone-500">SHARE</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-pista-600 hover:text-pista-700"
      >
        <FaLinkedinIn size={15} strokeWidth={1.75} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-pista-600 hover:text-pista-700"
      >
        <FaTwitter size={15} strokeWidth={1.75} />
      </a>
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-pista-600 hover:text-pista-700"
      >
        {copied ? <Check size={15} strokeWidth={1.75} /> : <Link2 size={15} strokeWidth={1.75} />}
      </button>
    </div>
  );
}
