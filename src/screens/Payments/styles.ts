import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ms } from '@utils';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    menuList: {
      paddingHorizontal: ms(20),
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
    content: {
      flex: 1,
      paddingHorizontal: ms(20),
      justifyContent: 'space-between',
      paddingBottom: ms(40),
    },
    input: {
      fontWeight: '700',
      color: colors.inputColor,
    },
    selector: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectorBox: {
      backgroundColor: colors.selector,
      borderRadius: 8,
      paddingVertical: ms(7),
      paddingHorizontal: ms(17),
      marginRight: ms(5),
    },
    selectorActive: {
      backgroundColor: colors.pink300,
    },
    selectorText: {
      color: colors.inputColor,
      fontSize: 11,
      lineHeight: 20,
    },
    networks: {
      backgroundColor: colors.selector,
      marginTop: ms(15),
      borderRadius: ms(8),
      paddingHorizontal: ms(15),
      paddingTop: ms(15),
    },
    networkTitle: {
      color: colors.dash,
      lineHeight: 14,
      marginBottom: ms(10),
    },
    network: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: ms(10),
      paddingBottom: ms(10),
    },
    networkLogo: {
      width: ms(24),
      height: ms(24),
      marginRight: ms(8),
    },
    review: {
      backgroundColor: colors.selector,
      padding: ms(20),
      paddingBottom: ms(0),
      borderRadius: ms(8),
    },
    reviewItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: ms(21),
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
    infoIcon: {
      width: ms(24),
      height: ms(24),
      marginRight: ms(15),
    },
    reviewInfoText: {
      lineHeight: 25,
      color: colors.inputColor,
      marginLeft: ms(15),
    },
  });
};
