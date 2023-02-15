import { Action } from './interfaces/actions.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const ActionSchema = new mongoose.Schema<Action>({
  actionId: {
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
}, {
  timestamps: true,
});

ActionSchema.plugin(mongoosePaginate);

export default mongoose.models.Actions || mongoose.model("Actions", ActionSchema);

