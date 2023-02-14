export interface PolicyTarget {
  subjectId: string;
  resourceId: string;
  action: string;
}

export interface Policy {
  policyId: string;
  name: string;
  description?: string;
  effect: string;
  target: PolicyTarget;
  rule: string;
}