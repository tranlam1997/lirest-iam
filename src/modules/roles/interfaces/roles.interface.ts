export interface Role {
  name: string;
  description?: string;
  permissions?: {
    subject: string;
    action: string;
    conditions?: { [key: string]: any };
  }[];
}