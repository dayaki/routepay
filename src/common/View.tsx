import React from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native-bars';
import { ms } from '@utils';
import { BackArrow } from '@icons';

export const ViewWrapper = ({ children }: { children: any }) => {
  const scheme = useColorScheme();
  const styles = useStyles();
  return (
    <>
      <StatusBar
        animated={true}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.viewWrapper}>{children}</View>
    </>
  );
};

export const BackgroundView = ({
  hasBack,
  children,
}: {
  hasBack?: boolean;
  children: any;
}) => {
  const navigation = useNavigation();
  const styles = useStyles();
  return (
    <View style={styles.wrapper}>
      {hasBack && (
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => navigation.goBack()}>
            <BackArrow />
          </TouchableOpacity>
        </View>
      )}
      {children}
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    viewWrapper: {
      flex: 1,
      paddingTop: ms(60),
      backgroundColor: colors.background,
    },
    wrapper: {
      flex: 1,
      paddingTop: ms(60),
      paddingHorizontal: ms(20),
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: ms(40),
    },
  });
};
