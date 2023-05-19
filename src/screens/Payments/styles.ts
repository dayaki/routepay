import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { pink300 } from '@common';
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
      // backgroundColor: 'pink',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: ms(30),
      height: ms(30),
      marginRight: ms(20),
      // borderRadius: ms(30 / 2),
      // backgroundColor: colors.input,
      // justifyContent: 'center',
      // alignItems: 'center',
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
  });
};
