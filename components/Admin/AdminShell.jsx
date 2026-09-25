"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, FolderOpen, Inbox, ExternalLink, Menu, X, ChevronRight, LogOut } from "lucide-react";

const NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Queries", href: "/admin/queries", icon: Inbox },
  { label: "Gallery", href: "/admin/gallery", icon: FolderOpen },
];

export function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [signingOut, setSigningOut] = useState(false);

  const current = NAV.find((n) => (n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)));
  const title = current ? current.label : "Control Room";

  useEffect(() => {
    fetch("/api/stats", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setUnread(d?.stats?.unreadQueries || 0))
      .catch(() => {});
  }, [pathname]);

  const closeSidebar = () => setOpen(false);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // noop — clear client side anyway
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="adm-body">
      <div className="adm-shell">
        <aside className={`adm-sidebar ${open ? "open" : ""}`}>
          <div className="adm-brand">
            <div className="adm-brand-mark">K</div>
            <div>
              <div className="adm-brand-name">Control Room</div>
              <div className="adm-brand-sub">Kamaldeep.com</div>
            </div>
          </div>

          <nav className="adm-nav">
            <div className="adm-nav-label">Manage</div>
            {NAV.map(({ label, href, icon: Icon }) => {
              const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={active ? "active" : ""} onClick={closeSidebar}>
                  <Icon size={17} />
                  <span>{label}</span>
                  {label === "Queries" && unread > 0 && <span className="adm-nav-badge">{unread}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="adm-nav-footer">
            <Link href="/" target="_blank">
              <ExternalLink size={15} />
              View Live Site
            </Link>
            <Link href="/gallery" target="_blank">
              <ExternalLink size={15} />
              Open Gallery
            </Link>
          </div>
        </aside>

        {open && (
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(16,13,10,0.5)",
              zIndex: 45,
            }}
          />
        )}

        <div className="adm-main">
          <header className="adm-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button className="adm-burger" onClick={() => setOpen((v) => !v)} aria-label="Toggle sidebar">
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
              <h1 className="adm-topbar-title">{title}</h1>
            </div>
            <div className="adm-topbar-right">
              <motion.a
                href="/"
                whileHover={{ y: -2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  color: "#b87042",
                  textDecoration: "none",
                  background: "rgba(184,112,66,0.1)",
                  padding: "8px 14px",
                  borderRadius: "100px",
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#22a06b" }} />
                Live
                <ChevronRight size={13} />
              </motion.a>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={signOut} disabled={signingOut} title="Sign out">
                {signingOut ? <span className="adm-spinner" /> : <LogOut size={14} />}
                <span className="adm-signout-label">Sign out</span>
              </button>
            </div>
          </header>

          <main className="adm-content">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminShell;