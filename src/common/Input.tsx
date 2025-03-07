import React, { useState, useEffect, useRef } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { capitalize } from 'lodash';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { getName, ms } from '@utils';
import { RegularText, TitleText } from './Text';
import { TextButton } from './Button';
import { ChevronDown, EyeClose, EyeIcon, Lock } from '@icons';
import { DataModal, NetworkModal, SelectModal } from './Modal';
import { ProviderIcon } from './View';
import { IsBillProvider, IsDataPlan } from '@types';
import { useAppSelector } from '@store';
import { useTheme } from './Colors';
import moment from 'moment';
import { VirtualTransactionPIN } from './Keyboard';

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
  ref?: any;
}

interface SelectProps {
  label: string;
  selected: IsBillProvider | undefined;
  data: IsBillProvider[];
  title: string;
  largeIcon?: boolean;
  onSelect: (data: IsBillProvider) => void;
}

export const Input = React.forwardRef(
  (
    {
      value,
      onChangeText,
      placeholder,
      inputStyle,
      leftIcon,
      rightIcon,
      isPassword,
      hasError,
      errorMessage,
      ...props
    }: InputProps,
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(isPassword);

    const styles = useStyles();
    const { colors } = useTheme();
    return (
      <>
        <View style={styles.inputWrapper}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={colors.text}
            value={value}
            secureTextEntry={showPassword}
            onChangeText={onChangeText}
            style={[styles.input, inputStyle]}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowPassword(!showPassword)}
              style={styles.rightIcon}>
              {showPassword ? <EyeIcon size={16} /> : <EyeClose size={16} />}
            </TouchableOpacity>
          )}
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
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
  },
);

export const TextArea = ({
  value,
  onChangeText,
  placeholder,
  inputStyle,
  ...props
}: InputProps) => {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <>
      <View style={[styles.inputWrapper, styles.textarea]}>
        <TextInput
          multiline
          textAlignVertical="top"
          numberOfLines={5}
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, styles.textarea, inputStyle]}
          {...props}
        />
      </View>
    </>
  );
};

export const Select = ({
  label,
  selected,
  onSelect,
  title,
  data,
  selector,
  useLabel,
  noName,
  onSelection,
  onSearch,
  canSearch,
}: {
  label: string;
  selected: any;
  title: string;
  useLabel?: string;
  data: [] | undefined;
  onSelect: (item: any) => void;
  onSelection: (item: any) => void;
  onSearch?: (item: string) => void;
  selector: string;
  noName?: boolean;
  canSearch?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const styles = useStyles();
  const { colors } = useTheme();

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };
  return (
    <>
      <SelectModal
        selector={selector}
        data={data}
        title={title}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={onSelect}
        selected={selected}
        onSelection={onSelection}
        noName={noName}
        canSearch={canSearch}
        searchText={searchText}
        setSearchText={handleSearch}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.select]}
        onPress={() => setShowModal(true)}>
        <RegularText
          text={selected ? capitalize(selected[selector]) : label}
          size={14}
          color={colors.inputColor}
        />
        <ChevronDown size={8} />
      </TouchableOpacity>
    </>
  );
};

export const NetworkSelect = ({
  label,
  selected,
  onSelect,
  data,
  title,
  largeIcon,
}: SelectProps) => {
  const [showModal, setShowModal] = useState(false);
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <>
      <NetworkModal
        title={title}
        data={data}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={onSelect}
        selectedNetwork={selected}
        largeIcon={largeIcon}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.select]}
        onPress={() => setShowModal(true)}>
        {selected ? (
          <View style={styles.row}>
            <ProviderIcon name={getName(selected?.billCode).toLowerCase()} />
            <TitleText
              text={capitalize(getName(selected?.billCode))}
              size={14}
              color={colors.inputColor}
            />
          </View>
        ) : (
          <RegularText text={label} size={14} color={colors.inputColor} />
        )}
        <ChevronDown size={8} />
      </TouchableOpacity>
    </>
  );
};

export const DataSelect = ({
  label,
  selectedNetwork,
  onSelect,
  title,
  networkName,
  data,
  selectedPlan,
}: {
  title: string;
  label: string;
  selectedPlan: any;
  selectedNetwork: IsDataPlan | undefined;
  networkName: string;
  data: IsDataPlan[];
  onSelect: (text: IsDataPlan) => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <>
      <DataModal
        data={data}
        title={title}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={onSelect}
        selectedNetwork={selectedPlan}
        networkName={networkName}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.select]}
        onPress={() => setShowModal(true)}>
        <RegularText
          text={selectedNetwork?.dataName || label}
          size={14}
          color={colors.inputColor}
        />
        <ChevronDown size={8} />
      </TouchableOpacity>
    </>
  );
};

