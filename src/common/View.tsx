import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native-bars';
import { getImage, ms } from '@utils';
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

export const ProviderIcon = ({ name }: { name: string }) => {
  const styles = useStyles();
  return (
    <Image
      source={getImage(name)}
      resizeMode="cover"
      style={styles.networkLogo}
    />
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
    networkLogo: {
      width: ms(24),
      height: ms(24),
      marginRight: ms(8),
    },
  });
};
