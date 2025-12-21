import {Schema, model, models, Types} from 'mongoose';

export interface EmployeeDocument {
  companyId: Types.ObjectId;
  firstName: string;
  lastName: string;
  position?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema = new Schema<EmployeeDocument>(
  {
    companyId: {type: Schema.Types.ObjectId, ref: 'Company', required: true},

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    position: {type: String},

    isActive: {type: Boolean, default: true},
  },
  {timestamps: true}
);

export const Employee = models.Employee || model<EmployeeDocument>('Employee', EmployeeSchema);
