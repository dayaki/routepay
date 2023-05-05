import React from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Button, TitleText, ViewWrapper } from '@common';
import { useStyles } from './styles';

const Welcome = ({ navigation }) => {
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
              source={require('@images/success_woman.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <TitleText
            size={20}
            text="Thanks for completing your account creation."
            style={styles.welcomeTitle}
          />
          <Text style={styles.welcomeText}>
            It’s so good to have you here, Jane!!! You’ve earned{' '}
            <Text style={styles.bold}>100</Text>{' '}
            <Text style={styles.brand}>routepaycoins</Text>. And, you can earn
            more points on every transaction.
          </Text>
          <Button
            text="Continue to dashboard"
            style={styles.registerBtn}
            onPress={() => navigation.navigate('otp_verification')}
          />
        </View>
      </ScrollView>
    </ViewWrapper>
  );
};

export default Welcome;
