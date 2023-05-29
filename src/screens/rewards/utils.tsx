import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { RegularText, TitleText, useTheme } from '@common';
import { ms } from '@utils';

export const OverallView = () => {
  const styles = useStyles();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
      <View style={styles.spread}>
        <View style={styles.leader}>
          <Image
            source={{ uri: 'https://100k-faces.glitch.me/random-image' }}
            resizeMode="cover"
            style={styles.leaderPhoto}
          />
          <TitleText text="John Doe" size={11} />
          <TitleText text="1750pts" size={14} color="#FF6600" />
          <View style={styles.badge}>
            <RegularText text="2" style={styles.badgeText} />
          </View>
        </View>

        <View style={[styles.leader, { marginTop: 0 }]}>
          <Image
            source={{ uri: 'https://100k-faces.glitch.me/random-image' }}
            resizeMode="cover"
            style={[styles.leaderPhoto, styles.topPhoto]}
          />
          <TitleText text="JChett Damee" size={11} />
          <TitleText
            text="2350pts"
            size={14}
            color="#FF6600"
            style={styles.topPoint}
          />
          <View style={[styles.badge, styles.first]}>
            <RegularText text="1" style={styles.badgeText} />
          </View>
        </View>

        <View style={styles.leader}>
          <Image
            source={{ uri: 'https://100k-faces.glitch.me/random-image' }}
            resizeMode="cover"
            style={styles.leaderPhoto}
          />
          <TitleText text="Joy Doe" size={11} />
          <TitleText text="950pts" size={14} color="#FF6600" />
          <View style={[styles.badge, styles.third]}>
            <RegularText text="3" style={styles.badgeText} />
          </View>
        </View>
      </View>

      <View style={styles.lists}></View>
    </ScrollView>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    scroll: {
      paddingTop: ms(30),
      paddingHorizontal: ms(20),
    },
    spread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leader: {
      backgroundColor: colors.selector,
      borderRadius: ms(10),
      paddingTop: ms(15),
      paddingBottom: ms(10),
      paddingHorizontal: ms(19),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: ms(30),
    },
    leaderPhoto: {
      width: ms(42),
      height: ms(42),
      borderRadius: ms(42 / 2),
      marginBottom: ms(13),
    },
    topPhoto: {
      marginBottom: ms(25),
    },
    topPoint: {
      marginTop: ms(5),
      marginBottom: ms(15),
    },
    badge: {
      width: ms(23),
      height: ms(23),
      borderRadius: ms(23 / 2),
      backgroundColor: '#D9DACA',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: ms(-10),
      right: ms(-4),
    },
    first: {
      backgroundColor: '#FDDC4F',
    },
    third: {
      backgroundColor: '#F5AB6C',
    },
    badgeText: {
      fontSize: 11,
      lineHeight: 20,
      color: '#1F1F23',
    },
    lists: {
      marginTop: ms(20),
    },
  });
};
