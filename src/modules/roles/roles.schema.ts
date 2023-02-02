import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Role } from "./interfaces/roles.interface";

export const RoleSchema = new mongoose.Schema<Role>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  permissions: [{
    subject: String,
    action: String,
    conditions: { type: mongoose.Schema.Types.Mixed },
  }]
}, {
  timestamps: true,
});

RoleSchema.plugin(mongoosePaginate);

export default mongoose.models.Roles || mongoose.model("Roles", RoleSchema);

