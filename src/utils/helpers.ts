import { moderateScale } from 'react-native-size-matters';
import uuid from 'react-native-uuid';
import accounting from 'accounting';
import { truncate, sample } from 'lodash';
import ShortUniqueId from 'short-unique-id';
import axios from 'axios';
import qs from 'qs';
import { postInitPayment, postPaymentToken } from './endpoints';

// const strongRegex = new RegExp(
//   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*/\\\\)(+=._-])',
// );
// const mediumRegex = new RegExp(
//   '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
// );
const lowercase = new RegExp('(?=.*[a-z])');
const uppercase = new RegExp('(?=.*[A-Z])');
const number = new RegExp('(?=.*[0-9])');
const specialCharacters = new RegExp('(?=.*[!@#$%^&*/\\\\)(+=._-])');
const length = new RegExp('(?=.{8,})');

export const ms = (num: number) => moderateScale(num);

export const moneyFormat = (amount: string | number, precision: number = 2) => {
  return accounting.formatMoney(amount, '', precision);
};

export const getUuid = () => {
  return uuid.v4();
};

export const nairaFormat = (amount: string | number, precision: number = 2) => {
  return `₦${accounting.formatMoney(amount, '', precision)}`;
};

export const truncateText = (text: string, len: number = 26): string => {
  return truncate(text, { length: len });
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

export const getUniqueID = (limit: number = 10) => {
  const uid = new ShortUniqueId();
  return uid(limit);
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
  const name = slug.split(' ')[0].toLowerCase();
  // console.log('getImage', slug, name);
  switch (name) {
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
    case 'spectranet':
      return require('@images/networks/spectranet.png');
    case 'startimes':
      return require('@images/networks/startimes.png');
    case 'showmax':
      return require('@images/networks/showmax.png');
    case 'gotv':
      return require('@images/networks/gotv.png');
    case 'dstv':
      return require('@images/networks/dstv.png');
    default:
      return require('@images/networks/blank.png');
  }
};

export const getSuccessImage = () => {
  const images = [
    require('@images/success/success_1.png'),
    require('@images/success/success_2.png'),
    require('@images/success/success_3.png'),
    require('@images/success/success_4.png'),
    require('@images/success/success_5.png'),
    require('@images/success/success_6.png'),
  ];
  return sample(images);
};

export const getName = (name: string) => {
  if (name) {
    return `${name.split('_').join(' ').toString()}`;
  }
  return '';
  // return `${name.split('_')[0].toUpperCase()}`;
};

export const passwordTests = (password: string) => {
  const values = {
    length: false,
    lowercase: false,
    number: false,
    special: false,
    uppercase: false,
  };
  if (lowercase.test(password)) values.lowercase = true;
  if (uppercase.test(password)) values.uppercase = true;
  if (number.test(password)) values.number = true;
  if (specialCharacters.test(password)) values.special = true;
  if (length.test(password)) values.length = true;
  return values;
};

export const initPaymentFlow = async (payload: any) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: postPaymentToken,
      data: qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'yMesQUqwMDFebeb',
        client_secret: 'BUAIQoSElenGnypcfLJftByjcMsLEd',
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    console.log('data TOKEN', data.access_token);
    const data2send = {
      merchantId: 'yMesQUqwMDFebeb',
      returnUrl: 'https://callback.routepay.com/return',
      merchantReference: getUniqueID(),
      currency: 'NGN',
      ...payload,
    };
    console.log('data2send...', data2send);
    const { data: resp } = await axios.post(postInitPayment, data2send, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });
    return { ...resp, access_token: data.access_token };
  } catch (error) {
    console.log('initPaymentFlow ERR', error);
  }
};

// export const refreshToken = async () => {
//   try {
//     const resp = await apiService(getRefreshToken, 'get');
//     console.log('refreshToken...', resp);
//   } catch (error) {
//     console.log('refreshToken ERR', error);
//   }
// };
