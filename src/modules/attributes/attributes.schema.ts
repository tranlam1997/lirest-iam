import { Attribute } from './interfaces/attributes.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { AttributeType } from './constants/attribute-type';

export const AttributeSchema = new mongoose.Schema<Attribute>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: AttributeType,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  resourceId: String,
  subjectId: String,
}, {
  timestamps: true,
});

AttributeSchema.plugin(mongoosePaginate);

export default mongoose.models.Attributes || mongoose.model("Attributes", AttributeSchema);

