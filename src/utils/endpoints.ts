import Config from 'react-native-config';
const { BASE_URL, SERVER_URL } = Config;

// export const BaseUrl = '';
export const baseURL = `${BASE_URL}/api`;
export const authURL = 'https://authdev.routepay.com/api';
export const merchantApi = `${BASE_URL}/merchant/api/v1`;
export const billsApi = `${BASE_URL}/bills/api/v1`;
export const paymentApi = `${BASE_URL}/payment/api/v1`;

// Auth
export const getLogin = `${authURL}/token`;
export const postVerify2fa = `${authURL}/token`;

// export const postLogin = `${merchantApi}/users/account/login`;
// export const postRegister = `${merchantApi}/users/register`;
export const postRegister = `${merchantApi}/users/externalregisterusers/register`;
export const getProfile = (userId: number | string) =>
  `${merchantApi}/users/profile/${userId}`;
// export const getUserProfile = `${merchantApi}/users/{id}/profile`;

// Bills
export const getBills = `${billsApi}/bill`;
export const getBillsCategory = `${billsApi}/billcategory`;
export const getBillsByCategory = (
  categoryId: number,
) => `${billsApi}/bill/${categoryId}/category
`;
export const postBillPayment = `${billsApi}/Payment/charge`;
export const postBundleLookup = `${billsApi}/Payment/lookup`;
export const getWalletBalance = (id: string) => `${billsApi}/Wallet/${id}`;
export const postCreateWallet = `${billsApi}/wallet`;

// Profile

export const postSetPin = `${merchantApi}/Account/SetPin`;
export const postVerifyPin = (pin: string) =>
  `${merchantApi}/Account/ValidatePin?pin=${pin}`;

export const getTransactions = `${billsApi}/transaction`;

// Payment
export const postPaymentToken = `${authURL}/connect/token`;
export const postInitPayment = `${paymentApi}/Payment/SetRequest`;
export const getTransactionStatus = `${paymentApi}/Payment/GetTransaction/`;
