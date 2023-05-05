import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useLoginStyles } from './styles';
import {
  BackgroundView,
  Button,
  Input,
  RegularText,
  TextButton,
  TitleText,
} from '@common';
import { Lock, Mail } from '@icons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const styles = useLoginStyles();

  const handleLogin = async () => {};

  return (
    <BackgroundView hasBack>
      <View style={styles.content}>
        <View>
          <TitleText text="Welcome back, Jane!" />
          <View style={styles.texts}>
            <Text style={styles.label}>
              Enter your email or mobile number to continue to your{' '}
              <Text style={styles.brandName}>routepay</Text> account.
            </Text>
          </View>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email or mobile number"
            leftIcon={<Mail />}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            isPassword
            leftIcon={<Lock />}
            rightIcon={<Mail />}
          />
          <Button text="Login" onPress={handleLogin} style={styles.loginBtn} />
          <View style={styles.row}>
            <RegularText text="Forgot Password? " />
            <TextButton
              text="Reset"
              onPress={() => navigation.navigate('forgot_password')}
            />
          </View>
        </View>
        <View style={styles.row}>
          <RegularText text="Don’t have an account? " />
          <TextButton
            text="Create an account"
            onPress={() => navigation.navigate('signup')}
            textStyle={styles.brand}
          />
        </View>
      </View>
    </BackgroundView>
  );
};

export default Login;
