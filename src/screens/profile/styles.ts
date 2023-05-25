import { StyleSheet } from 'react-native';
// import { useTheme } from '@react-navigation/native';
import { ms } from '@utils';
import { useTheme } from '@common';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    containerr: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: ms(20),
    },
    content: {
      paddingHorizontal: ms(20),
      justifyContent: 'space-between',
      paddingBottom: ms(40),
    },
    contentt: {
      flex: 1,
      paddingHorizontal: ms(20),
      justifyContent: 'space-between',
      marginTop: ms(18),
      paddingBottom: ms(40),
    },
    contenttTitle: {
      textAlign: 'center',
      marginBottom: ms(40),
    },
    textWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '80%',
      alignSelf: 'center',
    },
    contenttText: {
      fontSize: 14,
      lineHeight: 25,
      fontFamily: 'DMSans-Regular',
      color: colors.text,
      textAlign: 'center',
    },
    wrapper: {
      flex: 1,
    },
    banner: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.selector,
      paddingTop: ms(15),
      paddingBottom: ms(20),
      borderRadius: ms(8),
      marginBottom: ms(30),
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
    editBtn: {
      backgroundColor: colors.primary,
      paddingHorizontal: ms(17),
      paddingVertical: ms(7),
      borderRadius: ms(64),
      marginTop: ms(15),
    },
    listBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: ms(10),
      paddingVertical: ms(15),
      marginBottom: ms(15),
      borderBottomWidth: 0.3,
      borderBottomColor: colors.dash,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icon: {
      width: ms(30),
      height: ms(30),
      marginRight: ms(20),
    },
    imageEditBtn: {
      marginLeft: ms(10),
      justifyContent: 'center',
      alignItems: 'center',
      //   backgroundColor: 'pink',
      padding: ms(10),
    },
    footnote: {
      color: colors.inputColor,
      marginTop: ms(-10),
      opacity: 0.4,
    },
    inputBox: {
      marginBottom: ms(20),
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
    termsLink: {
      marginTop: 1,
      textDecorationColor: colors.inputColor,
      textDecorationLine: 'underline',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: ms(60),
    },
    backBtn: {
      alignSelf: 'flex-start',
      position: 'absolute',
      left: ms(10),
      bottom: 0,
      padding: ms(10),
    },
    scroll: {
      flex: 1,
      paddingTop: ms(20),
      paddingBottom: 160,
    },
    waves: {
      width: '100%',
      height: ms(421),
      left: 0,
      marginTop: ms(-28),
      position: 'relative',
      zIndex: 50,
    },
    slider: {
      position: 'absolute',
      zIndex: 100,
      width: '90%',
      alignSelf: 'center',
    },
    imageWraper: {
      width: ms(340),
      height: ms(341),
      marginBottom: ms(30),
      alignSelf: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: ms(20),
      alignSelf: 'center',
    },
    checkmark: {
      width: ms(64),
      height: ms(64),
      alignSelf: 'center',
      marginBottom: ms(20),
    },
    texts: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '70%',
      alignSelf: 'center',
      flexWrap: 'wrap',
      marginBottom: ms(-6),
    },
    welcomeTitle: {
      textAlign: 'center',
      lineHeight: 30,
      alignSelf: 'center',
      marginBottom: ms(10),
    },
    welcomeText: {
      fontSize: 11,
      lineHeight: 20,
      color: colors.text,
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: ms(30),
      width: '80%',
    },
  });
};
