import { Permission } from './interfaces/permissions.interface';
import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ActionType } from '../actions/constants/actions.constant';

export const PermissionSchema = new mongoose.Schema<Permission>({
  permissionId: {
    type: String,
    unique: true,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: Object.values(ActionType),
    required: true,
  },
  effect: {
    type: String,
    required: true,
  },
  conditions: Schema.Types.Mixed,
}, {
  timestamps: true,
});

PermissionSchema.plugin(mongoosePaginate);

export default mongoose.models.Permissions || mongoose.model("Permissions", PermissionSchema);
