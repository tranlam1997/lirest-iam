export interface Permission {
  subject: string;
  action: string;
  conditions: { [key: string]: any };
}