import { Roles } from './interfaces/roles.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const RolesSchema = new mongoose.Schema<Roles>({
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
});

RolesSchema.plugin(mongoosePaginate);

export default mongoose.model("Roles", RolesSchema);

