import mongoose, { Schema } from 'mongoose';

const CertificationSchema = new Schema({
  name: String,
  issuer: String,
  date: String,
  credentialId: String,
  link: String,
  image: String,
  skills: [String],
  featured: { type: Boolean, default: false },
  showByDefault: { type: Boolean, default: true },
  status: { type: String, default: 'active' },
  isUpcoming: { type: Boolean, default: false },
  order: Number,
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
