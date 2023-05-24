import { IsBillCategory, IsBillProvider, IsUser, Theme } from './types';

export interface UserState {
  user: IsUser | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  onboarded: boolean;
}

export interface BillState {
  categories: IsBillCategory[] | undefined;
  airtime: IsBillProvider[] | undefined;
  bundle: IsBillProvider[] | undefined;
  power: IsBillProvider[] | undefined;
}

export interface MiscState {
  theme: 'dark' | 'light';
  colors: Theme;
}
