import { Policy, PolicyTarget } from './interfaces/policies.interface';
import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ActionType } from '../actions/constants/actions.constant';

export const PolicyTargetSchema = new mongoose.Schema<PolicyTarget>({
  subjectAttributes: Schema.Types.Mixed,
  resourceAttributes: Schema.Types.Mixed,
  actions: {
    type: [String],
    enum: Object.values(ActionType),
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

