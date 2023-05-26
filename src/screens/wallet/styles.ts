import { StyleSheet } from 'react-native';
import { useTheme } from '@common';
import { ms } from '@utils';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.pink300,
      paddingHorizontal: ms(20),
      paddingBottom: ms(20),
      paddingTop: ms(60),
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: ms(8),
    },
    refreshBtn: {
      padding: ms(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    scroll: {
      flex: 1,
      paddingHorizontal: ms(20),
      paddingTop: ms(20),
    },
    content: {
      flex: 1,
      paddingHorizontal: ms(20),
    },
    box: {
      backgroundColor: colors.selector,
      paddingHorizontal: ms(15),
      paddingVertical: ms(20),
      borderRadius: ms(8),
      marginBottom: ms(10),
    },
    qrCode: {
      marginVertical: ms(20),
      alignSelf: 'center',
    },
    qrcodeText: {
      fontSize: 11,
      lineHeight: 16,
      color: colors.fadedText,
      width: '60%',
      textAlign: 'center',
      alignSelf: 'center',
    },
    boxes: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    boxIcon: {
      width: ms(30),
      height: ms(30),
      marginBottom: ms(15),
    },
    boxed: {
      width: '48%',
      height: ms(145),
    },
    boxLabel: {
      fontSize: 11,
      lineHeight: 16,
      color: colors.fadedText,
      marginTop: ms(5),
    },
    boxText: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.navTitle,
      width: '80%',
    },
    beneficiary: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: ms(10),
    },
  });
};
