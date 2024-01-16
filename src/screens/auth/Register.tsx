import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLoginStyles } from './styles';
import { Button, Input, RegularText, TextButton, TitleText } from '@common';
import { BackArrow, Lock, Mail, PhoneIcon, UserIcon } from '@icons';
import { RegisterNavProps } from '@types';
import {
  PutActivateAccount,
  apiService,
  formatPhone,
  openLink,
  passwordTests,
  postRegister,
} from '@utils';
import { useToast } from 'react-native-toast-notifications';

const Register = ({ navigation, route }: RegisterNavProps) => {
  const error = route.params?.error;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [errors, setErrors] = useState(error?.message);
  const styles = useLoginStyles();
  const toast = useToast();

  console.log('error.payload', error);

  const handleBlur = () => {
    if (
      !!email &&
      !!name &&
      phone.length === 11 &&
      !!password &&
      password.length > 5
    ) {
      setHasErrors(false);
      setPhoneError('');
    } else {
      setHasErrors(true);
      if (phone.length < 11) {
        setPhoneError('Phone number must be 11 digits.');
      } else if (phone.length === 11) {
        setPhoneError('');
      }
    }
    console.log('phone len', phone.length);
  };

  const verifyPassword = () => {
    if (password.length > 0) {
      const { length, lowercase, number, special, uppercase } =
        passwordTests(password);
      if (length && lowercase && number && special && uppercase) {
        setPasswordError('');
        handleBlur();
      } else {
        setPasswordError(
          'Password requires uppercase, alphanumeric and special characters.',
        );
        setHasErrors(true);
      }
    } else {
      setPasswordError('');
      handleBlur();
    }
  };

  const goVerify = () => {
    setIsLoading(true);
    if (!error) {
      const payload = {
        email,
        phoneNumber: formatPhone(phone),
        password: password,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        status: true,
      };
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('phone_verification', { payload });
      }, 1000);
    } else if (error && `${formatPhone(phone)}` !== error.payload.phoneNumber) {
      const payload = {
        email,
        phoneNumber: formatPhone(phone),
        password: password,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        status: true,
      };
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('phone_verification', { payload });
      }, 1000);
    } else {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    try {
      const payload = {
        email,
        phoneNumber: formatPhone(phone),
        password: password,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        status: true,
      };
      const resp = await apiService(postRegister, 'post', payload);
      const { id, message, succeeded } = resp;
      if (succeeded) {
        const sub = JSON.parse(id);
        console.log('JSON.parse', sub);
        await apiService(PutActivateAccount(id), 'put');
        navigation.navigate('welcome', { name: payload.firstName });
      } else {
        let errorMessage: string = '';
        if (message.toLowerCase().includes('duplicate email')) {
          errorMessage = 'Your email address is already in use!';
        } else if (message.toLowerCase().includes('duplicate phone')) {
          errorMessage = 'Your phone number is already in use!';
        } else if (
          message.includes('PasswordTooShort,PasswordRequiresNonAlphanumeric')
        ) {
          errorMessage = 'Password requires special characters and uppercase.';
        } else {
          errorMessage = message;
        }
        setErrors(errorMessage);
        toast.show(errorMessage, {
          type: 'warning',
        });
      }
    } catch (err) {
      setErrors('Network error, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.register}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
      </View>
      <View>
        <TitleText text="Create an account" />
        <View style={styles.texts}>
          <Text style={styles.label}>
            Hey there! Enter your details below to begin your journey with{' '}
            <Text style={styles.brandName}>routepay</Text>.
          </Text>
        </View>
        {(!!errors || error) && (
          <RegularText
            text={errors || error.message}
            color="red"
            size={13}
            style={{ marginBottom: 20, marginTop: -20 }}
          />
        )}
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Your BVN full name"
          onBlur={handleBlur}
          leftIcon={<UserIcon size={16} />}
        />
        <Input
          value={phone}
          onChangeText={setPhone}
          maxLength={11}
          onBlur={handleBlur}
          placeholder="Your BVN mobile number"
          keyboardType="number-pad"
          leftIcon={<PhoneIcon />}
          hasError={!!phoneError}
          errorMessage={phoneError}
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
          value={password}
          onChangeText={setPassword}
          onBlur={verifyPassword}
          placeholder="Password"
          isPassword
          hasError={!!passwordError}
          errorMessage={passwordError}
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
          onPress={goVerify}
          style={styles.loginBtn}
        />
        <View style={styles.finePrint}>
          <Text style={styles.fineText}>
            By proceeding, you agree to our{' '}
            <Text
              style={styles.fineTextBold}
              onPress={() => openLink('https://routepay.com/terms/')}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              style={styles.fineTextBold}
              onPress={() => openLink('https://routepay.com/privacy/')}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        <View style={[styles.row, { marginBottom: 30 }]}>
          <RegularText text="Have an account? " />
          <TextButton
            text="Log In"
            onPress={() => navigation.navigate('login')}
            textStyle={styles.brand}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
