import { StyleSheet } from 'react-native';
import { ms } from '@utils';
import { useAppSelector } from '@store';

export const useStyles = () => {
  const {
    colors: { colors },
  } = useAppSelector(state => state.misc);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    rbSheet: {
      backgroundColor: colors.selector,
      borderRadius: ms(7),
    },
    scroll: {
      flex: 1,
      paddingHorizontal: ms(20),
      //   paddingTop: ms(20),
    },
    spread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      flex: 1,
      paddingHorizontal: ms(20),
    },
    dashboard: {
      padding: ms(20),
      backgroundColor: '#1F1F23',
      borderRadius: ms(10),
      //   height: ms(200),
      marginBottom: ms(30),
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
      //   justifyContent: 'center',
      alignItems: 'center',
    },
    dashboardPoint: {
      textAlign: 'center',
      fontSize: 20,
      lineHeight: 30,
      color: '#FF6600',
    },
    refreshBtn: {
      padding: ms(10),
      //   backgroundColor: 'pink',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    navLink: {
      flexDirection: 'row',
      alignItems: 'center',
      //   justifyContent: 'space-between',
      borderRadius: 7,
      borderWidth: 0.5,
      borderColor: colors.counter,
      height: ms(40),
      //   width: ms(110),
      paddingHorizontal: ms(10),
      marginRight: ms(10),
    },
    leadership: {
      width: ms(15),
      height: ms(15),
      marginRight: ms(10),
    },
    banner: {
      width: '100%',
      height: ms(162),
      borderRadius: ms(15),
      marginTop: ms(30),
      marginBottom: ms(20),
    },
    linkBtn: {
      marginVertical: ms(20),
      width: '32%',
      borderRadius: ms(10),
    },
    linkBanner: {
      width: '100%',
      height: ms(90),
      borderRadius: ms(10),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
  });
};

export const useLeadershipStyles = () => {
  const {
    colors: { colors },
  } = useAppSelector(state => state.misc);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: colors.navTitle,
      borderBottomWidth: 0.7,
      //   paddingBottom: ms(5),
    },
    tab: {
      width: '32%',
      alignItems: 'center',
      paddingVertical: ms(5),
    },
    activeTab: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 2.5,
    },
    tabText: {
      color: colors.navTitle,
      fontSize: 14,
      lineHeight: 25,
    },
    activeTabText: {
      fontSize: 14,
      color: colors.primary,
      lineHeight: 21,
    },
    scroll: {
      flex: 1,
      paddingHorizontal: ms(20),
      //   paddingTop: ms(20),
    },
    scrollV: {
      paddingTop: ms(30),
      paddingHorizontal: ms(20),
    },
    spread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      flex: 1,
      paddingHorizontal: ms(20),
    },
    dashboard: {
      padding: ms(20),
      backgroundColor: '#1F1F23',
      borderRadius: ms(10),
      //   height: ms(200),
      marginBottom: ms(30),
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
      //   justifyContent: 'center',
      alignItems: 'center',
    },
    dashboardPoint: {
      textAlign: 'center',
      fontSize: 20,
      lineHeight: 30,
      color: '#FF6600',
    },
    refreshBtn: {
      padding: ms(10),
      //   backgroundColor: 'pink',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    navLink: {
      flexDirection: 'row',
      alignItems: 'center',
      //   justifyContent: 'space-between',
      borderRadius: 7,
      borderWidth: 0.5,
      borderColor: 'rgba(249, 247, 246, 0.8)',
      height: ms(40),
      //   width: ms(110),
      paddingHorizontal: ms(10),
      marginRight: ms(10),
    },
    leadership: {
      width: ms(15),
      height: ms(15),
      marginRight: ms(10),
    },
    banner: {
      width: '100%',
      height: ms(162),
      borderRadius: ms(15),
      marginTop: ms(30),
      marginBottom: ms(20),
    },
    linkBtn: {
      marginVertical: ms(20),
      width: '32%',
      borderRadius: ms(10),
    },
    linkBanner: {
      width: '100%',
      height: ms(90),
      borderRadius: ms(10),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
  });
};
