import { MyWinnings } from './../screens/rewards/utils';
import {
  IsBillCategory,
  IsBillProvider,
  IsFuelStation,
  IsTransaction,
  IsUser,
  IsWallet,
  LoyaltyT,
  OrderPayload,
  Theme,
} from './types';

export interface UserState {
  user: IsUser | undefined;
  token: string | undefined;
  username: string | null;
  email: string | null;
  wallet: IsWallet;
  isAuthenticated: boolean;
  onboarded: boolean;
  inactivity: boolean;
  appState: string;
  logOffTime: string;
  lockAlertVisibility: boolean;
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
  order: OrderPayload | undefined;
  transactions: IsTransaction[] | undefined;
}

export interface LoyaltyState {
  dashboard:
    | {
        firstname: string;
        ExchangeRate: number;
        customerclass: string;
        subscribeflag: string;
        msisdn: string;
        email: string;
        lastname: string;
        memberid: string;
        points: number;
      }
    | undefined;
  winnings: {} | undefined;
  monthly: LoyaltyT[] | undefined;
  overall: LoyaltyT[] | undefined;
}
