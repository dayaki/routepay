import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { capitalize } from 'lodash';
import { Primary, useTheme } from './Colors';
import { RegularText, TitleText } from './Text';
import { ms, nairaFormat } from '@utils';
import { DataIcon } from '@icons';

export const TransactionList = ({
  desc,
  date,
  amount,
}: {
  desc: string;
  date: Date;
  amount: string | number;
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.history}>
      <View style={styles.icon}>
        <DataIcon size={18} color="#15151A" />
      </View>
      <View style={styles.historyTexts}>
        <TitleText text={capitalize(desc)} style={styles.historyText} />
        <RegularText
          text={moment(date).format('DD MMMM, YYYY, HH:MMa')}
          style={styles.historyLabel}
        />
      </View>
      <TitleText
        text={`${nairaFormat(amount)}`}
        style={styles.historyAmount}
        color={Primary}
      />
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    icon: {
      width: ms(30),
      height: ms(30),
      borderRadius: ms(30 / 2),
      marginRight: ms(12),
      backgroundColor: '#F5E0D6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    history: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: ms(15),
      borderBottomColor: 'rgba(249, 247, 246, 0.6)',
      borderBottomWidth: 0.3,
    },
    historyTexts: {
      width: '65%',
    },
    historyText: {
      fontSize: 11,
      lineHeight: 20,
    },
    historyLabel: {
      fontSize: 11,
      lineHeight: 20,
      color: colors.counter,
    },
    historyAmount: {
      fontSize: 14,
      lineHeight: 21,
    },
  });
};
