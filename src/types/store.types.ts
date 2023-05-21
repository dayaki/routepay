import { IsBillCategory, IsUser } from './types';

export interface UserState {
  user: IsUser | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  onboarded: boolean;
}

export interface BillState {
  categories: IsBillCategory[] | undefined;
  airtime: [] | undefined;
  bundle: [] | undefined;
  power: [] | undefined;
}

export interface MiscState {
  theme: 'dark' | 'light';
}
