import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { Black } from './Colors';
import { ms } from '@utils';
import { RegularText } from './Text';
import { TextButton } from './Button';
import { CheckMark, EyeIcon } from '@icons';

interface InputProps extends TextInputProps {
  label?: string;
  value: string;
  placeholder: string;
  leftIcon?: any;
  rightIcon?: any;
  inputStyle?: any;
  hasError?: boolean;
  errorMessage?: string;
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
  inputStyle,
  leftIcon,
  isPassword,
  hasError,
  errorMessage,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(isPassword);

  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <>
      <View style={styles.inputWrapper}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          value={value}
          secureTextEntry={showPassword}
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          {...props}
        />
        {isPassword && showPassword && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIcon}>
            <EyeIcon size={16} />
          </TouchableOpacity>
        )}
      </View>
      {hasError && (
        <RegularText
          text={errorMessage || ''}
          size={11}
          style={styles.errorText}
        />
      )}
    </>
  );
};

export const OTPInput = ({
  secure,
  onResend,
  setCode,
}: {
  secure?: boolean;
  onResend: () => void;
  setCode: (otp: string) => void;
}) => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const otpRef = useRef<OTPInputView>(null);
  const styles = useStyles();
  const { colors } = useTheme();

  useEffect(() => {
    intervalRef.current = setInterval(() => timeInterval(), 1000);
    if (otpRef.current) {
      setTimeout(() => {
        otpRef?.current?.focusField(0);
      }, 500);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(intervalRef.current);
        setCanResend(true);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
        setCanResend(false);
      }
    }
  }, [seconds, minutes]);

  const timeInterval = () => {
    if (seconds > 0) {
      setSeconds(prevSeconds => {
        return prevSeconds - 1;
      });
    }
  };

  const resendCode = async () => {
    onResend();
    intervalRef.current = setInterval(() => timeInterval(), 1000);
    setCanResend(false);
  };

  return (
    <View style={styles.otpWrapper}>
      <OTPInputView
        ref={otpRef}
        secureTextEntry={secure}
        pinCount={6}
        codeInputFieldStyle={styles.otpInput}
        codeInputHighlightStyle={styles.otpInputFocus}
        selectionColor={colors.text}
        onCodeFilled={setCode}
      />
      <View style={styles.countdown}>
        {canResend ? (
          <>
            <RegularText text="Didn’t receive a code? " />
            <TextButton
              text="Resend code"
              color={colors.primary}
              onPress={resendCode}
            />
          </>
        ) : (
          <>
            <RegularText text="Resend code in " />
            <RegularText
              text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            />
          </>
        )}
      </View>
    </View>
  );
};

export const Checkbox = ({
  onPress,
  isChecked,
  text,
  textStyle,
}: {
  text?: string;
  isChecked: boolean;
  textStyle?: any;
  onPress: (isChecked: boolean) => void;
}) => {
  const { colors } = useTheme();
  const styles = useStyles();
  const scheme = useColorScheme();
  return (
    <BouncyCheckbox
      onPress={onPress}
      disableBuiltInState
      isChecked={isChecked}
      disableText={!text}
      text={text}
      innerIconStyle={styles.checkbox}
      fillColor={colors.selector}
      textStyle={[styles.textStyle, textStyle]}
      checkIconImageSource={
        scheme === 'dark'
          ? require('@images/checkmark.png')
          : require('@images/checkmark_dark.png')
      }
    />
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    checkbox: {
      borderColor: colors.inputColor,
    },
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
      width: '100%',
      // width: ms(350),
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
      padding: ms(10),
      position: 'absolute',
      right: ms(30),
    },
    textStyle: {
      textDecorationLine: 'none',
      color: colors.inputColor,
      fontSize: 14,
      fontFamily: 'DMSans-Regular',
    },
    errorText: {
      color: '#FF0000',
      marginTop: ms(-10),
      marginBottom: ms(20),
    },
  });
};
