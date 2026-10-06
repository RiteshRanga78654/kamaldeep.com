"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  X,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/queries", label: "Queries", icon: MessageSquare },
];

function NavList({ collapsed, onNavigate }) {
  const pathname = usePathname();

  return (
    <nav className="a-scroll flex-1 overflow-y-auto px-3 py-5" aria-label="Admin sections">
      <ul className="space-y-1.5" role="list">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                className={`a-nav a-focus ${active ? "a-nav-on" : ""}`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      key="l"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.16 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SidebarInner({ collapsed, onNavigate }) {
  const router = useRouter();

  async function signOut() {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* brand */}
      <div
        className={`flex h-16 shrink-0 items-center border-b border-[var(--a-line)] ${
          collapsed ? "justify-center px-3" : "gap-2.5 px-5"
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-olive text-[12.5px] font-semibold text-cream">
          KP
        </span>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="b"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.16 }}
              className="min-w-0"
            >
              <span className="a-display block truncate text-[16px] leading-tight text-ink">
                Admin
              </span>
              <span className="block text-[9px] font-semibold tracking-[0.16em] text-muted uppercase">
                Console
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <NavList collapsed={collapsed} onNavigate={onNavigate} />

      {/* account */}
      <div className="shrink-0 border-t border-[var(--a-line)] p-3">
        <div
          className={`mb-1 flex items-center rounded-xl ${
            collapsed ? "justify-center bg-sand/40 p-2" : "gap-2.5 bg-sand/35 p-2.5"
          }`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-olive/12 text-[12px] font-semibold text-olive-dark">
            A
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-ink">Admin</span>
              <span className="block truncate text-[11px] text-muted">Full access</span>
            </span>
          )}
        </div>

        <button type="button" onClick={signOut} title={collapsed ? "Sign out" : undefined} className="a-nav a-focus w-full">
          <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {!collapsed && <span className="truncate">Sign out</span>}
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({ collapsed, mobileOpen, onToggle, onCloseMobile }) {
  return (
    <>
      {/* desktop */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.45, "cubic-bezier": [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 left-0 z-50 hidden bg-cream/85 backdrop-blur-xl lg:flex lg:flex-col"
        style={{
          width: collapsed ? 80 : 256,
          borderRight: "1px solid var(--a-line)",
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <SidebarInner collapsed={collapsed} />

        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="a-focus absolute -right-3 top-[84px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-cream text-muted"
          style={{ border: "1px solid var(--a-line)", transition: "color .2s, transform .2s" }}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </motion.aside>

      {/* mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-[60] bg-[rgba(42,42,38,0.4)] backdrop-blur-[2px] lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, "cubic-bezier": [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-[65] flex w-[262px] flex-col bg-cream lg:hidden"
              style={{ borderRight: "1px solid var(--a-line)", boxShadow: "var(--a-shadow-md)" }}
              aria-label="Admin sections"
            >
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close navigation"
                className="a-focus absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-sand"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <SidebarInner collapsed={false} onNavigate={onCloseMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
