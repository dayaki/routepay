import React, { useState } from 'react';
import { View } from 'react-native';
import { useLoginStyles } from './styles';
import { BackgroundView, Button, Input, RegularText, TitleText } from '@common';
import { Lock } from '@icons';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const styles = useLoginStyles();

  return (
    <BackgroundView hasBack>
      <View style={styles.content}>
        <View>
          <TitleText text="Reset your password" />
          <RegularText
            text="Enter your new password below"
            style={styles.forgotLabel}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="New password"
            isPassword
            leftIcon={<Lock />}
          />
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            isPassword
            leftIcon={<Lock />}
          />
        </View>
        <View style={styles.row}>
          <Button text="Continue" onPress={() => {}} style={styles.loginBtn} />
        </View>
      </View>
    </BackgroundView>
  );
};

export default ResetPassword;
