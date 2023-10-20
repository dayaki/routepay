// import { BASE_URL, AUTH_URL } from '@env';
// import Keys from 'react-native-keys';
const AUTH_URL = 'https://authqa.routepay.com';
const BASE_URL = 'https://apiqa.routepay.com';

// export const BaseUrl = '';
export const baseURL = `${BASE_URL}/api`;
export const authURL = `${AUTH_URL}`;
export const merchantApi = `${BASE_URL}/merchant/api/v1`;
export const billsApi = `${BASE_URL}/bills/api/v1`;
export const paymentApi = `${BASE_URL}/payment/api/v1`;

// Auth
export const getLogin = `${authURL}/api/token`;
export const postVerify2fa = `${authURL}/api/token`;
export const postForgotPass = `${merchantApi}/Account/GenerateResetPasswordLink`;

// export const postLogin = `${merchantApi}/users/account/login`;
// export const postRegister = `${merchantApi}/users/register`;
export const postRegister = `${merchantApi}/users/externalregisterusers/register`;
export const getProfile = (userId: number | string) =>
  `${merchantApi}/users/profile/${userId}`;
// export const getUserProfile = `${merchantApi}/users/{id}/profile`;

// Wallet
export const postCreateWallet = `${billsApi}/wallet`;
export const getWalletBalance = (id: string) => `${billsApi}/Wallet/${id}`;
export const postWalletTopup = `${billsApi}/wallet/topup`;
export const postVerifyBank = `${billsApi}/transfer/verify`;
export const postMakeTransfer = `${billsApi}/transfer`;
export const postValidateTransfer = `${billsApi}/transfer/validate`;

export const getBanks = `${billsApi}/transfer/banks`;
export const postBvnCheck = `${merchantApi}/kyc/bvn`;

// Bills
export const getBills = `${billsApi}/bill`;
export const getBillsCategory = `${billsApi}/billcategory`;
export const getBillsByCategory = (
  categoryId: number,
) => `${billsApi}/bill/${categoryId}/category
`;
export const postBillPayment = `${billsApi}/Payment/charge`;
export const postBundleLookup = `${billsApi}/Payment/lookup`;

// Profile
export const postSetPin = `${merchantApi}/Account/SetPin`;
export const postVerifyPin = (pin: string) =>
  `${merchantApi}/Account/ValidatePin?pin=${pin}`;
export const putChangePassword = `${billsApi}/users/password`;
export const postUpdateProfile = `${merchantApi}/users/updateuser`;
export const getTransactions = `${billsApi}/transaction`;

// Payment
export const postPaymentToken = `${authURL}/connect/token`;
export const postInitPayment = `${paymentApi}/Payment/SetRequest`;
export const getTransactionStatus = (transID: string) =>
  `${paymentApi}/Payment/GetTransaction/${transID}`;
export const postCharge = `${billsApi}/Payment/charge`;
