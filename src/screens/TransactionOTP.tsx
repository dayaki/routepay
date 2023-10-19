import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BackgroundView,
  Button,
  Loader,
  OTPInput,
  RegularText,
  TitleText,
} from '@common';
import { VerifyOtpProps } from '@types';
import { apiService, postValidateTransfer } from '@utils';
import { useLoginStyles } from './auth/styles';

const TransactionOTP = ({ navigation, route }: VerifyOtpProps) => {
  const { data } = route.params;
  const [pin, setPin] = useState('');
  const [hasError, setHasError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useLoginStyles();

  const completeTransaction = async () => {
    setIsLoading(true);
    try {
      const response = await apiService(postValidateTransfer, 'post', {
        transferReference: data.transferReference,
        otp: pin,
      });
      console.log('verifyOtp', response);
      const { responseDescription } = response;
      setIsLoading(false);
      if (responseDescription === 'Successful') {
        navigation.navigate('transaction_success', {
          type: data.type,
        });
      } else {
        setHasError(responseDescription);
      }
    } catch (error: any) {
      console.log('verifyOtp ERR', error);
      setHasError(error.title);
      setIsLoading(false);
    }
  };

  // 'TransactionOTP DATA', { account:
  //   { verificationId: null,
  //     beneficiaryAccountNumber: '1100023453',
  //     beneficiaryAccountName: 'ROUTEPAY/Mum Dozie QA',
  //     bankCode: null,
  //     bvn: null },
  //  remark: 'Enjoy',
  //  amount: '6500',
  //  responseCode: 'RBP-010',
  //  responseDescription: 'Validation Expected',
  //  transferReference: '5316751449475929230',
  //  merchantReference: '235466776',
  //  type: 'payment' }

  const resendOtp = async () => {
    console.log('sendinf.....');
  };

  return (
    <BackgroundView hasBack>
      <Loader show={isLoading} />
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="Transfer Verification!" />
          <RegularText
            size={14}
            text="Enter the 6-digit code sent to your registered phone number to confirm this transaction"
            style={styles.otpLabel}
          />
          {!!hasError && (
            <RegularText
              size={12}
              text={hasError}
              color="red"
              style={styles.errorText}
            />
          )}
          <OTPInput
            setCode={setPin}
            onResend={resendOtp}
            shouldResend={false}
          />
        </View>
        <Button
          text="Confirm Transaction"
          disabled={!pin}
          onPress={completeTransaction}
        />
      </View>
    </BackgroundView>
  );
};
export default TransactionOTP;
