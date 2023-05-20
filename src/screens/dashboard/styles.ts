import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ms } from '@utils';

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: ms(60),
    },
  });
};
