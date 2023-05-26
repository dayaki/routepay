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
import { useLoginStyles } from './styles';
import { apiService, postSetPin } from '@utils';
import { accountSetUp, useAppDispatch, userLogin } from '@store';

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
      // dispatch(accountSetUp());
      // dispatch(userLogin(payload));
    } catch (err) {
      console.log('createPin ERR', err);
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