export const OTPInput = ({
  secure,
  onResend,
  setCode,
  onVoiceCall,
  isEmail = true,
  shouldResend = true,
}: {
  secure?: boolean;
  onResend: () => void;
  setCode: (otp: string) => void;
  onVoiceCall?: () => void;
  isEmail?: boolean;
  shouldResend?: boolean;
}) => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const otpRef = useRef<OTPInputView>();
  const styles = useStyles();
  const { colors } = useTheme();

  useEffect(() => {
    intervalRef.current = setInterval(() => timeInterval(), 1000);
    if (otpRef.current) {
      setTimeout(() => {
        otpRef?.current?.focusField(0);
      }, 100);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        // clearInterval(intervalRef.current);
        setCanResend(true);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
        setCanResend(false);
      }
    }
  }, [seconds, minutes]);

  const resetTimer = () => {
    setSeconds(59);
  };

  const timeInterval = () => {
    if (seconds > 0) {
      setSeconds(prevSeconds => {
        return prevSeconds - 1;
      });
    }
  };

  const resendCode = async () => {
    resetTimer();
    onResend();
    setCanResend(false);
  };

  const voiceCall = async () => {
    if (onVoiceCall) {
      onVoiceCall();
    }
    resetTimer();
    setCanResend(false);
  };

  return (
    <View style={styles.otpWrapper}>
      <OTPInputView
        ref={otpRef}
        autoFocusOnLoad
        secureTextEntry={secure}
        pinCount={6}
        codeInputFieldStyle={styles.otpInput}
        codeInputHighlightStyle={styles.otpInputFocus}
        selectionColor={colors.text}
        onCodeFilled={setCode}
      />
      {shouldResend && (
        <>
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
          {canResend && !isEmail && (
            <View
              style={[styles.row, { justifyContent: 'center', marginTop: 20 }]}>
              <TextButton
                text="Get OTP code via voice call"
                color={colors.primary}
                onPress={voiceCall}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export const VirtualOTPInput = ({
  onResend,
  code,
  setCode,
  onVoiceCall,
  isEmail = true,
  shouldResend = true,
}: {
  code: string;
  secure?: boolean;
  onResend: () => void;
  setCode: (otp: string) => void;
  onVoiceCall?: () => void;
  isEmail?: boolean;
  shouldResend?: boolean;
}) => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const styles = useStyles();
  const { colors } = useTheme();

  useEffect(() => {
    intervalRef.current = setInterval(() => timeInterval(), 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        // clearInterval(intervalRef.current);
        setCanResend(true);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
        setCanResend(false);
      }
    }
  }, [seconds, minutes]);

  const resetTimer = () => {
    setSeconds(59);
  };

  const timeInterval = () => {
    if (seconds > 0) {
      setSeconds(prevSeconds => {
        return prevSeconds - 1;
      });
    }
  };

  const resendCode = async () => {
    resetTimer();
    onResend();
    setCanResend(false);
  };

  const voiceCall = async () => {
    if (onVoiceCall) {
      onVoiceCall();
    }
    resetTimer();
    setCanResend(false);
  };

  return (
    <View style={styles.otpWrapper}>
      <VirtualTransactionPIN
        renderView={() =>
          shouldResend && (
            <View style={styles.wrapper}>
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
                      text={`${minutes}:${
                        seconds < 10 ? `0${seconds}` : seconds
                      }`}
                    />
                  </>
                )}
              </View>
              {canResend && !isEmail && (
                <View
                  style={[
                    styles.row,
                    { justifyContent: 'center', marginTop: 20 },
                  ]}>
                  <TextButton
                    text="Get OTP code via voice call"
                    color={colors.primary}
                    onPress={voiceCall}
                  />
                </View>
              )}
            </View>
          )
        }
        pin={code}
        setPin={setCode}
        handleSubmit={setCode}
      />
    </View>
  );
};

export const Checkbox = ({
  onPress,
  isChecked,
  text,
  textStyle,
  disabled,
}: {
  text?: string;
  isChecked: boolean;
  textStyle?: any;
  disabled?: boolean;
  onPress: (isChecked: boolean) => void;
}) => {
  const { theme } = useAppSelector(state => state.misc);
  const { colors } = useTheme();
  const styles = useStyles();
  return (
    <BouncyCheckbox
      disabled={disabled}
      onPress={onPress}
      disableBuiltInState
      isChecked={isChecked}
      disableText={!text}
      text={text}
      innerIconStyle={styles.checkbox}
      fillColor={colors.primary}
      textStyle={[styles.textStyle, textStyle]}
      checkIconImageSource={
        theme === 'dark'
          ? require('@images/checkmark.png')
          : require('@images/checkmark_dark.png')
      }
    />
  );
};

export const DatePicker = ({
  placeholder,
  value,
  onSelect,
}: {
  placeholder: string;
  value: Date | null;
  onSelect: (data: Date) => void;
}) => {
  const [openDate, setOpenDate] = useState(false);
  const styles = useStyles();
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.inputWrapper}
        onPress={() => setOpenDate(true)}>
        <RegularText
          text={value ? moment(value).format('MMMM Do, YYYY') : placeholder}
          size={14}
        />
        <View style={styles.rightIcon}>
          <Lock />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={openDate}
        isDarkModeEnabled={false}
        maximumDate={new Date()}
        mode="date"
        onConfirm={(newDate: Date) => {
          onSelect(newDate);
          setOpenDate(false);
        }}
        onCancel={() => setOpenDate(false)}
      />
    </>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    wrapper: {
      marginTop: -10,
      marginBottom: ms(30),
    },
    checkbox: {
      borderColor: colors.inputColor,
      // backgroundColor: 'red',
    },
    otpWrapper: {
      height: ms(60),
    },
    otpInput: {
      width: ms(50),
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
    spread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countdown: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginTop: ms(30),
      alignSelf: 'center',
    },
    inputWrapper: {
      backgroundColor: colors.input,
      width: '100%',
      height: ms(54),
      marginBottom: ms(20),
      borderRadius: ms(8),
      paddingHorizontal: ms(15),
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      color: colors.text,
      fontFamily: 'DMSans-Regular',
      fontSize: 14,
      height: '100%',
      width: ms(260),
      // width: '84%',
      // backgroundColor: 'pink',
    },
    textareaWrapper: {
      height: ms(150),
      paddingTop: ms(15),
    },
    textarea: {
      paddingTop: ms(15),
      height: ms(150),
    },
    select: {
      backgroundColor: colors.input,
      width: '100%',
      height: ms(54),
      marginBottom: ms(20),
      borderRadius: ms(8),
      paddingLeft: ms(15),
      paddingRight: ms(25),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      paddingVertical: ms(10),
      position: 'absolute',
      right: ms(14),
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
