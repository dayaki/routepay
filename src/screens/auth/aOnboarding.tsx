import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useStyles } from './styles';
import { Button, TitleText } from '@common';

const Onboarding = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('@images/brand_waves.png')}
        resizeMode="cover"
        style={styles.waves}
      /> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled
        style={styles.slider}>
        <View style={styles.slide}>
          <View style={styles.imageWraper}>
            <Image
              source={require('@images/onboarding_1.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <TitleText
            text="Enjoy Exclusive Rewards Whenever You Meet a Transaction Goal"
            style={styles.title}
          />
          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
          <View style={styles.buttons}>
            <Button text="Create an account" style={styles.registerBtn} />
            <Button text="Log In" textOnly />
          </View>
        </View>
        {/*  */}
        <View style={styles.slide}>
          <View style={styles.imageWraper}>
            <Image
              source={require('@images/onboarding_2.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <TitleText
            text="Purchase Airline and Event Tickets Without Stress"
            style={styles.title}
          />
          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
          <View style={styles.buttons}>
            <Button text="Create an account" style={styles.registerBtn} />
            <Button text="Log In" textOnly />
          </View>
        </View>
        {/*  */}
        <View style={styles.slide}>
          <View style={styles.imageWraper}>
            <Image
              source={require('@images/onboarding_3.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <TitleText
            text="Pay For Your Bills and Subscriptions Conveniently"
            style={styles.title}
          />
          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
          <View style={styles.buttons}>
            <Button text="Create an account" style={styles.registerBtn} />
            <Button text="Log In" textOnly />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Onboarding;
