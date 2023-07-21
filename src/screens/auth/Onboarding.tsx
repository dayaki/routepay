import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Button, TitleText, useTheme } from '@common';
import { ms } from '@utils';

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

const RenderItem = ({
  item,
  scrollData,
  goRegister,
  goLogin,
}: {
  item: any;
  scrollData: any;
  goLogin: () => void;
  goRegister: () => void;
}) => {
  const { width } = useWindowDimensions();
  const styles = useStyles();
  return (
    <View style={[styles.content, { width }]}>
      <Image
        source={require('@images/brand_waves.png')}
        resizeMode="cover"
        style={styles.waves}
      />
      <View style={styles.slider}>
        <View style={styles.imageWraper}>
          <Image source={item.image} resizeMode="cover" style={styles.image} />
          <TitleText text={item.title} style={styles.title} />
        </View>
        <View style={styles.bottom}>
          <Pagination data={slides} scrollX={scrollData} />
          <View>
            <Button text="Create an account" onPress={goRegister} />
            <Button text="Log In" textOnly onPress={goLogin} />
          </View>
        </View>
      </View>
    </View>
  );
};

const Pagination = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <View style={styles.pagination}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const color = scrollX.interpolate({
          inputRange,
          outputRange: ['transparent', colors.pagination, 'transparent'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[styles.paginationDot, { backgroundColor: color }]}
          />
        );
      })}
    </View>
  );
};

const Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const styles = useStyles();
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              scrollData={scrollX}
              goRegister={() => navigation.navigate('signup')}
              goLogin={() => navigation.navigate('login')}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.key}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      paddingTop: Platform.OS === 'android' ? ms(30) : ms(60),
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    waves: {
      width: '100%',
      height: ms(461),
      position: 'absolute',
      zIndex: 10,
      top: 0,
    },
    slider: {
      flex: 1,
      width: '90%',
      height: '100%',
      alignSelf: 'center',
      position: 'relative',
      zIndex: 100,
    },
    imageWraper: {
      flex: 0.65,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: ms(20),
      alignSelf: 'center',
      marginBottom: ms(10),
    },
    title: {
      textAlign: 'center',
      lineHeight: 30,
    },
    bottom: {
      flex: 0.35,
      justifyContent: 'flex-end',
      paddingBottom: ms(30),
    },
    pagination: {
      marginVertical: ms(20),
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    paginationDot: {
      width: ms(10),
      height: ms(10),
      borderRadius: ms(6),
      borderWidth: 0.5,
      borderColor: colors.pagination,
      backgroundColor: 'transparent',
      marginRight: ms(5),
    },
  });
};
