import { ActionType } from '../../actions/constants/actions.constant';
export interface PolicyTarget {
  subjectAttributes: Record<string, string>;
  resourceAttributes: Record<string, string>;
  actions: typeof ActionType[keyof typeof ActionType][];
}

export interface Policy {
  policyId: string;
  name: string;
  description?: string;
  effect: string;
  target: PolicyTarget;
  rule: string;
}