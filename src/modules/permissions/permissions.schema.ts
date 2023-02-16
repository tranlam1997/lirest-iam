import { Permission, PermissionCondition } from './interfaces/permissions.interface';
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ActionType } from '../actions/constants/actions.constant';

export const PermissionConditionSchema = new mongoose.Schema<PermissionCondition>({
  attribute: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, {
  _id: false
});

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
  condition: [PermissionConditionSchema],
}, {
  timestamps: true,
});

PermissionSchema.plugin(mongoosePaginate);

export default mongoose.models.Permissions || mongoose.model("Permissions", PermissionSchema);

