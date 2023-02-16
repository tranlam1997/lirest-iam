import { ActionType } from '../../actions/constants/actions.constant';
export interface PolicyTarget {
  subjectId: string;
  resourceId: string;
  action: typeof ActionType[keyof typeof ActionType];
}

export interface Policy {
  policyId: string;
  name: string;
  description?: string;
  effect: string;
  target: PolicyTarget;
  rule: string;
}