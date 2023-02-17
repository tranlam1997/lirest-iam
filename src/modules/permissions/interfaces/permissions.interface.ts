import { ActionType } from '../../actions/constants/actions.constant';
export interface Permission {
  permissionId: string;
  subjectId: string;
  resourceId: string;
  action: typeof ActionType[keyof typeof ActionType];
  effect: string;
  conditions?: Record<string, string>;
}