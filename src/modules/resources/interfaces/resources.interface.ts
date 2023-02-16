import { ActionType } from '../../actions/constants/actions.constant';
export interface AccessControlList {
  subjectId: string;
  permissionId: string[];
}

export interface Resource {
  resourceId: string;
  name: string;
  description?: string;
  type: string;
  actions: typeof ActionType[keyof typeof ActionType][];
  owner?: string;
  accessCount?: number;
  accessControlList?: AccessControlList[];
  deprecated?: boolean;
}