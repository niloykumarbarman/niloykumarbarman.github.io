import CertificationsClient from "@/components/CertificationsClient";
import type { Certification } from "@/types/api";
import { fetchCertifications } from "@/lib/api-client";

export const revalidate = 86400;

export default async function CertificationsPage() {
  let certifications: Certification[] = [];
  try {
    certifications = await fetchCertifications();
  } catch (error) {
    console.error('Failed to fetch certifications:', error);
  }
  return <CertificationsClient certifications={certifications} />;
}
