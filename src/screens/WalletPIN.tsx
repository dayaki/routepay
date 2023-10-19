import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BackgroundView,
  Loader,
  RegularText,
  TitleText,
  TransactionPIN,
} from '@common';
import { apiService, postCharge, postVerifyPin } from '@utils';
import { useLoginStyles } from './auth/styles';
import { useAppSelector } from '@store';
import { useToast } from 'react-native-toast-notifications';

const WalletPIN = ({ navigation, route }) => {
  const { order } = useAppSelector(state => state.misc);
  const { type } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const styles = useLoginStyles();
  const toast = useToast();

  const handleSubmit = async (code: string) => {
    setIsLoading(true);
    setError('');
    try {
      const { status } = await apiService(postVerifyPin(code), 'post', {});
      if (status) {
        chargeWallet();
      } else {
        setError('Incorrect Transaction PIN.');
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const chargeWallet = async () => {
    try {
      const response = await apiService(
        postCharge,
        'post',
        order?.orderPayload,
      );
      const { status, responseDescription } = response;
      if (status === 200 && responseDescription === 'Successful') {
        navigation.navigate('transaction_success', {
          isWalletPayment: true,
          type,
        });
      } else {
        //
        toast.show('Transaction failed!', { type: 'warning' });
        navigation.goBack();
      }
    } catch (err) {
      console.log('chargeWallet ERR', err);
    } finally {
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
              style={{ marginTop: -10, marginBottom: 10 }}
            />
          )}
          <TransactionPIN
            // hasError={!!error}
            // resetError={() => setError('')}
            handleSubmit={handleSubmit}
            external
          />
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
