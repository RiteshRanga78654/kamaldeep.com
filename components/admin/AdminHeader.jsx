"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, Search, TrendingUp } from "lucide-react";

export default function AdminHeader({ onOpenMobile }) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 h-16 bg-cream/80 backdrop-blur-xl"
      style={{
        borderBottom: "1px solid var(--a-line)",
        paddingLeft: "var(--a-pad, 0px)",
        transition: "padding-left 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="flex h-full items-center gap-3 px-5 md:px-7">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open navigation"
          className="a-focus flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-muted transition-colors hover:bg-sand hover:text-ink lg:hidden"
        >
          <Menu className="h-4.5 w-4.5" aria-hidden="true" />
        </button>

        <div className="relative hidden max-w-sm flex-1 sm:block">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search articles, gallery, queries…"
            aria-label="Search the admin console"
            className="a-input a-focus !h-10 pl-10"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="a-pill a-pill-olive hidden md:inline-flex">
            <TrendingUp className="h-3 w-3" aria-hidden="true" />
            All systems normal
          </span>

          <button
            type="button"
            aria-label="Notifications, 3 unread"
            className="a-focus relative flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-sand hover:text-ink"
          >
            <Bell className="h-4.5 w-4.5" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose">
              <span className="a-ring absolute inset-0 text-rose" aria-hidden="true" />
            </span>
          </button>

          <div className="flex items-center gap-2.5 rounded-xl bg-sand/40 py-1.5 pr-4 pl-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-olive text-[11px] font-semibold text-cream">
              A
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[12.5px] leading-tight font-medium text-ink">Admin</span>
              <span className="block text-[10.5px] leading-tight text-muted">Administrator</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
