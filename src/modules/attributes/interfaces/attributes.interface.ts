import { AttributeType } from '../constants/attribute-type';

export interface Attribute {
  name: string;
  type: typeof AttributeType;
  value: string;
  resourceId?: string;
  subjectId?: string;
}