export interface PermissionCondition {
  attribute: string;
  value: string;
}

export interface Permission {
  permissionId: string;
  subjectId: string;
  resourceId: string;
  action: string;
  effect: string;
  condition?: PermissionCondition[];
}