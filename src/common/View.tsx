import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native-bars';
import { getImage, ms } from '@utils';
import { BackArrow, ChevronBack } from '@icons';
import { RegularText, TitleText } from './Text';
import { pink300, useTheme, woodsmoke } from './Colors';
import { useAppSelector } from '@store';

export const ViewWrapper = ({ children }: { children: any }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();
  return (
    <>
      <StatusBar
        animated={true}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
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

export const Header = ({
  title,
  centered,
  hideBalance,
}: {
  title: string;
  hideBalance?: boolean;
  centered?: boolean;
}) => {
  const styles = useStyles();
  const { goBack } = useNavigation();
  return (
    <View
      style={[
        styles.headerWrapper,
        centered && styles.centeredHeader,
        hideBalance && styles.paddedHeader,
      ]}>
      {centered && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backBtn, hideBalance && styles.backBtnHide]}
          onPress={goBack}>
          <ChevronBack />
        </TouchableOpacity>
      )}
      <TitleText text={title} color={woodsmoke} />
      {!hideBalance && (
        <View style={styles.walletBalance}>
          <RegularText text="Your wallet balance: " size={11} color="#15151A" />
          <TitleText text="N0.00" size={11} color="#15151A" />
        </View>
      )}
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
    networkLogo: {
      width: ms(24),
      height: ms(24),
      marginRight: ms(8),
    },
    headerWrapper: {
      width: '100%',
      // height: ms(115),
      marginBottom: ms(30),
      backgroundColor: pink300,
      paddingTop: ms(60),
      paddingLeft: ms(20),
      paddingBottom: ms(15),
    },
    centeredHeader: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    paddedHeader: {
      paddingBottom: ms(30),
    },
    walletBalance: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: ms(10),
    },
    backBtn: {
      position: 'absolute',
      left: ms(10),
      bottom: ms(35),
      paddingVertical: ms(10),
      paddingHorizontal: ms(20),
    },
    backBtnHide: {
      bottom: ms(25),
    },
  });
};
