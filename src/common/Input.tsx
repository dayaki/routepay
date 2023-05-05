import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Black } from './Colors';
import { ms } from '@utils';
import { RegularText } from './Text';
import { TextButton } from './Button';

interface InputProps extends TextInputProps {
  label?: string;
  value: string;
  placeholder: string;
  leftIcon?: any;
  rightIcon?: any;
  onChangeText: (val: string) => void;
  onPress?: () => void;
  keyboardType?: 'number-pad' | 'default' | 'email-address';
  capitalize?: 'sentences' | 'none' | 'words' | 'characters' | undefined;
  isPassword?: boolean;
}

export const Input = ({
  value,
  onChangeText,
  placeholder,
  leftIcon,
  rightIcon,
  isPassword,
  onPress,
  ...props
}: InputProps) => {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <View style={styles.inputWrapper}>
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text}
        value={value}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
        style={styles.input}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={styles.rightIcon}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export const OTPInput = ({ secure }: { secure?: boolean }) => {
  const [canResend, setCanResend] = useState(false);
  const styles = useStyles();
  const { colors } = useTheme();

  const resendCode = async () => {
    setCanResend(false);
  };
  return (
    <View style={styles.otpWrapper}>
      <OTPInputView
        secureTextEntry={secure}
        pinCount={6}
        codeInputFieldStyle={styles.otpInput}
        codeInputHighlightStyle={styles.otpInputFocus}
        selectionColor={colors.text}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />
      <View style={styles.countdown}>
        <RegularText text="Resend code in " />
        {canResend ? (
          <TextButton
            text="Resend code"
            color={colors.primary}
            onPress={resendCode}
          />
        ) : (
          <RegularText text="00:30" />
        )}
      </View>
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    otpWrapper: {
      height: ms(60),
    },
    otpInput: {
      width: ms(54),
      height: ms(54),
      borderRadius: ms(28),
      backgroundColor: colors.input,
      color: colors.text,
      borderColor: 'transparent',
      marginRight: ms(5),
    },
    otpInputFocus: {
      color: 'red',
    },
    countdown: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: ms(30),
      alignSelf: 'center',
    },
    inputWrapper: {
      backgroundColor: colors.input,
      width: ms(350),
      height: ms(54),
      marginBottom: ms(20),
      borderRadius: ms(8),
      paddingLeft: ms(15),
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      color: colors.text,
      fontFamily: 'DMSans-Regular',
      fontSize: 14,
      height: '100%',
      width: ms(260),
      backgroundColor: 'transparent',
    },
    icon: {
      // backgroundColor: 'pink',
      width: ms(16),
      height: ms(16),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: ms(15),
    },
    rightIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'pink',
      position: 'absolute',
      right: ms(20),
    },
  });
};
