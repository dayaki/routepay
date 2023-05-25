import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Close } from '@icons';
import { Loader, RegularText, TitleText, TransactionPIN } from '@common';
import { useStyles } from './styles';

const ChangePIN = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const verifyPin = async (pin: string) => {
    setIsLoading(true);
    console.log('pin verify', pin);
    setTimeout(() => {
      setIsLoading(false);
      setPage(2);
    }, 6000);
  };

  const changePin = async (pin: string) => {
    setIsLoading(true);
    console.log('pin verify', pin);
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
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
