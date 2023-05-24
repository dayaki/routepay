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
    content: {
      paddingHorizontal: ms(20),
      justifyContent: 'space-between',
    },
    wrapper: {
      //   paddingBottom: ms(50),
      flex: 1,
    },
    banner: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.selector,
      paddingTop: ms(15),
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
      marginBottom: ms(20),
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
  });
};
