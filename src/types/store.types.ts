import {
  IsBillCategory,
  IsBillProvider,
  IsFuelStation,
  IsTransaction,
  IsUser,
  IsWallet,
  Theme,
} from './types';

export interface UserState {
  user: IsUser | undefined;
  token: string | undefined;
  wallet: IsWallet | undefined;
  isAuthenticated: boolean;
  onboarded: boolean;
}

export interface BillState {
  categories: IsBillCategory[] | undefined;
  airtime: IsBillProvider[] | undefined;
  bundle: IsBillProvider[] | undefined;
  power: IsBillProvider[] | undefined;
  fuel: IsFuelStation[] | undefined;
  cable: IsBillProvider[] | undefined;
  pins: IsBillProvider[] | undefined;
}

export interface MiscState {
  theme: 'dark' | 'light';
  colors: Theme;
  showBalance: boolean;
  transactions: IsTransaction[] | undefined;
}
