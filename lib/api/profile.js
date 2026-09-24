import { profile } from "@/lib/data/profile";
import { experience } from "@/lib/data/experience";
import { expertise } from "@/lib/data/expertise";

// Wrapped as async functions so these can later be swapped for real
// fetch() calls to a CMS/API without touching any component code.
export async function getProfile() {
  return profile;
}

export async function getExperience() {
  return experience;
}

export async function getExpertise() {
  return expertise;
}
