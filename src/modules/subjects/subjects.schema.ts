import { Subject } from './interfaces/subjects.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const SubjectSchema = new mongoose.Schema<Subject>({
  subjectId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

SubjectSchema.plugin(mongoosePaginate);

export default mongoose.models.Subjects || mongoose.model("Subjects", SubjectSchema);
