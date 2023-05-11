import Config from 'react-native-config';
const { BASE_URL, SERVER_URL } = Config;

// export const BaseUrl = '';
// export const baseURL = `${BaseUrl}/api/v1`;
export const merchantApi = `${BASE_URL}/merchant/api/v1`;
export const billsApi = `${BASE_URL}/bills/api/v1`;
// Auth
export const postLogin = `${merchantApi}/users/account/login`;
export const postRegister = `${merchantApi}/users/register`;
export const getUserProfile = `${merchantApi}/users/{id}/profile`;

// Bills
export const postCreateWallet = `${billsApi}/wallet`;
