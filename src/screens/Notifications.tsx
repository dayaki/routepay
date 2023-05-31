import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header, RegularText, TitleText, useTheme } from '@common';
import { ms } from '@utils';
import moment from 'moment';

const Notifications = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Notifications" hideBalance centered />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.texts}>
          <TitleText text="Transaction Successful" style={styles.title} />
          <View style={styles.spread}>
            <RegularText
              text="Your Airtime Topup of N100.00 has been received by 081233456789"
              style={styles.label}
            />
            <RegularText
              text={moment().format('D MMM, YY')}
              style={styles.timeago}
            />
          </View>
        </View>
        {/*  */}
        <View style={styles.texts}>
          <TitleText text="Rewards Alert" style={styles.title} />
          <View style={styles.spread}>
            <RegularText
              text="Earn more routepay coins by using your routepay account for your transactional services"
              style={styles.label}
            />
            <RegularText
              text={moment().format('D MMM, YY')}
              style={styles.timeago}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      paddingHorizontal: ms(20),
    },
    texts: {
      paddingBottom: ms(21),
      marginBottom: ms(20),
      borderBottomColor: colors.counter,
      borderBottomWidth: 0.6,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 14,
      lineHeight: 21,
      color: colors.navTitle,
      marginBottom: ms(10),
    },
    label: {
      fontSize: 11,
      lineHeight: 16,
      color: colors.counter,
      width: '70%',
    },
    timeago: {
      fontSize: 11,
      lineHeight: 20,
      color: colors.counter,
    },
  });
};
