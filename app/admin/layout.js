import "./admin.css";
import { ToastProvider } from "@/components/Admin/ui";
import { AdminShell } from "@/components/Admin/AdminShell";

export const metadata = {
  title: "Admin — Kamaldeep.com",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <ToastProvider>
      <AdminShell>{children}</AdminShell>
    </ToastProvider>
  );
}