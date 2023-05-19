import React from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Button, TitleText, ViewWrapper } from '@common';
import { useTheme } from '@react-navigation/native';
import { ms } from '@utils';

const TransactionSuccess = ({ navigation }) => {
  const styles = useStyles();
  return (
    <ViewWrapper>
      <ScrollView>
        <Image
          source={require('@images/brand_waves_inverse.png')}
          resizeMode="cover"
          style={styles.waves}
        />
        <View style={styles.slider}>
          <View style={styles.imageWraper}>
            <Image
              source={require('@images/success/success_1.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <Image
            source={require('@images/success_mark.png')}
            resizeMode="cover"
            style={styles.checkmark}
          />
          <TitleText
            size={20}
            text="Transaction Successful!"
            style={styles.welcomeTitle}
          />
          <Text style={styles.welcomeText}>
            You’ve just recharged 08145169426 with N100 airtime
          </Text>
          <Button
            text="Continue to dashboard"
            style={styles.registerBtn}
            onPress={() => navigation.navigate('otp_verification')}
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.shareBtn}>
            <TitleText text="Share Receipt?" size={14} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ViewWrapper>
  );
};

export default TransactionSuccess;

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
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
    imageWraper: {
      width: ms(340),
      height: ms(399),
      marginBottom: ms(30),
      alignSelf: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: ms(20),
      alignSelf: 'center',
    },
    checkmark: {
      width: ms(64),
      height: ms(64),
      alignSelf: 'center',
      marginBottom: ms(20),
    },
    registerBtn: {
      marginBottom: ms(20),
    },
    welcomeTitle: {
      textAlign: 'center',
      lineHeight: 30,
      width: '80%',
      alignSelf: 'center',
      marginBottom: ms(10),
    },
    welcomeText: {
      fontSize: 11,
      lineHeight: 20,
      color: colors.text,
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: ms(30),
      width: '64%',
    },
    bold: {
      fontWeight: '700',
    },
    brand: {
      fontWeight: '700',
      color: colors.primary,
    },
    shareBtn: {
      alignSelf: 'center',
    },
    shareBtnText: {
      color: colors.primary,
    },
  });
};
