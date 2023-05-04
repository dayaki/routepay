import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Primary, White } from './Colors';
import { ms } from '@utils';

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
  textOnly?: boolean;
  onPress: () => void;
}

export const Button = ({
  text,
  onPress,
  isLoading,
  style,
  textStyle,
  disabled,
  textOnly,
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
        style,
        disabled && styles.disabledBtn,
        textOnly && styles.textOnly,
      ]}
      onPress={handlePress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={White} />
      ) : (
        <Text style={[styles.btnText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Primary,
    width: '100%',
    height: ms(54),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOnly: {
    backgroundColor: 'transparent',
  },
  disabledBtn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  btnText: {
    color: White,
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
  },
});
