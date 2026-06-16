import CertificationsClient from "@/components/CertificationsClient";
import type { Certification } from "@/types/api";
import { connectDB } from "@/lib/mongodb";
import CertificationModel from "@/models/Certification";

export const dynamic = 'force-dynamic';

export default async function CertificationsPage() {
  let certifications: Certification[] = [];

  try {
    await connectDB();
    const data = await CertificationModel.find({ status: 'active' }).sort({ order: 1 }).lean();
    certifications = data.map((item: any) => ({
      _id: item._id.toString(),
      name: item.name || '',
      issuer: item.issuer || '',
      date: item.date || '',
      credentialId: item.credentialId || '',
      link: item.link || '',
      image: item.image || '',
      skills: item.skills || [],
      featured: item.featured || false,
      showByDefault: item.showByDefault ?? true,
      status: item.status || 'active',
      isUpcoming: item.isUpcoming || false,
      order: item.order || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch certifications:', error);
  }

  return <CertificationsClient certifications={certifications} />;
}
