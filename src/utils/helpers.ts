import { moderateScale } from 'react-native-size-matters';
import accounting from 'accounting';
import { truncate } from 'lodash';

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

export const formatPhone = (phoneNum: string): string => {
  const phone = phoneNum.replace(/-/g, '');
  const phoneNumber = phone?.split(' ').join('');
  const countryLine = phoneNumber.startsWith('+');
  const defaultLine = phoneNumber.startsWith('0') && phoneNumber.length === 11;
  const phoneIndex = phoneNumber.length - 10;
  console.log('phoneNumber', countryLine);
  if (phoneNumber.length) {
    if (defaultLine || countryLine) {
      return `234${phoneNumber.slice(phoneIndex)}`;
    } else {
      return phoneNumber;
    }
  } else {
    return 'hello world...';
  }
};

export const getImage = (slug: string) => {
  switch (slug) {
    case 'mtn':
      return require('@images/networks/mtn.png');
    case 'airtel':
      return require('@images/networks/airtel.png');
    case 'etisalat':
      return require('@images/networks/9mobile.png');
    case 'glo':
      return require('@images/networks/glo.png');
    case 'smile':
      return require('@images/networks/smile.png');
    default:
      return require('@images/networks/mtn.png');
  }
};

export const getName = (name: string) => {
  return `${name.split('_')[0].toUpperCase()}`;
};

// export const refreshToken = async () => {
//   try {
//     const resp = await apiService(getRefreshToken, 'get');
//     console.log('refreshToken...', resp);
//   } catch (error) {
//     console.log('refreshToken ERR', error);
//   }
// };
