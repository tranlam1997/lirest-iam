import { Resource } from './interfaces/resources.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  action: [String],
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
