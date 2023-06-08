import React, { useState } from 'react';
import { View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useLoginStyles } from './styles';
import { BackgroundView, Button, Input, RegularText, TitleText } from '@common';
import { Mail } from '@icons';
import { apiService, postForgotPass } from '@utils';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useLoginStyles();
  const toast = useToast();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const { succeeded, message } = await apiService(postForgotPass, 'post', {
        email,
      });
      console.log('forgot pass', succeeded);
      if (succeeded) {
        toast.show('Kindly check your email for the password reset link.');
      } else {
        toast.show(message, { type: 'warning' });
      }
      // navigation.navigate('reset_password')
    } catch (error) {
      console.log('forgot pass ERR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundView hasBack>
      <View style={styles.content}>
        <View>
          <TitleText text="Forgot your password" />
          <RegularText
            text="Enter your email address or mobile number below, and we’ll send you a 6-digit code."
            style={styles.forgotLabel}
          />
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="Email or mobile number"
            leftIcon={<Mail />}
          />
        </View>
        <View style={styles.row}>
          <Button
            text="Continue"
            disabled={!email}
            isLoading={isLoading}
            onPress={onSubmit}
            style={styles.loginBtn}
          />
        </View>
      </View>
    </BackgroundView>
  );
};

export default ForgotPassword;
