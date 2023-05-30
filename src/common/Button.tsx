import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Primary, White, useTheme } from './Colors';
import { ms } from '@utils';

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
  textOnly?: boolean;
  textLink?: boolean;
  color?: string;
  size?: number;
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
  const styles = useStyles();
  const { colors } = useTheme();
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
        <Text
          style={[
            styles.btnText,
            { color: textOnly ? colors.text : 'white' },
            textStyle,
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const TextButton = ({
  text,
  onPress,
  style,
  textStyle,
  disabled,
  color,
  size,
}: ButtonProps) => {
  const styles = useStyles();

  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      style={[styles.textBtn, style]}
      onPress={handlePress}>
      <Text
        style={[
          styles.textBtnText,
          textStyle,
          size && { fontSize: size },
          color ? { color: color } : null,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    btn: {
      backgroundColor: Primary,
      width: '100%',
      height: ms(54),
      borderRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textBtn: {
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: ms(2),
    },
    textBtnText: {
      fontFamily: 'DMSans-Bold',
      fontWeight: '700',
      fontSize: 14,
      color: colors.text,
    },
    textOnly: {
      backgroundColor: 'transparent',
    },
    disabledBtn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    btnText: {
      color: colors.text,
      fontFamily: 'DMSans-Medium',
      fontSize: 14,
    },
  });
};
