import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BackgroundView,
  Button,
  Loader,
  RegularText,
  TitleText,
  TransactionPIN,
} from '@common';
import { apiService, postCreateWallet, postSetPin } from '@utils';
import { accountSetUp, useAppDispatch, userLogin } from '@store';
import { useLoginStyles } from './styles';

const SetPIN = ({ navigation, route }) => {
  const { payload = null, password = '' } = route.params;
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useLoginStyles();
  const dispatch = useAppDispatch();

  const createPin = async () => {
    setIsLoading(true);
    try {
      const resp = await apiService(postSetPin, 'post', {
        pin: pin,
        password: password,
      });
      console.log('createPin', resp);
      createWallet();
    } catch (err) {
      console.log('createPin ERR', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createWallet = async () => {
    try {
      const resp = await apiService(postCreateWallet, 'post', {
        // externalId: payload.userId,
        // walletType: 'USER',
        externalId: payload.phoneNumber,
        walletType: 'USER',
        firstName: payload.firstName,
        lastName: payload.lastName,
        // bvn: payload.bvn,
        // gender: 0,
        // dob: payload.dob, //'1997-08-21',
        // //
        bvn: '12345678909',
        gender: 0,
        dob: '1997-08-21',
      });
      console.log('createWallet', resp);
      dispatch(accountSetUp(payload.userId));
      dispatch(userLogin(payload));
    } catch (error) {
      console.log('createWallet ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundView hasBack>
      <Loader show={isLoading} />
      <View style={styles.content}>
        <View style={styles.centeredTexts}>
          <TitleText text="Set up your wallet pin" />
          <RegularText
            size={14}
            text="Create your wallet pin to securely confirm your transactions"
            style={styles.otpLabel}
          />
          <TransactionPIN handleSubmit={setPin} external />
        </View>
        <Button disabled={!pin} text="Continue" onPress={createPin} />
      </View>
    </BackgroundView>
  );
};
export default SetPIN;
