import { apiService, formatPhone } from '@utils';

export const getRank = async (phone: string) => {
  const data = await apiService(
    `https://myzuby.com/PromoXchangeFin/PromoService?receiver=50811&msgdata=promo rank&sender=${formatPhone(
      phone,
    )}&engineID=234102`,
    'get',
  );
  // console.log('getRank', data);
  return data;
};

export const getPointBalance = async (phone: string) => {
  const data = await apiService(
    `https://myzuby.com/PromoXchangeFin/PromoService?receiver=50811&msgdata=promo point&sender=${formatPhone(
      phone,
    )}&engineID=234102`,
    'get',
  );
  console.log('getMonthlyData', data);
  return data;
};

export const getPoints = async (phone: string) => {
  const data = await apiService(
    `https://myzuby.com/PromoXchangeFin/PromoService?receiver=50811&msgdata=promo sum&sender=${formatPhone(
      phone,
    )}&engineID=234102`,
    'get',
  );
  console.log('getMonthlyData', data);
  return data;
};

export const getTxns = async (phone: string) => {
  const data = await apiService(
    `https://myzuby.com/PromoXchangeFin/PromoService?receiver=50811&msgdata=promo txn&sender=${formatPhone(
      phone,
    )}&engineID=234102`,
    'get',
  );
  console.log('getMonthlyData', data);
  return data;
};
