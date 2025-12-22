import {Schema, model, Model, Types} from 'mongoose';

export type UserDocument = {
  clerkUserId: string;
  email: string;
  firstName: string;
  secondName: string;
  role: 'OWNER' | 'ADMIN' | 'MANAGER';
  companyId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    clerkUserId: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    role: {
      type: String,
      enum: ['OWNER', 'ADMIN', 'MANAGER'],
      default: 'MANAGER',
    },

    companyId: {type: Schema.Types.ObjectId, ref: 'Company'},
  },
  {timestamps: true}
);

export const User:Model<UserDocument> = model<UserDocument>('User', UserSchema);
