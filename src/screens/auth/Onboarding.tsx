import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { authorize, revoke } from 'react-native-app-auth';
import { useStyles } from './styles';
import { Button, TitleText, ViewWrapper } from '@common';
import {
  apiService,
  getBills,
  getBillsCategory,
  postBillPayment,
  postCreateWallet,
} from '@utils';

const slides = [
  {
    key: 'one',
    title: 'Enjoy Exclusive Rewards Whenever You Meet a Transaction Goal',
    image: require('@images/onboarding_1.png'),
  },
  {
    key: 'two',
    title: 'Purchase Airline and Event Tickets Without Stress',
    image: require('@images/onboarding_2.png'),
  },
  {
    key: 'three',
    title: 'Pay For Your Bills and Subscriptions Conveniently',
    image: require('@images/onboarding_3.png'),
  },
];

const config = {
  issuer: 'https://authdev.routepay.com/',
  clientId: 'billsPortal',
  redirectUrl: 'routepay://auth/callback',
  scopes: [
    'openid',
    'profile',
    'RoutePay.MerchantApi.read',
    'RoutePay.MerchantApi.write',
    'RoutePay.PaymentApi.read',
    'RoutePay.PaymentApi.write',
    'RoutePay.BillsPayment.read',
    'RoutePay.BillsPayment.write',
  ],
};

const Onboarding = ({ navigation }) => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // login();
    getBillsM();
    // makePayment();
    // createWallet();
    // navigation.navigate('login');
  };

  const login = async () => {
    setIsLoading(true);
    try {
      const resp = await authorize(config);
      const { accessToken } = resp;
      // result includes accessToken, accessTokenExpirationDate and refreshToken
      console.log('handleLogin', JSON.stringify(resp));
      console.log(accessToken);
      setIsLoading(false);
    } catch (error) {
      console.log('handleLogin ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBillsM = async () => {
    try {
      const resp = await apiService(getBills, 'get');
      console.log('get bills', resp);
    } catch (error) {
      console.log('rrreeerrr', error);
    }
  };

  const createWallet = async () => {
    try {
      const resp = await apiService(postCreateWallet, 'post', {
        externalId: '17124f37-eb88-44bf-a44c-e3a334931a49',
        walletType: 'USER',
      });
      console.log('createWallet bills', resp);
    } catch (error) {
      console.log('createWallet ERR', error);
    }
  };

  const makePayment = async () => {
    try {
      const resp = await apiService(postBillPayment, 'post', {
        billCode: 'MTN',
        merchantReference: 'c4e0f556-a892-4141-b4f2-07a90f7129fc',
        payload: {
          mobileNumber: '07038327370',
          amount: '100',
        },
      });
      console.log('get bills', resp);
    } catch (error) {
      console.log('rrreeerrr', error);
    }
  };

  // const handleLogout = async () => {
  //   const result = await revoke(config, {
  //     tokenToRevoke: `<TOKEN_TO_REVOKE>`,
  //     includeBasicAuth: true,
  //     sendClientId: true,
  //   });
  //   console.log('logout', result);
  // };

  const renderSlide = ({ item, index }: { item: any; index: number }) => (
    <>
      <Image
        source={
          index === 1
            ? require('@images/brand_waves_inverse.png')
            : require('@images/brand_waves.png')
        }
        resizeMode="cover"
        style={styles.waves}
      />
      <View style={styles.slider}>
        <View style={styles.slide}>
          <View style={styles.imageWraper}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <TitleText text={item.title} style={styles.title} />
          <View style={styles.buttons}>
            <Button
              text="Create an account"
              style={styles.registerBtn}
              onPress={() => navigation.navigate('signup')}
            />
            {isLoading ? (
              <ActivityIndicator size="small" color="red" />
            ) : (
              <Button text="Log In" textOnly onPress={handleLogin} />
            )}
          </View>
        </View>
      </View>
    </>
  );

  const renderPagination = (activeIndex: number) => (
    <View style={styles.pagination}>
      <View
        style={[
          styles.paginationDot,
          activeIndex === 0 && styles.paginationDotActive,
        ]}
      />
      <View
        style={[
          styles.paginationDot,
          activeIndex === 1 && styles.paginationDotActive,
        ]}
      />
      <View
        style={[
          styles.paginationDot,
          activeIndex === 2 && styles.paginationDotActive,
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ViewWrapper>
        <AppIntroSlider
          renderItem={renderSlide}
          data={slides}
          renderPagination={renderPagination}
          bottomButton={true}
        />
      </ViewWrapper>
    </View>
  );
};

export default Onboarding;
