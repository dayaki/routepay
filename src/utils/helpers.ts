import { moderateScale } from 'react-native-size-matters';
import accounting from 'accounting';
import { truncate } from 'lodash';
import { apiService } from './apiService';
// import { getRefreshToken } from './endpoints';

export const ms = (number: number) => moderateScale(number);

export const moneyFormat = (amount: string | number, precision: number = 2) => {
  return accounting.formatMoney(amount, '', precision);
};

export const nairaFormat = (amount: string | number, precision: number = 2) => {
  return `₦${accounting.formatMoney(amount, '', precision)}`;
};

export const truncateText = (text: string, length: number = 26): string => {
  return truncate(text, { length });
};

export const truncateWords = (str: string, max: number = 4): string => {
  const array = str.trim().split(' ');
  const ellipsis = array.length > max ? '...' : '';
  return array.slice(0, max).join(' ') + ellipsis;
};

export const obscureEmail = (email: string) => {
  const [name] = email.split('@');
  return `${name}@***`;
  // return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
};

export const obscureNumber = (accountNumber: string) => {
  // const [name] = email.split('@');
  // return `${name}@***`;
  return `******${accountNumber.substring(accountNumber.length - 4)}`;
  // return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
};

// export const refreshToken = async () => {
//   try {
//     const resp = await apiService(getRefreshToken, 'get');
//     console.log('refreshToken...', resp);
//   } catch (error) {
//     console.log('refreshToken ERR', error);
//   }
// };
