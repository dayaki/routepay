import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ms } from '@utils';

export const ViewWrapper = ({ children }) => {
  const styles = useStyles();
  return <View style={styles.wrapper}>{children}</View>;
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingTop: ms(60),
      backgroundColor: colors.background,
    },
  });
};
