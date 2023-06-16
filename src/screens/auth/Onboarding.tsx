import React from 'react';
import { Image, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useStyles } from './styles';
import { Button, TitleText, ViewWrapper } from '@common';

const slides = [
  {
    key: 'one',
    title: 'Pay Your Bills and Subscriptions with Utmost Convenience.',
    image: require('@images/onboarding_1.png'),
  },
  {
    key: 'two',
    title: 'Enjoy Exclusive Rewards on Your Transactions.',
    image: require('@images/onboarding_2.png'),
  },
  {
    key: 'three',
    title: 'Purchase Your Airline and Event Tickets with Ease.',
    image: require('@images/onboarding_3.png'),
  },
];

const Onboarding = ({ navigation }) => {
  const styles = useStyles();

  const renderSlide = ({ item, index }: { item: any; index: number }) => (
    <>
      <Image
        source={
          index === 1
            ? require('@images/brand_waves_inverse.png')
            : require('@images/brand_waves.png')
        }
        resizeMode="cover"
        style={styles.waves}
      />
      <View style={styles.slider}>
        <View style={styles.slide}>
          <View style={styles.imageWraper}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <TitleText text={item.title} style={styles.title} />
          <View style={styles.buttons}>
            <Button
              text="Create an account"
              style={styles.registerBtn}
              onPress={() => navigation.navigate('signup')}
            />
            <Button
              text="Log In"
              textOnly
              onPress={() => navigation.navigate('login')}
            />
          </View>
        </View>
      </View>
    </>
  );

  const renderPagination = (activeIndex: number) => (
    <View style={styles.pagination}>
      <View
        style={[
          styles.paginationDot,
          activeIndex === 0 && styles.paginationDotActive,
        ]}
      />
      <View
        style={[
          styles.paginationDot,
          activeIndex === 1 && styles.paginationDotActive,
        ]}
      />
      <View
        style={[
          styles.paginationDot,
          activeIndex === 2 && styles.paginationDotActive,
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ViewWrapper>
        <AppIntroSlider
          renderItem={renderSlide}
          data={slides}
          renderPagination={renderPagination}
          bottomButton={true}
        />
      </ViewWrapper>
    </View>
  );
};

export default Onboarding;
