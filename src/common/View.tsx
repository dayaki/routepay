import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native-bars';
import { getImage, ms, nairaFormat } from '@utils';
import { BackArrow, ChevronBack, Exclamation } from '@icons';
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
  color,
}: {
  title: string;
  hideBalance?: boolean;
  centered?: boolean;
  color?: string;
}) => {
  const { wallet } = useAppSelector(state => state.user);
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
          <ChevronBack color="#15151A" />
        </TouchableOpacity>
      )}
      <TitleText text={title} color={woodsmoke} />
      {!hideBalance && (
        <View style={styles.walletBalance}>
          <RegularText text="Your wallet balance: " size={11} color="#15151A" />
          <TitleText
            text={nairaFormat(wallet.balance)}
            size={11}
            color={color || '#15151A'}
          />
        </View>
      )}
    </View>
  );
};

export const InfoBox = ({ text }) => {
  const styles = useStyles();
  return (
    <View style={styles.reviewInfo}>
      <Exclamation />
      <RegularText text={text} size={14} style={styles.reviewInfoText} />
    </View>
  );
};

export const UserAvatar = ({
  label,
  hideAvatar = false,
}: {
  label: string;
  hideAvatar: boolean;
}) => {
  const { user } = useAppSelector(state => state.user);
  const styles = useStyles();
  return (
    <View style={styles.avatarWrapper}>
      {!hideAvatar && (
        <View style={styles.name}>
          <TitleText
            text={`${user?.firstName[0]}${user?.lastName[0]}`}
            size={25}
          />
        </View>
      )}
      <TitleText text={`${user?.firstName} ${user?.lastName}`} size={14} />
      <RegularText text={label} size={11} style={{ opacity: 0.6 }} />
    </View>
  );
};

export const TextCounter = ({ text }: { text: string }) => {
  const styles = useStyles();
  return (
    <View>
      <RegularText text={`${text.length}/40`} size={14} style={styles.count} />
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    count: {
      color: colors.counter,
    },
    viewWrapper: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? ms(40) : ms(60),
      backgroundColor: colors.background,
    },
    wrapper: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? ms(40) : ms(60),
      paddingHorizontal: ms(20),
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Platform.OS === 'android' ? ms(20) : ms(40),
    },
    networkLogo: {
      width: ms(24),
      height: ms(24),
      marginRight: ms(8),
    },
    headerWrapper: {
      width: '100%',
      // height: ms(115),
      marginBottom: ms(20),
      backgroundColor: pink300,
      paddingTop: Platform.OS === 'android' ? ms(40) : ms(60),
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
    reviewInfo: {
      backgroundColor: colors.selector,
      paddingVertical: ms(16),
      paddingHorizontal: ms(20),
      marginBottom: ms(20),
      borderRadius: ms(8),
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewInfoText: {
      lineHeight: 25,
      color: colors.inputColor,
      marginLeft: ms(15),
    },
    avatarWrapper: {
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      width: ms(64),
      height: ms(64),
      borderRadius: ms(64 / 2),
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: ms(5),
    },
  });
};
