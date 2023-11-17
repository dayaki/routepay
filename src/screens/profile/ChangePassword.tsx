import React, { useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Close } from '@icons';
import { Button, Input, Loader, TitleText } from '@common';
import { useStyles } from './styles';
import { apiService, passwordTests, putChangePassword } from '@utils';
import { useAppDispatch, useAppSelector, userLogout } from '@store';
import { useFocusEffect } from '@react-navigation/native';

const ChangePassword = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const styles = useStyles();
  const toast = useToast();
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('leaving screen.....');
        Keyboard.dismiss();
      };
    }, []),
  );

  const verifyPassword = () => {
    if (password.length > 0) {
      const { length, lowercase, number, special, uppercase } =
        passwordTests(password);
      if (length && lowercase && number && special && uppercase) {
        setHasError('');
      } else {
        setHasError(
          'Password requires uppercase, alphanumeric and special characters.',
        );
      }
    } else {
      setHasError('');
    }
  };

  const verifyConfirmPassword = () => {
    if (confirmPassword.length > 0) {
      const { length, lowercase, number, special, uppercase } =
        passwordTests(confirmPassword);
      if (length && lowercase && number && special && uppercase) {
        setHasError('');
      } else {
        setHasError(
          'Password requires uppercase, alphanumeric and special characters.',
        );
      }
    } else {
      setHasError('');
    }
  };

  const handleSubmit = async () => {
    if (password === confirmPassword) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const { succeeded, message } = await apiService(
          putChangePassword,
          'put',
          {
            userId: user?.userId,
            oldPassword: oldPassword,
            newPassword: password,
            confirmPassword: confirmPassword,
          },
        );
        console.log('chnage pass', message, succeeded);
        if (succeeded) {
          toast.show('Password changed successfully!');
          setTimeout(() => {
            dispatch(userLogout());
          }, 500);
        } else if (
          message.includes(
            'PasswordTooShort,PasswordRequiresNonAlphanumeric,PasswordRequiresUpper',
          )
        ) {
          setHasError('Password requires special characters and uppercase.');
        }
      } catch (error) {
        console.log('chnage pass ERR', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setHasError('Confirm Password does not match.');
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
          <TitleText
            text="Change Password"
            size={20}
            style={styles.contenttTitle}
          />
          <Input
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Current password"
            isPassword
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="New password"
            isPassword
            onBlur={verifyPassword}
          />
          <Input
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            isPassword
            onBlur={verifyConfirmPassword}
            hasError={!!hasError}
            errorMessage={hasError}
          />
          <TitleText
            text="NB. You will be logged out after changing your password."
            size={12}
            style={{ marginTop: -14, opacity: 0.5 }}
          />
        </View>
        <Button
          text="Change"
          isLoading={isLoading}
          onPress={handleSubmit}
          disabled={!oldPassword || !password || !confirmPassword || !!hasError}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
