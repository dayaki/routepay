import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';
import { Black } from './Colors';
import { ms } from '@utils';

interface InputProps extends TextInputProps {
  label?: string;
  value: string;
  placeholder: string;
  onChangeText: (val: string) => void;
  keyboardType?: 'number-pad' | 'default' | 'email-address';
  capitalize?: 'sentences' | 'none' | 'words' | 'characters' | undefined;
  isPassword?: boolean;
}

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  ...props
}: InputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.placeholder}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Black}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: ms(20),
  },
  input: {
    color: Black,
    fontFamily: 'Causten-Regular',
    fontSize: 16,
    width: '100%',
    height: ms(46),
    borderRadius: ms(8),
    borderColor: Black,
    borderWidth: 1,
    paddingLeft: 16,
    backgroundColor: 'transparent',
  },
  placeholder: {
    opacity: 0.6,
    fontSize: 14,
    marginBottom: ms(6),
  },
});
