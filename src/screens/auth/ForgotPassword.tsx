import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useLoginStyles } from './styles';
import { BackgroundView, Button, Input, RegularText, TitleText } from '@common';
import { Mail } from '@icons';
import { apiService, postForgotPass } from '@utils';
import { AuthNavigationProps } from '@types';

const ForgotPassword = ({ navigation }: AuthNavigationProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, sethasError] = useState('');
  const openRef = useRef<RBSheet>(null);
  const styles = useLoginStyles();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const { succeeded, message } = await apiService(postForgotPass, 'post', {
        email,
      });
      console.log('forgot pass', succeeded);
      if (succeeded) {
        openRef.current?.open();
      } else {
        sethasError(message);
      }
    } catch (error: any) {
      console.log('forgot pass ERR', error);
      sethasError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onContinue = () => {
    openRef.current?.close();
    navigation.navigate('login');
  };

  return (
    <BackgroundView hasBack>
      <View style={styles.content}>
        <View>
          <TitleText text="Forgot your password" />
          <RegularText
            text="Enter your email address or mobile number below, and we’ll email you link to reset your password."
            style={styles.forgotLabel}
          />
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            editable={!isLoading}
            onChangeText={setEmail}
            placeholder="Email or mobile number"
            leftIcon={<Mail />}
          />
          {!!hasError && (
            <RegularText
              text={hasError}
              size={14}
              style={styles.errorTextPass}
            />
          )}
        </View>
        <View style={styles.row}>
          <Button
            text="Continue"
            disabled={!email || isLoading}
            isLoading={isLoading}
            onPress={onSubmit}
            style={styles.loginBtn}
          />
        </View>
      </View>
      <RBSheet
        ref={openRef}
        height={280}
        closeOnPressBack={false}
        closeOnPressMask={false}
        closeOnDragDown={false}
        openDuration={250}
        customStyles={{
          container: styles.rbSheet,
        }}>
        <View>
          <TitleText text="Password Reset." size={24} />
          <RegularText
            text="We just send a password reset link to your email, open the link in your email to reset your password."
            size={14}
            style={styles.resetLabel}
          />
          <Button text="Continue" onPress={onContinue} />
        </View>
      </RBSheet>
    </BackgroundView>
  );
};

export default ForgotPassword;
