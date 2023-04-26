import { IsUser } from './types';

export interface UserState {
  user: IsUser | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  onboarded: boolean;
}
