import {Schema, model, models, Types} from 'mongoose';

export type ShiftDocument = {
  companyId: Types.ObjectId;
  employeeId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  date: Date;
  status: 'PLANNED' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const ShiftSchema = new Schema<ShiftDocument>(
  {
    companyId: {type: Schema.Types.ObjectId, ref: 'Company', required: true},
    employeeId: {type: Schema.Types.ObjectId, ref: 'Employee', required: true},

    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    date: {type: Date, required: true},

    status: {
      type: String,
      enum: ['PLANNED', 'COMPLETED', 'CANCELLED'],
      default: 'PLANNED',
    },
  },
  {timestamps: true}
);

export const Shift = model<ShiftDocument>('Shift', ShiftSchema);
