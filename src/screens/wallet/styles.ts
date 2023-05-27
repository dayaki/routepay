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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      paddingHorizontal: ms(20),
    },
    contentt: {
      flex: 1,
      paddingHorizontal: ms(20),
      justifyContent: 'space-between',
      paddingBottom: ms(40),
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
    beneficiaryWrapper: {
      borderTopColor: 'rgba(249, 247, 246, 0.6)',
      borderTopWidth: 0.3,
      paddingTop: ms(20),
    },
    beneficiary: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // marginTop: ms(10),
      paddingBottom: ms(20),
      marginBottom: ms(20),
      borderBottomColor: 'rgba(249, 247, 246, 0.6)',
      borderBottomWidth: 0.3,
    },
    beneficiaryIcon: {
      width: ms(30),
      height: ms(30),
      marginRight: ms(15),
    },
    beneficiaryBox: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: ms(40),
    },
    sendWrapper: {
      backgroundColor: colors.selector,
      paddingVertical: ms(13),
      paddingHorizontal: ms(15),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '60%',
    },
    routeLinkLabel: {
      fontSize: 11,
      lineHeight: 16,
      color: 'rgba(249, 247, 246, 0.6)',
      marginTop: ms(10),
      marginBottom: ms(30),
    },
    linkBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.selector,
      paddingVertical: ms(9),
      borderRadius: ms(8),
    },
    linkBtnText: {
      fontSize: 11,
      lineHeight: 16,
      marginLeft: ms(15),
    },
  });
};
