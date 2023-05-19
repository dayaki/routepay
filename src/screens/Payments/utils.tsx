import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { RegularText, TitleText, pink300, woodsmoke } from '@common';
import { BackArrow, ChevronBack } from '@icons';
import { ms } from '@utils';

export const Header = ({
  title,
  centered,
}: {
  title: string;
  centered?: boolean;
}) => {
  const styles = useStyles();
  const { goBack } = useNavigation();
  return (
    <View style={[styles.header, centered && styles.centeredHeader]}>
      {centered && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backBtn}
          onPress={goBack}>
          <ChevronBack />
        </TouchableOpacity>
      )}
      <TitleText text={title} color={woodsmoke} />
      <View style={styles.walletBalance}>
        <RegularText text="Your wallet balance: " size={11} />
        <TitleText text="N0.00" size={11} />
      </View>
    </View>
  );
};

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    header: {
      width: '100%',
      // height: ms(115),
      marginBottom: ms(30),
      backgroundColor: pink300,
      paddingTop: ms(60),
      paddingLeft: ms(20),
      paddingBottom: ms(15),
    },
    centeredHeader: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    walletBalance: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: ms(10),
    },
    backBtn: {
      position: 'absolute',
      left: ms(10),
      bottom: ms(35),
      //   backgroundColor: 'pink',
      paddingVertical: ms(10),
      paddingHorizontal: ms(20),
    },
  });
};
