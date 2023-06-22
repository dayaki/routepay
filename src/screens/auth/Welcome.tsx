import React from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Button, TitleText, ViewWrapper } from '@common';
import { useStyles } from './styles';

const Welcome = ({ navigation, route }) => {
  const { name } = route.params;
  const [userName, setUserName] = React.useState('');
  const styles = useStyles();

  React.useEffect(() => {
    setUserName(name);
    return () => {
      setUserName('');
    };
  }, [name]);

  return (
    <ViewWrapper>
      <ScrollView>
        <View style={styles.waveWrapper}>
          <Image
            source={require('@images/brand_waves_inverse.png')}
            resizeMode="cover"
            style={styles.wavess}
          />
        </View>

        <View style={styles.sliders}>
          <View style={styles.imageWraper}>
            <Image
              source={require('@images/success/success_5.png')}
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
            It’s so good to have you here, {userName}!!! Kindly verify your
            email to continue. You’ve earned{' '}
            <Text style={styles.bold}>100</Text>{' '}
            <Text style={styles.brand}>coins</Text>. And, you can earn more
            points on every transaction. email.
          </Text>
          <Button
            text="Continue"
            style={styles.registerBtn}
            onPress={() => navigation.navigate('login', { goBack: false })}
          />
        </View>
      </ScrollView>
    </ViewWrapper>
  );
};

export default Welcome;
