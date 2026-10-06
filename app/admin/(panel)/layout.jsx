import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { ToastHost } from "@/components/admin/ui";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/middleware/auth";

export default async function AdminPanelLayout({ children }) {
  // proxy.js runs on the Edge and only checks that the cookie is present.
  // The signature is verified here, in Node, before anything is rendered.
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!verifySessionToken(token)) redirect("/admin/login");

  return (
    <ToastHost>
      <AdminShell>{children}</AdminShell>
    </ToastHost>
  );
}