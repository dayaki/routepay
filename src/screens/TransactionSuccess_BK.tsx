import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Button, Primary, TitleText, ViewWrapper, useTheme } from '@common';
import {
  apiService,
  getSuccessImage,
  ms,
  postCharge,
  postWalletTopup,
} from '@utils';
import { updateWalletBalance, useAppDispatch, useAppSelector } from '@store';

const TransactionSuccess = ({ navigation, route }) => {
  const { type, message, buttonText, title, routePath, data, trnxRef } =
    route.params;
  const { order } = useAppSelector(state => state.misc);
  const [orderStatus, setOrderStatus] = useState<'success' | 'fail'>();
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();
  const dispatch = useAppDispatch();
  console.log('order DATA', order);
  console.log('trnxRef', trnxRef);
  console.log('type', type);

  useEffect(() => {
    if (type === 'wallet') {
      topupWallet();
    } else {
      chargeTransaction();
    }

    return () => {
      setIsLoading(true);
    };
  }, [type]);

  const chargeTransaction = async () => {
    console.log('calling CHARGE...');
    try {
      const resp = await apiService(postCharge, 'post', order);
      //   axios.post(postCharge, {
      //     headers: {
      //       Authorization: `Bearer ${params.access_token}`,
      //     },
      //   });
      console.log('chargeTransaction', resp);
      const { responseDescription, status } = resp;
      if (status === 200 && responseDescription === 'Successful') {
        setOrderStatus('success');
        setIsLoading(false);
      }
    } catch (error) {
      console.log('chargeTransaction ERR', error);
    }
  };

  const topupWallet = async () => {
    try {
      const resp = await apiService(postWalletTopup, 'post', {
        transactionReference: trnxRef,
        amount: order?.amount,
      });
      console.log('wallet topup', resp);
      dispatch(updateWalletBalance(resp.balance));
      setOrderStatus('success');
    } catch (error) {
      console.log('wallet topup ERR', error);
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
          <Image
            source={require('@images/brand_waves_inverse.png')}
            resizeMode="cover"
            style={styles.waves}
          />
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
            <Text style={styles.welcomeText}>{message}</Text>
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
    waves: {
      width: '100%',
      height: ms(461),
      left: 0,
      position: 'relative',
      zIndex: 50,
    },
    slider: {
      position: 'absolute',
      zIndex: 100,
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
