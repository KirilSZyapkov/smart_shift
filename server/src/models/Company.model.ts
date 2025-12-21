import {Schema, model, models} from 'mongoose';

export interface CompanyDocument {
  name: string;
  slug: string;
  stripeCustomerId?: string;
  plan: 'FREE' | 'STARTER' | 'BUSINESS' | 'PRO';
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<CompanyDocument>(
  {
    name: {type: String, required: true},
    slug: {type: String, required: true, unique: true},

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
