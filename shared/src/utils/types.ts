export enum EntityState {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export enum ReferenceType {
  CATEGORY = 'category',
  DISH = 'dish',
}

export interface UpdateStateRequest {
  state: EntityState;
  language: string;
}

export interface WithEntityState {
  state: EntityState;
}
