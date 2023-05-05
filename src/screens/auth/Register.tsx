import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const styles = useLoginStyles();

  const handleSignup = async () => {};

  return (
    <BackgroundView hasBack>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <TitleText text="Create an account" />
        <View style={styles.texts}>
          <Text style={styles.label}>
            Hey there! Enter your details below to begin your journey with{' '}
            <Text style={styles.brandName}>routepay</Text>.
          </Text>
        </View>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          leftIcon={<Mail />}
        />
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          leftIcon={<Mail />}
        />
        <Input
          value={phone}
          onChangeText={setPhone}
          placeholder="Mobile number"
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
        <Input
          value={referral}
          onChangeText={setReferral}
          placeholder="Referral Mobile (Optional)"
          leftIcon={<Mail />}
        />
        <Button
          text="Create an account"
          onPress={handleSignup}
          style={styles.loginBtn}
        />
        <View style={styles.row}>
          <RegularText text="Have an account? " />
          <TextButton
            text="Log In"
            onPress={() => navigation.navigate('login')}
            textStyle={styles.brand}
          />
        </View>
      </KeyboardAwareScrollView>
    </BackgroundView>
  );
};

export default Register;
