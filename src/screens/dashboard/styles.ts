import { Platform, StyleSheet } from 'react-native';
import { ms } from '@utils';
import { useTheme } from '@common';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? ms(40) : ms(60),
      backgroundColor: colors.background,
    },
    contain: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: ms(20),
      justifyContent: 'space-between',
      paddingBottom: ms(40),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: ms(20),
      paddingBottom: ms(4),
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
    gender: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: ms(20),
    },
    genderBtn: {
      paddingVertical: ms(10),
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      flexDirection: 'row',
      borderColor: colors.pink300,
      borderWidth: 1,
    },
    genderText: {
      marginRight: ms(4),
    },
    genderIcon: {
      width: ms(18),
      height: ms(18),
      marginRight: ms(10),
    },
    dot: {
      width: ms(8),
      height: ms(8),
      borderRadius: ms(4),
      backgroundColor: 'green',
      // marginLeft: ms(10),
    },
    name: {
      width: ms(42),
      height: ms(42),
      borderRadius: ms(42 / 2),
      marginRight: ms(15),
      borderColor: colors.primary,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    countryFlag: {
      width: ms(25),
      height: ms(23),
      marginRight: ms(9),
    },
    notifyBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: ms(10),
      marginLeft: ms(16),
    },
    scroll: {
      paddingTop: ms(10),
    },
    padded: {
      paddingHorizontal: ms(20),
    },
    rbSheet: {
      backgroundColor: colors.background,
      borderRadius: ms(7),
      padding: ms(20),
      paddingTop: ms(30),
    },
    label: {
      marginTop: ms(10),
      marginBottom: ms(30),
    },
    input: {
      marginBottom: ms(20),
    },
    inputLabel: {
      marginBottom: ms(10),
    },
    dashboard: {
      // padding: ms(20),
      backgroundColor: '#1F1F23',
      borderRadius: ms(10),
      marginBottom: ms(20),
      height: ms(200),
    },
    dashboardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dashboardLabel: {
      marginBottom: ms(6),
      color: 'rgba(249, 247, 246, 0.6)',
      fontSize: 11,
      lineHeight: 15,
    },
    dashboardPoints: {
      marginTop: ms(15),
      marginBottom: ms(6),
      alignSelf: 'center',
      alignItems: 'center',
    },
    slide: {
      // paddingTop: ms(15),
      paddingVertical: ms(60),
      paddingRight: ms(20),
      paddingLeft: ms(10),
      width: ms(320),
    },
    pagination: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: ms(10),
    },
    paginationDot: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(10 / 2),
      marginRight: ms(5),
      borderColor: '#F9F7F6',
      borderWidth: 0.5,
    },
    activeDot: {
      backgroundColor: '#FF6600',
      borderColor: '#FF6600',
    },
    dashboardPoint: {
      textAlign: 'center',
      fontSize: 20,
      lineHeight: 30,
      color: '#FF6600',
    },
    refreshBtn: {
      width: ms(30),
      height: ms(30),
      borderRadius: ms(15),
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loyaltyBtn: {
      width: ms(30),
      height: ms(30),
    },
    quickLink: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      // backgroundColor: 'pink',
      width: '74%',
      marginBottom: ms(20),
    },
    boxIcon: {
      width: ms(30),
      height: ms(30),
      marginRight: ms(10),
      // marginBottom: ms(15),
    },
    links: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: ms(20),
      borderTopColor: colors.counter,
      borderTopWidth: 0.3,
    },
    link: {
      width: '23%',
      height: ms(78),
      borderRadius: ms(8),
      backgroundColor: colors.selector,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: ms(20),
    },
    linkImg: {
      width: ms(18),
      height: ms(16),
      marginBottom: ms(8),
    },
    adScroll: {
      paddingHorizontal: ms(20),
      marginBottom: ms(20),
    },
    adsBtn: {
      marginRight: ms(10),
    },
    adImage: {
      width: ms(309),
      height: ms(80),
      borderRadius: ms(8),
    },
    transactions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // paddingHorizontal: ms(20),
      paddingBottom: ms(15),
      borderBottomColor: colors.counter,
      borderBottomWidth: 0.3,
    },
    eyeIcon: {
      marginLeft: ms(5),
      // backgroundColor: 'pink',
      padding: ms(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: ms(3),
    },
    nothing: {
      alignItems: 'center',
      marginVertical: ms(30),
      fontSize: 11,
      lineHeight: 20,
      textAlign: 'center',
    },
  });
};
