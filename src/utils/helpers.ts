import { Linking } from 'react-native';
import { PAYMENT_CLIENT_ID, PAYMENT_CLIENT_SECRET } from '@env';
import { moderateScale } from 'react-native-size-matters';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import uuid from 'react-native-uuid';
import accounting from 'accounting';
import { truncate, sample } from 'lodash';
import ShortUniqueId from 'short-unique-id';
import axios from 'axios';
import qs from 'qs';
import {
  PostMessage,
  getProfile,
  postInitPayment,
  postPaymentToken,
} from './endpoints';
import { apiService } from './apiService';
import { decode } from 'base-64';
import { getWallet, store } from '@store';

const lowercase = new RegExp('(?=.*[a-z])');
const uppercase = new RegExp('(?=.*[A-Z])');
const number = new RegExp('(?=.*[0-9])');
const specialCharacters = new RegExp('(?=.*[!@#$%^&*/\\\\)(+=._-])');
const length = new RegExp('(?=.{8,})');

type MessageProps = {
  type: 'sms' | 'email' | 'both';
  phone: string;
  message: string;
  from?: string;
  to?: string;
  cc?: string;
  subject?: string;
  typeId?: string;
};

type PinType = [{ pinCode: string }];

export const ms = (num: number) => moderateScale(num);

export const moneyFormat = (amount: string | number, precision: number = 2) => {
  return accounting.formatMoney(amount, '', precision);
};

export const getUuid = () => {
  return uuid.v4();
};

export const nairaFormat = (
  amount: string | number = 0,
  precision: number = 2,
) => {
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
};

export const extractAmount = (amount: string | number) => {
  if (typeof amount === 'number') {
    return amount;
  }
  return Number(amount.replace(/,/g, ''));
};

export const obscureNumber = (accountNumber: string) => {
  return `******${accountNumber.substring(accountNumber.length - 4)}`;
};

export const getUniqueID = (limit: number = 10, isNumeric = false) => {
  const uid = new ShortUniqueId();
  return isNumeric ? Date.now() : uid(limit);
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
  const name = slug.toLowerCase();
  console.log('getImage', name);
  if (name.includes('mtn')) {
    return require('@images/networks/mtn.png');
  } else if (name.includes('airtel')) {
    return require('@images/networks/airtel.png');
  } else if (name.includes('etisalat')) {
    return require('@images/networks/9mobile.png');
  } else if (name.includes('glo')) {
    return require('@images/networks/glo.png');
  } else if (name.includes('smile')) {
    return require('@images/networks/smile.png');
  } else if (name.includes('spectranet')) {
    return require('@images/networks/spectranet.png');
  } else if (name.includes('showmax')) {
    return require('@images/networks/showmax.png');
  } else if (name.includes('gotv')) {
    return require('@images/networks/gotv.png');
  } else if (name.includes('boxoffice')) {
    return require('@images/networks/box_office.png');
  } else if (name.includes('dstv')) {
    return require('@images/networks/dstv.png');
  } else if (name.includes('startimes')) {
    return require('@images/networks/startimes.png');
  } else {
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
        client_id: PAYMENT_CLIENT_ID,
        client_secret: PAYMENT_CLIENT_SECRET,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const data2send = {
      merchantId: PAYMENT_CLIENT_ID,
      returnUrl: 'https://routepay.com/about-routepay',
      merchantReference: getUniqueID(),
      currency: 'NGN',
      ...payload,
    };
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

const sleep = async (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const openLink = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.close();
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#000',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#000',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
      });
      await sleep(800);
      // Alert.alert(JSON.stringify(result));
    } else {
      Linking.openURL(url);
    }
  } catch (error: any) {
    // Alert.alert(error.message);
    await InAppBrowser.close();
  } finally {
    InAppBrowser.close();
  }
};

export const sendMessage = async ({
  type,
  message,
  phone,
  from,
  to,
  cc,
  subject,
}: MessageProps) => {
  let payload = {
    messageType: type,
    sms: {
      phoneNumber: phone,
      message: message,
    },
    email: {
      message,
      from,
      to,
      cc,
      subject,
      source: 0,
      recepientName: '',
      header: '',
      buttonLink: '',
      buttonText: '',
      code: '',
    },
  };
  try {
    await apiService(PostMessage, 'post', payload);
  } catch (error) {
    console.log('sendMessage error', error);
  }
};

export const sendPins = async (
  pins: PinType,
  phone: string,
  amount: string,
) => {
  const userPins = pins.map(elem => elem.pinCode).toString();
  await sendMessage({
    type: 'sms',
    phone: phone,
    message: `Your PIN transaction of ${nairaFormat(
      amount,
    )} was successful. PIN: ${userPins}`,
  });
};

export const sendToken = async (
  token: string,
  phone: string,
  amount: string,
) => {
  await sendMessage({
    type: 'sms',
    phone: phone,
    message: `Your Electricity transaction of ${nairaFormat(
      amount,
    )} was successful. Token: ${token}`,
  });
};

export const getUserProfile = async () => {
  const token = store.getState().user.token ?? '';
  const payload = decode(token.split('.')[1]);
  const { sub } = JSON.parse(payload);
  const user = await apiService(getProfile(sub), 'get');
  // store.dispatch(userLogin(user));
  store.dispatch(getWallet(user.phoneNumber));
};
