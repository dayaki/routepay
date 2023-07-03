import React from 'react';
import { Image, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useStyles } from './styles';
import { Button, TitleText, ViewWrapper } from '@common';

const slides = [
  {
    key: 'one',
    title: 'Pay bills & subscriptions conveniently.',
    image: require('@images/onboarding/onboarding_1.jpeg'),
  },
  {
    key: 'two',
    title: 'Power your lifestyle. Pay bills in a zap!',
    image: require('@images/onboarding/onboarding_2.jpeg'),
  },
  {
    key: 'three',
    title: 'Travel everywhere. Buy airline tickets & more!',
    image: require('@images/onboarding/onboarding_3.jpeg'),
  },
  {
    key: 'four',
    title: 'Pay bills & subscriptions conveniently.',
    image: require('@images/onboarding/onboarding_4.jpeg'),
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
      <View
        style={[
          styles.paginationDot,
          activeIndex === 3 && styles.paginationDotActive,
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
