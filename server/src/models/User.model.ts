import {Schema, model, models, Types} from 'mongoose';

export interface UserDocument {
  clerkUserId: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'MANAGER';
  companyId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    clerkUserId: {type: String, required: true, unique: true},
    email: {type: String, required: true},

    role: {
      type: String,
      enum: ['OWNER', 'ADMIN', 'MANAGER'],
      default: 'MANAGER',
    },

    companyId: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
  },
  {timestamps: true}
);

export const User = models.User || model<UserDocument>('User', UserSchema);
