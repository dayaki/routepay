import React, { useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { Close } from '@icons';
import { Button, Input, Loader, RegularText, TitleText } from '@common';
import { useStyles } from './styles';
import { apiService, postSetPin } from '@utils';
import { useToast } from 'react-native-toast-notifications';
import { useFocusEffect } from '@react-navigation/native';

const ChangePIN = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const [password, setPassword] = useState('');
  const [userPin, setuserPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const styles = useStyles();
  const toast = useToast();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('leaving screen.....');
        Keyboard.dismiss();
      };
    }, []),
  );

  const verifyPin = () => {
    if (userPin !== confirmPin) {
      setHasError('PIN and confirm PIN does not match.');
    } else {
      setHasError('');
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const { message, status } = await apiService(postSetPin, 'post', {
        pin: userPin,
        password: password,
      });
      if (status && message.includes('Succeeded')) {
        toast.show('Transaction PIN changed successfully.', {
          type: 'success',
        });
        navigation.goBack();
      } else {
        setHasError('Invalid password, check and try again.');
      }
      console.log('changePin', status);
    } catch (error) {
      console.log('changePin ERR', error);
      setHasError('Invalid password, check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.containerr}>
      <Loader show={isLoading} />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Close />
        </TouchableOpacity>
      </View>
      <View style={styles.contentt}>
        <View>
          <TitleText
            text="Change PIN"
            size={20}
            style={[styles.contenttTitle, { marginBottom: 15 }]}
          />
          <RegularText
            text="Change your transactional PIN"
            size={14}
            style={[
              styles.supportLabel,
              { textAlign: 'center', marginBottom: 60 },
            ]}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Your Password"
            isPassword
          />
          <Input
            value={userPin}
            onChangeText={setuserPin}
            keyboardType="number-pad"
            maxLength={4}
            placeholder="New PIN"
            returnKeyType="done"
          />
          <Input
            value={confirmPin}
            onChangeText={setConfirmPin}
            placeholder="Confirm New PIN"
            keyboardType="number-pad"
            maxLength={4}
            onBlur={verifyPin}
            returnKeyType="done"
            hasError={!!hasError}
            errorMessage={hasError}
          />
        </View>
        <Button
          text="Change PIN"
          onPress={handleSubmit}
          disabled={
            !password ||
            userPin.length !== 4 ||
            confirmPin.length !== 4 ||
            !!hasError
          }
        />
      </View>
    </View>
  );
};

export default ChangePIN;

{
  /* <View>
          {page === 1 && (
            <>
              <TitleText
                text="Change PIN"
                size={20}
                style={[styles.contenttTitle, { marginBottom: 15 }]}
              />
              <RegularText
                text="Please verify your current PIN"
                size={14}
                style={[
                  styles.supportLabel,
                  { textAlign: 'center', marginBottom: 60 },
                ]}
              />
              {!!hasError && (
                <RegularText text={hasError} size={11} color={Primary} />
              )}
            </>
          )}
          {page === 2 && (
            <>
              <TitleText
                text="Set a new PIN"
                size={20}
                style={[styles.contenttTitle, { marginBottom: 15 }]}
              />
              <RegularText
                text="Please enter a secure pin to complete all your transactions"
                size={14}
                style={[
                  styles.supportLabel,
                  {
                    textAlign: 'center',
                    marginBottom: 60,
                    width: '80%',
                    alignSelf: 'center',
                  },
                ]}
              />
            </>
          )}
          <TransactionPIN handleSubmit={page === 1 ? verifyPin : changePin} />
        </View> */
}
