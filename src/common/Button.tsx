import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Black } from './Colors';
import { ms } from '@utils';

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
  url?: string;
  blue?: boolean;
  onPress: () => void;
}

export const Button = ({
  text,
  onPress,
  isLoading,
  style,
  textStyle,
  blue,
  disabled,
}: ButtonProps) => {
  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      style={[
        styles.btn,
        blue && { backgroundColor: Black },
        style,
        disabled && styles.disabledBtn,
      ]}
      onPress={handlePress}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.btnText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#0F172A',
    width: '100%',
    height: ms(50),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  btnText: {
    color: '#fff',
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
  },
});
