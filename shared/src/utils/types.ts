export enum EntityState {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}

export interface UpdateStateRequest {
  state: EntityState;
  language: string;
}

export interface WithEntityState {
  state: EntityState;
}
