import { Resource } from './interfaces/resources.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ActionType } from '../actions/constants/actions.constant';

export const ResourceSchema = new mongoose.Schema<Resource>({
  resourceId: {
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
  type: {
    type: String,
    required: true,
  },
  actions: {
    type: [String],
    enum: Object.values(ActionType),
    required: true,

  },
  owner: String,
  accessCount: Number,
  accessControlList: [{
    subjectId: String,
    permissionId: [String],
  }],
  deprecated: Boolean,
}, {
  timestamps: true,
});

ResourceSchema.plugin(mongoosePaginate);

export default mongoose.models.Resources || mongoose.model("Resources", ResourceSchema);
