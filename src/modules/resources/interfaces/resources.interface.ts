export interface AccessControlList {
  subjectId: string;
  permissionId: string[];
}

export interface Resource {
  resourceId: string;
  name: string;
  description?: string;
  type: string;
  action: string[];
  owner?: string;
  accessCount?: number;
  accessControlList?: AccessControlList[];
  deprecated?: boolean;
}