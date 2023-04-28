import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { Black } from './Colors';

type TextProps = {
  text: string;
  size?: number;
  style?: TextStyle | TextStyle[];
};

export const TitleText = ({ text, size, style }: TextProps) => (
  <Text style={[styles.title, style, size ? { fontSize: size } : null]}>
    {text}
  </Text>
);

export const MediumText = ({ text, size, style }: TextProps) => (
  <Text style={[styles.medium, style, size ? { fontSize: size } : null]}>
    {text}
  </Text>
);

export const RegularText = ({ text, size, style }: TextProps) => (
  <Text style={[styles.regular, style, size ? { fontSize: size } : null]}>
    {text}
  </Text>
);

export const DoubleText = ({ text, style }: TextProps) => (
  <Text style={[styles.regular, style]}>{text}</Text>
);

const styles = StyleSheet.create({
  title: {
    color: Black,
    fontFamily: 'Causten-Bold',
    fontSize: 24,
  },
  medium: {
    color: Black,
    fontFamily: 'Causten-Medium',
    fontSize: 18,
    opacity: 0.7,
  },
  regular: {
    color: Black,
    fontFamily: 'Causten-Regular',
    fontSize: 16,
    opacity: 0.8,
  },
});
