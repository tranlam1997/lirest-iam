import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Role } from "./interfaces/roles.interface";

export const RoleSchema = new mongoose.Schema<Role>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  roleType: {
    type: String,
    enum: ["service", "app"],
    default: "app",
  },
  manageServices: [String],
  permissions: [{
    name: String,
    value: String
  }]
}, {
  timestamps: true,
});

RoleSchema.plugin(mongoosePaginate);

export default mongoose.model("Roles", RoleSchema);

