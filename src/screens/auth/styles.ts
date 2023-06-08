import { StyleSheet } from 'react-native';
import { White, useTheme } from '@common';
import { ms } from '@utils';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    waves: {
      width: '100%',
      height: ms(461),
      left: 0,
      position: 'relative',
      zIndex: 50,
    },
    slider: {
      position: 'absolute',
      zIndex: 100,
      width: '90%',
      alignSelf: 'center',
    },
    slide: {
      width: '100%',
      alignSelf: 'center',
    },
    imageWraper: {
      width: ms(340),
      height: ms(430),
      marginBottom: ms(20),
      alignSelf: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: ms(20),
      alignSelf: 'center',
    },
    title: {
      textAlign: 'center',
      lineHeight: 30,
      marginBottom: ms(40),
    },
    pagination: {
      position: 'absolute',
      bottom: 180,
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
    },
    paginationDot: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(6),
      borderWidth: 0.5,
      borderColor: colors.pagination,
      backgroundColor: 'transparent',
      marginRight: ms(5),
    },
    paginationDotActive: {
      backgroundColor: colors.pagination,
    },
    buttons: {
      marginTop: ms(40),
    },
    registerBtn: {
      marginBottom: ms(10),
    },
    welcomeTitle: {
      textAlign: 'center',
      lineHeight: 30,
      width: '80%',
      alignSelf: 'center',
      marginBottom: ms(20),
    },
    welcomeText: {
      fontSize: 14,
      lineHeight: 25,
      color: colors.text,
      textAlign: 'center',
      marginBottom: ms(30),
    },
    bold: {
      fontWeight: '700',
    },
    brand: {
      fontWeight: '700',
      color: colors.primary,
    },
  });
};

export const useLoginStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: ms(50),
    },
    title: {
      marginBottom: ms(10),
    },
    texts: {
      marginTop: ms(10),
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: ms(40),
    },
    label: {
      fontFamily: 'DMSans-Regular',
      fontSize: 16,
      color: colors.text,
      lineHeight: 25,
    },
    brandName: {
      fontFamily: 'DMSans-Bold',
      fontWeight: '700',
      fontSize: 14,
      color: colors.primary,
      lineHeight: 25,
    },
    loginBtn: {
      marginVertical: ms(20),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    resetBtn: {
      fontSize: 14,
      marginLeft: 4,
      // color: colors.,
    },
    brand: {
      color: colors.primary,
    },
    forgotLabel: {
      marginTop: ms(10),
      marginBottom: ms(40),
      lineHeight: 25,
    },
    otpLabel: {
      marginTop: ms(10),
      marginBottom: ms(30),
      textAlign: 'center',
    },
    centeredTexts: {
      alignItems: 'center',
    },
    indicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: ms(30),
    },
    pinDot: {
      width: ms(11),
      height: ms(11),
      borderRadius: 6,
      marginRight: ms(7),
      backgroundColor: colors.input,
    },
    forgotPinBtn: {
      alignSelf: 'center',
    },
    forgotPinBtnText: {
      color: colors.primary,
    },
  });
};
