export interface IsUser {
  id: number;
  username: string;
  email: string;
  fullname: string;
  home_id: number;
  tag_id: number;
  phone: string;
  token: string;
  email_verified: boolean;
  updated_at: Date;
  created_at: Date;
}

export interface isCard {
  id: number;
  user_id: string;
  bin: string;
  authorization_code: string;
  last_four: string;
  exp_month: string;
  exp_year: string;
  card_type: 'visa' | 'mastercard';
  bank: string;
  brand: 'visa' | 'mastercard';
  created_at: Date;
  updated_at: Date;
}

export interface IsBank {
  id: number;
  name: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

export interface isWallet {
  id: number;
  balance: string;
  created_at: Date;
  on_hold: boolean;
  total_expense: string;
  total_income: string;
  updated_at: Date;
  user_id: number;
}

export interface IsTransaction {
  id: number;
  account_id: number | null;
  user_id: number;
  amount: string | number;
  type: 'credit' | 'debit';
  reference: string;
  merchant_id: string;
  narration: string;
  created_at: Date;
  updated_at: Date;
  transfer_code: string | null;
  status: 'pending' | 'successful' | 'failed';
}

export interface IsError {
  data: null | {};
  message: string;
}
