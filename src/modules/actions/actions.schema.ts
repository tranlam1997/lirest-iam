import { Action } from './interfaces/actions.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const ActionSchema = new mongoose.Schema<Action>({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

ActionSchema.plugin(mongoosePaginate);

export default mongoose.model("Actions", ActionSchema);

