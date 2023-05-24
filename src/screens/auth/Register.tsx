import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLoginStyles } from './styles';
import {
  BackgroundView,
  Button,
  Input,
  Loader,
  RegularText,
  TextButton,
  TitleText,
} from '@common';
import { Lock, Mail, PhoneIcon, UserIcon } from '@icons';
import { AuthNavigationProps } from '@types';
import { apiService, postRegister } from '@utils';
import { useToast } from 'react-native-toast-notifications';
import { useMutation } from '@tanstack/react-query';
import { createUserFn, registerUser } from '../../api/auth';

const Register = ({ navigation, route }: AuthNavigationProps) => {
  const { error } = route.params || false;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(true);
  const [errors, setErrors] = useState(error);
  const styles = useLoginStyles();
  const toast = useToast();

  const handleBlur = () => {
    if (!!email && !!name && !!phone && !!password && password.length > 5) {
      setHasErrors(false);
    } else {
      setHasErrors(true);
    }
  };

  const goVerify = () => {
    setIsLoading(true);
    const payload = {
      email,
      phoneNumber: phone,
      password: password,
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      status: true,
    };
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('phone_verification', { payload });
    }, 5000);
  };

  const handleSignup = async () => {
    try {
      const payload = {
        email,
        phoneNumber: phone,
        password: password,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        status: true,
      };
      const resp = await apiService(postRegister, 'post', payload);
      const { message, succeeded } = resp;
      console.log('handleSignup', resp);
      if (succeeded) {
        console.log('successed', succeeded);
        navigation.navigate('welcome');
      } else {
        let errorMessage: string = '';
        if (message.includes('Duplicate Email')) {
          errorMessage = 'Your email address is already in use!';
        } else if (
          message.includes('PasswordTooShort,PasswordRequiresNonAlphanumeric')
        ) {
          errorMessage = 'Password requires special characters and uppercase.';
        }
        setErrors(errorMessage);
        toast.show(errorMessage, {
          type: 'warning',
        });
      }
      // {
      //   "id": "17124f37-eb88-44bf-a44c-e3a334931a49",
      //   "message": "Succeeded",
      //   "succeeded": true
      // }
    } catch (err) {
      console.log('handleSignup ERR', err);
    } finally {
      setIsLoading(false);
    }
  };

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
        {!!errors && (
          <RegularText
            text={errors}
            color="red"
            size={13}
            style={{ marginBottom: 10 }}
          />
        )}
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          onBlur={handleBlur}
          leftIcon={<UserIcon size={16} />}
        />
        <Input
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          onBlur={handleBlur}
          placeholder="Email address"
          keyboardType="email-address"
          leftIcon={<Mail size={14} />}
        />
        <Input
          value={phone}
          onChangeText={setPhone}
          maxLength={11}
          onBlur={handleBlur}
          placeholder="Mobile number"
          keyboardType="number-pad"
          leftIcon={<PhoneIcon />}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          onBlur={handleBlur}
          placeholder="Password"
          isPassword
          leftIcon={<Lock />}
        />
        <Input
          value={referral}
          onChangeText={setReferral}
          onBlur={handleBlur}
          placeholder="Referral Mobile (Optional)"
          keyboardType="number-pad"
          leftIcon={<PhoneIcon />}
        />
        <Button
          disabled={hasErrors}
          text="Create an account"
          isLoading={isLoading}
          onPress={error ? handleSignup : goVerify}
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
