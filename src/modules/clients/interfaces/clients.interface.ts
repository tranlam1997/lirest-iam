interface Resources {
  name: string;
  attributes: string[];
  actions: string[];
}

export interface Client {
  name: string;
  description?: string;
  resources: Resources[];
}