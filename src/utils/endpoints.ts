import Config from 'react-native-config';
const { BASE_URL, SERVER_URL } = Config;

// export const BaseUrl = '';
export const baseURL = `${BASE_URL}/api`;
export const merchantApi = `${BASE_URL}/merchant/api/v1`;
export const billsApi = `${BASE_URL}/bills/api/v1`;
// Auth
export const getLogin = 'https://authdev.routepay.com/api/token';
// export const postLogin = `${merchantApi}/users/account/login`;
// export const postRegister = `${merchantApi}/users/register`;
export const postRegister = `${merchantApi}/users/externalregisterusers/register`;
export const getUserProfile = `${merchantApi}/users/{id}/profile`;

// Bills
export const postToken = `${BASE_URL}/connect/token`;
export const getBills = `${billsApi}/bill`;
export const getBillsCategory = `${billsApi}/billcategory`;
export const postBillPayment = `${billsApi}/Payment/charge`;
export const postBundleLookup = `${billsApi}/Payment/lookup`;
export const getWalletBalance = (id: string) => `${billsApi}/Wallet/${id}`;
export const postCreateWallet = `${billsApi}/wallet`;

// Profile
export const getProfile = (userId: number | string) =>
  `${merchantApi}/users/profile/${userId}`;

export const postSetPin = `${merchantApi}/Account/SetPin`;
export const getVerifyPin = (pin: string) =>
  `${merchantApi}/Account/ValidatePin?pin=${pin}`;
