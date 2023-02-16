import { Policy, PolicyTarget } from './interfaces/policies.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ActionType } from '../actions/constants/actions.constant';

export const PolicyTargetSchema = new mongoose.Schema<PolicyTarget>({
  subjectId: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: Object.values(ActionType),
    required: true,
  },
}, {
  _id: false
});

export const PolicySchema = new mongoose.Schema<Policy>({
  policyId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  effect: {
    type: String,
    required: true,
  },
  target: PolicyTargetSchema,
  rule: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

PolicySchema.plugin(mongoosePaginate);

export default mongoose.models.Policies || mongoose.model("Policies", PolicySchema);

