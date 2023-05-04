import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { White } from '@common';
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
      height: ms(450),
      marginBottom: ms(30),
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
      borderColor: White,
      borderWidth: 0.5,
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
  });
};
