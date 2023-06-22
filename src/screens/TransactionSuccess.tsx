import React, { useState, useCallback } from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Primary, TitleText, ViewWrapper, useTheme } from '@common';
import {
  apiService,
  getSuccessImage,
  getTransactionStatus,
  ms,
  nairaFormat,
  postCharge,
  postWalletTopup,
} from '@utils';
import { updateWalletBalance, useAppDispatch, useAppSelector } from '@store';
import axios from 'axios';

const TransactionSuccess = ({ navigation, route }) => {
  const { order } = useAppSelector(state => state.misc);
  const { user } = useAppSelector(state => state.user);
  const {
    type,
    buttonText,
    title,
    routePath,
    trnxRef,
    access_token,
    isWalletPayment,
  } = route.params;
  const [orderStatus, setOrderStatus] = useState<'success' | 'fail'>('fail');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const orderPayload = order?.orderPayload;
  const orderData = order?.orderData;
  console.log('transaction order PAYLOAD', orderPayload);
  console.log('transaction order ORDERDATA', orderData);
  console.log('trans params', route.params);

  useFocusEffect(
    useCallback(() => {
      if (isWalletPayment) {
        setOrderStatus('success');
      } else {
        setIsLoading(true);
        verifyTransaction();
      }
    }, [isWalletPayment]),
  );

  const verifyTransaction = async () => {
    try {
      const { data } = await axios.get(getTransactionStatus(trnxRef), {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log('verifyTransaction..!!!!!!!!', data);
      // check if payment was successful
      if (
        data.paymentStatus === 0 &&
        data.paymentDescription === 'Successful'
      ) {
        if (type === 'wallet') {
          topupWallet();
        } else {
          chargeTransaction();
        }
      }
      // payment not successfult
      else {
        console.log('failed transaction');
        setOrderStatus('fail');
        setIsLoading(false);
      }
    } catch (error) {
      console.log('verifyTransaction', error);
      setIsLoading(false);
    }
  };

  const chargeTransaction = async () => {
    try {
      const resp = await fetch(postCharge, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          ...orderPayload,
          paymentMode: 'routepay',
          transactionReference: trnxRef,
          externalReference: user?.userId,
        }),
      });
      const response = await resp.json();
      console.log('chargeTransaction FETCH', response);
      const { responseDescription, status } = response; //responseCode
      if (status === 200 && responseDescription === 'Successful') {
        setOrderStatus('success');
      } else {
        setOrderStatus('fail');
      }
    } catch (error) {
      console.log('chargeTransaction ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  const topupWallet = async () => {
    try {
      const resp = await apiService(postWalletTopup, 'post', {
        transactionReference: trnxRef,
        amount: orderPayload.payload?.amount,
      });
      dispatch(updateWalletBalance(resp.balance));
      setOrderStatus('success');
    } catch (error: any) {
      console.log('wallet topup ERR', error);
      setHasError(error.message || error.title);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ViewWrapper>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color={Primary} />
          <TitleText
            text="Please wait..."
            size={14}
            style={styles.loaderText}
          />
        </View>
      ) : (
        <ScrollView>
          {orderStatus === 'success' ? (
            <>
              <View style={styles.waveWrapper}>
                <Image
                  source={require('@images/brand_waves_inverse.png')}
                  resizeMode="cover"
                  style={styles.waves}
                />
              </View>
              <View style={styles.slider}>
                <View style={styles.imageWraper}>
                  <Image
                    source={getSuccessImage()}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
                <Image
                  source={require('@images/success_mark.png')}
                  resizeMode="cover"
                  style={styles.checkmark}
                />
                <TitleText
                  size={20}
                  text={title || 'Transaction Successful!'}
                  style={styles.welcomeTitle}
                />
                {type === 'wallet' && (
                  <Text style={styles.welcomeText}>
                    Your wallet topup of{' '}
                    {nairaFormat(orderPayload?.payload?.amount)} was successful.
                  </Text>
                )}
                {type === 'airtime' && (
                  <Text style={styles.welcomeText}>
                    You’ve just recharged {orderPayload?.payload?.mobileNumber}{' '}
                    with {nairaFormat(orderPayload?.payload?.amount)} airtime.
                  </Text>
                )}
                {type === 'data' && (
                  <Text style={styles.welcomeText}>
                    You’ve just purchased {orderData?.plan} with{' '}
                    {nairaFormat(orderPayload?.payload?.amount)}.
                  </Text>
                )}
                {type === 'fuel' && (
                  <Text style={styles.welcomeText}>
                    You’ve just purchased{' '}
                    {nairaFormat(orderPayload?.payload?.amount)} worth of Petrol
                    from {orderPayload?.payload?.fuelStation} filling station.
                  </Text>
                )}
                {type === 'electricity' && (
                  <Text style={styles.welcomeText}>
                    You’ve just completed your electricity payment with{' '}
                    {orderData.company} for{' '}
                    {nairaFormat(orderPayload?.payload?.amount)}.
                  </Text>
                )}
                {type === 'cable' && (
                  <Text style={styles.welcomeText}>
                    You’ve just subscribed your {orderData.company} with{' '}
                    {nairaFormat(orderPayload?.payload?.amount)}.
                  </Text>
                )}
                <Button
                  text={buttonText || 'Continue to dashboard'}
                  style={styles.registerBtn}
                  onPress={() => navigation.navigate(routePath || 'home')}
                />
                {type && type === 'transaction' && (
                  <TouchableOpacity activeOpacity={0.7} style={styles.shareBtn}>
                    <TitleText text="Share Receipt?" size={14} />
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <View style={styles.sliderr}>
              <View>
                <View style={styles.imageWraperr}>
                  <Image
                    source={require('@images/success/failed.png')}
                    resizeMode="cover"
                    style={{ width: 180, height: 180, alignSelf: 'center' }}
                  />
                </View>
                <TitleText
                  size={20}
                  text={'Transaction Failed!'}
                  style={styles.welcomeTitle}
                  color="red"
                />
                <Text style={[styles.welcomeText, { marginTop: 30 }]}>
                  Your transaction failed. Kindly reach out to support if you
                  have any question.
                </Text>
              </View>
              <Button
                text={'Continue to dashboard'}
                style={[styles.registerBtn, { marginTop: 60 }]}
                onPress={() => navigation.navigate('home')}
              />
            </View>
          )}
        </ScrollView>
      )}
    </ViewWrapper>
  );
};

export default TransactionSuccess;

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderText: {
      marginTop: ms(40),
    },
    waveWrapper: {
      width: '100%',
      height: ms(341),
      borderRadius: ms(10),
      position: 'absolute',
    },
    waves: {
      width: '100%',
      height: '100%',
    },
    slider: {
      width: '90%',
      alignSelf: 'center',
    },
    sliderr: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 30,
    },
    imageWraper: {
      width: ms(340),
      height: ms(399),
      marginBottom: ms(30),
      alignSelf: 'center',
    },
    imageWraperr: {
      width: ms(340),
      // height: ms(399),
      marginTop: ms(60),
      marginBottom: ms(30),
      alignSelf: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: ms(20),
      alignSelf: 'center',
    },
    checkmark: {
      width: ms(64),
      height: ms(64),
      alignSelf: 'center',
      marginBottom: ms(20),
    },
    registerBtn: {
      marginBottom: ms(20),
    },
    welcomeTitle: {
      textAlign: 'center',
      lineHeight: 30,
      width: '80%',
      alignSelf: 'center',
      marginBottom: ms(10),
    },
    welcomeText: {
      fontSize: 11,
      lineHeight: 20,
      color: colors.text,
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: ms(30),
      width: '64%',
    },
    bold: {
      fontWeight: '700',
    },
    brand: {
      fontWeight: '700',
      color: colors.primary,
    },
    shareBtn: {
      alignSelf: 'center',
    },
    shareBtnText: {
      color: colors.primary,
    },
  });
};
