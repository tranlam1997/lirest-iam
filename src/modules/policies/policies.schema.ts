import { Policy, PolicyTarget } from './interfaces/policies.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    required: true,
  },
}, {
  _id: false
});

export const PolicySchema = new mongoose.Schema<Policy>({
  policyId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
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

export default mongoose.models.Actions || mongoose.model("Policies", PolicySchema);

