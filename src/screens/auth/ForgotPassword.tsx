import React, { useState } from 'react';
import { View } from 'react-native';
import { useLoginStyles } from './styles';
import { BackgroundView, Button, Input, RegularText, TitleText } from '@common';
import { Mail } from '@icons';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const styles = useLoginStyles();

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
            value={email}
            onChangeText={setEmail}
            placeholder="Email or mobile number"
            leftIcon={<Mail />}
          />
        </View>
        <View style={styles.row}>
          <Button
            text="Continue"
            onPress={() => navigation.navigate('reset_password')}
            style={styles.loginBtn}
          />
        </View>
      </View>
    </BackgroundView>
  );
};

export default ForgotPassword;
