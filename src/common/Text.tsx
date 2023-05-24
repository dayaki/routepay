import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from './Colors';

type TextProps = {
  text: string;
  size?: number;
  color?: string;
  style?: {};
  // style?: TextStyle | TextStyle[];
};

export const TitleText = ({ text, size, style, color }: TextProps) => {
  const styles = useStyles();
  return (
    <Text
      style={[
        styles.title,
        style,
        size && { fontSize: size },
        color && { color: color },
      ]}>
      {text}
    </Text>
  );
};

export const MediumText = ({ text, size, style, color }: TextProps) => {
  const styles = useStyles();
  return (
    <Text
      style={[
        styles.medium,
        style,
        size && { fontSize: size },
        color && { color: color },
      ]}>
      {text}
    </Text>
  );
};

export const RegularText = ({ text, size, style, color }: TextProps) => {
  const styles = useStyles();
  return (
    <Text
      style={[
        styles.regular,
        style,
        size && { fontSize: size },
        color && { color: color },
      ]}>
      {text}
    </Text>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    title: {
      fontFamily: 'DMSans-Bold',
      fontWeight: '700',
      fontSize: 20,
      color: colors.text,
    },
    medium: {
      fontFamily: 'DMSans-Medium',
      fontSize: 18,
      color: colors.text,
    },
    regular: {
      fontFamily: 'DMSans-Regular',
      fontSize: 16,
      color: colors.text,
    },
  });
};
