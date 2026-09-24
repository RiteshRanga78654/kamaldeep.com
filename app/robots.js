import { profile } from "@/lib/data/profile";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.metadataBase}/sitemap.xml`,
  };
}
