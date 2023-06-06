import { StyleSheet } from 'react-native';
import { ms } from '@utils';
import { useTheme } from '@common';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: ms(60),
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
    name: {
      width: ms(52),
      height: ms(52),
      borderRadius: ms(52 / 2),
      marginRight: ms(20),
      borderColor: colors.primary,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notifyBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: ms(10),
    },
    scroll: {
      paddingTop: ms(30),
    },
    padded: {
      paddingHorizontal: ms(20),
    },
    dashboard: {
      // padding: ms(20),
      backgroundColor: '#1F1F23',
      borderRadius: ms(10),
      marginBottom: ms(30),
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
    dashboardWallet: {
      alignSelf: 'center',
      alignItems: 'center',
      paddingVertical: ms(60),
    },
    slide: {
      paddingTop: ms(15),
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
      marginBottom: ms(30),
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
      paddingTop: ms(30),
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
      marginBottom: ms(30),
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
