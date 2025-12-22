import {Schema, model, models} from 'mongoose';

export interface CompanyDocument {
  companyName: string;
  ownerClerkId: string;
  slug: string;
  stripeCustomerId?: string;
  plan: 'FREE' | 'STARTER' | 'BUSINESS' | 'PRO';
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<CompanyDocument>(
  {
    companyName: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    ownerClerkId: {type: String, required: true},
    stripeCustomerId: {type: String},
    plan: {
      type: String,
      enum: ['FREE', 'STARTER', 'BUSINESS', 'PRO'],
      default: 'FREE',
    },
  },
  {timestamps: true}
);

export const Company = models.Company || model<CompanyDocument>('Company', CompanySchema);
