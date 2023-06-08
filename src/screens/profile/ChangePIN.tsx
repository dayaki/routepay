import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Close } from '@icons';
import {
  Loader,
  Primary,
  RegularText,
  TitleText,
  TransactionPIN,
} from '@common';
import { useStyles } from './styles';
import { apiService, postSetPin, postVerifyPin } from '@utils';

const ChangePIN = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const styles = useStyles();

  const verifyPin = async (pin: string) => {
    setIsLoading(true);
    try {
      const { status } = await apiService(postVerifyPin(pin), 'post', {
        params: { pin: pin },
      });
      console.log('verifyPin', status);
      if (status) {
        setPage(2);
      } else {
        setHasError('Invalid PIN. Check and try again.');
      }
    } catch (error) {
      console.log('verifyPin ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePin = async (pin: string) => {
    setIsLoading(true);
    try {
      const status = await apiService(postSetPin, 'post', {
        pin: pin,
        password: 'string',
      });
      console.log('changePin', status);
      // if (status) {
      //   setPage(2);
      // } else {
      //   setHasError('Invalid PIN. Check and try again.');
      // }
    } catch (error) {
      console.log('changePin ERR', error);
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
        </View>
      </View>
    </View>
  );
};

export default ChangePIN;
