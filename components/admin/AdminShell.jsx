"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = useCallback(() => setCollapsed((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div className="min-h-screen bg-cream">
      {/* soft ambient wash */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="a-drift absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(92,102,71,0.16), transparent 68%)" }}
        />
        <div
          className="a-drift absolute top-1/3 -right-28 h-[380px] w-[380px] rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(198,166,83,0.18), transparent 68%)",
            animationDelay: "-7s",
          }}
        />
      </div>

      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={toggle}
        onCloseMobile={closeMobile}
      />

      <div style={{ "--a-pad": collapsed ? "80px" : "256px" }}>
        <AdminHeader onOpenMobile={() => setMobileOpen(true)} />

        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, "cubic-bezier": [0.22, 1, 0.36, 1] }}
          className="pt-16"
          style={{ marginLeft: "var(--a-pad)", transition: "margin-left 0.3s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <div className="mx-auto w-full max-w-[1360px] px-5 py-7 md:px-8 md:py-9">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
