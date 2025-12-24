import {Schema, model, Types, Model} from 'mongoose';

export type EmployeeDocument = {
  companyId: Types.ObjectId;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  position: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<EmployeeDocument>(
  {
    companyId: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    position: {type: String, required: true},

    isActive: {type: Boolean, default: true},
  },
  {timestamps: true}
);

export const Employee: Model<EmployeeDocument> = model<EmployeeDocument>('Employee', EmployeeSchema);
