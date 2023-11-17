import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BackgroundView,
  Loader,
  RegularText,
  TitleText,
  TransactionPIN,
} from '@common';
import {
  apiService,
  getUniqueID,
  postCharge,
  postMakeTransfer,
  postVerifyPin,
  sendPins,
  sendToken,
} from '@utils';
import { useLoginStyles } from './auth/styles';
import { useAppSelector } from '@store';
import { useToast } from 'react-native-toast-notifications';

const WalletPIN = ({ navigation, route }) => {
  const { order } = useAppSelector(state => state.misc);
  const { user } = useAppSelector(state => state.user);
  const { type, data } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const styles = useLoginStyles();
  const toast = useToast();

  useEffect(() => {
    if (code.length === 1) {
      setError('');
    }
    if (code.length === 4) {
      handleSubmit(code);
    }
  }, [code]);

  const handleSubmit = async (pin: string) => {
    setIsLoading(true);
    setError('');
    try {
      const { status } = await apiService(postVerifyPin(pin), 'post', {});
      if (status) {
        if (type.includes('payment')) {
          makeTransfer();
        } else {
          chargeWallet();
        }
      } else {
        setError('Incorrect Transaction PIN.');
        setCode('');
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const chargeWallet = async () => {
    try {
      const resp = await apiService(postCharge, 'post', order?.orderPayload);
      const { status, responseDescription, response } = resp;
      if (status === 200 && responseDescription === 'Successful') {
        if (type === 'pin') {
          await sendPins(response, user?.phoneNumber || '', type, data.amount);
        }
        if (type === 'electricity') {
          await sendToken(response.token, user?.phoneNumber || '', data.amount);
        }
        navigation.navigate('transaction_success', {
          isWalletPayment: true,
          type,
        });
      } else {
        toast.show('Transaction failed!', { type: 'warning' });
        navigation.goBack();
      }
    } catch (err) {
      console.log('chargeWallet ERR', err);
    } finally {
      setIsLoading(false);
    }
  };

  const makeTransfer = async () => {
    try {
      let payload;
      if (type === 'bank_payment') {
        payload = {
          sourceAccountNumber: user?.phoneNumber,
          transferType: 'account',
          beneficiaryAccountNumber: data.account.beneficiaryAccountNumber,
          beneficiaryAccountName: data.account.beneficiaryAccountName,
          bankCode: data.account.bankCode,
          amount: data.amount,
          paymentReference: getUniqueID(8),
          verificationId: data.account.verificationId,
          transferLocation: '1.38716,3.05117',
          transferNarration: data.remark,
          merchantReference: '235466776',
        };
      } else {
        payload = {
          sourceAccountNumber: user?.phoneNumber,
          transferType: 'wallet',
          beneficiaryAccountNumber: data.account.beneficiaryAccountNumber,
          beneficiaryAccountName: data.account.beneficiaryAccountName,
          bankCode: data.account.bankCode,
          amount: data.amount,
          paymentReference: getUniqueID(8),
          verificationId: data.account.verificationId,
          transferLocation: '1.38716,3.05117',
          transferNarration: data.remark,
          merchantReference: '235466776',
        };
      }
      const res = await apiService(postMakeTransfer, 'post', payload);
      setIsLoading(false);
      navigation.navigate('verify_otp', { data: { ...data, ...res, type } });
    } catch (err: any) {
      toast.show(err.title, { type: 'warning' });
      setIsLoading(false);
    }
  };

  return (
    <BackgroundView hasBack>
      <Loader show={isLoading} />
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="Enter your wallet pin" />
          <RegularText
            size={14}
            text="Enter your wallet pin to confirm this transaction."
            style={styles.otpLabel}
          />
          {error && (
            <RegularText
              text={error}
              size={12}
              color="red"
              style={{ marginTop: -20 }}
            />
          )}
          <View
            style={{
              marginTop: 20,
            }}>
            <TransactionPIN pin={code} setPin={setCode} hasError={!!error} />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.forgotPinBtn}
          onPress={() => navigation.navigate('change_pin')}>
          <TitleText
            text="Forgot Pin?"
            size={14}
            style={styles.forgotPinBtnText}
          />
        </TouchableOpacity>
      </View>
    </BackgroundView>
  );
};
export default WalletPIN;
