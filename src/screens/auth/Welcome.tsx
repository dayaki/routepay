import React from 'react';
import { Image, View, Text } from 'react-native';
import { Button, TitleText } from '@common';
import { useWelcomeStyles } from './styles';

const Welcome = ({ navigation, route }) => {
  const { name } = route.params;
  const [userName, setUserName] = React.useState('');
  const styles = useWelcomeStyles();

  React.useEffect(() => {
    setUserName(name);
    return () => {
      setUserName('');
    };
  }, [name]);

  return (
    <View style={styles.container}>
      <View style={styles.waveWrapper}>
        <Image
          source={require('@images/brand_waves_inverse.png')}
          resizeMode="cover"
          style={styles.wavess}
        />
        <View style={styles.imageWraper}>
          <Image
            source={require('@images/success/success_5.png')}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.sliders}>
        <TitleText
          size={20}
          text="Thanks for completing your account creation."
          style={styles.welcomeTitle}
        />
        <Text style={styles.welcomeText}>
          It’s so good to have you here,{' '}
          <Text style={styles.bold}>{userName}</Text>!!! Kindly verify your
          email to continue using RoutePay.
        </Text>
        <Button
          text="Login to continue"
          onPress={() => navigation.navigate('login', { goBack: false })}
        />
      </View>
    </View>
  );
};

export default Welcome;
