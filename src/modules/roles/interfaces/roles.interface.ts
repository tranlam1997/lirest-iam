export interface Role {
  name: string;
  description?: string;
  roleType: string;
  manageServices: string[];
  permissions: {
    name: string;
    value: string;
  }[];
}