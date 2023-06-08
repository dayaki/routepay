import React, { useEffect, useState, useCallback } from 'react';
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
  const {
    order: { orderPayload, orderData },
  } = useAppSelector(state => state.misc);
  const { type, buttonText, title, routePath, trnxRef, access_token } =
    route.params;
  const [orderStatus, setOrderStatus] = useState<'success' | 'fail'>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState('');
  const styles = useStyles();
  const dispatch = useAppDispatch();
  console.log('transaction order PAYLOAD', orderPayload);
  console.log('transaction order ORDERDATA', orderData);
  console.log('trans params', route.params);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      verifyTransaction();
    }, []),
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
      }
    } catch (error) {
      console.log('verifyTransaction', error);
      setIsLoading(false);
    }
  };

  const chargeTransaction = async () => {
    try {
      const { data } = await axios.post(postCharge, orderPayload, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log('chargeTransaction', data);
      const { responseDescription, status } = data;
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
                Your wallet topup of {nairaFormat(orderPayload.payload?.amount)}{' '}
                was successful.
              </Text>
            )}
            {type === 'airtime' && (
              <Text style={styles.welcomeText}>
                You’ve just recharged {orderPayload.payload?.mobileNumber} with{' '}
                {nairaFormat(orderPayload.payload?.amount)} airtime.
              </Text>
            )}
            {type === 'data' && (
              <Text style={styles.welcomeText}>
                You’ve just purchased {orderData?.plan} with{' '}
                {nairaFormat(orderPayload.payload?.amount)}
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
    imageWraper: {
      width: ms(340),
      height: ms(399),
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
