import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Green, Header, Primary, RegularText, TitleText } from '@common';
import { getAllTransactions, useAppDispatch, useAppSelector } from '@store';
import { apiService, getTransactions, nairaFormat } from '@utils';
import { IsTransaction } from '@types';
import { useStyles } from './styles';
import moment from 'moment';
import { capitalize } from 'lodash';

const TransactionHistory = ({ navigation }) => {
  const { theme, transactions } = useAppSelector(state => state.misc);
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Transaction History" centered hideBalance />
      <View style={styles.scroll}>
        {!transactions ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <FlashList
            showsVerticalScrollIndicator={false}
            data={transactions}
            renderItem={({ item }) => (
              <View style={styles.history}>
                <View style={styles.historyTexts}>
                  <RegularText
                    text={capitalize(item.billCode || item.providerName)}
                    style={styles.historyText}
                  />
                  <RegularText
                    text={moment(item.created).format('DD MMMM, YYYY, HH:MMa')}
                    style={styles.historyLabel}
                  />
                </View>
                <TitleText
                  text={`${nairaFormat(item.amount)}`}
                  style={styles.historyAmount}
                  color={Primary}
                />
              </View>
            )}
            ListEmptyComponent={() => (
              <RegularText
                text="You do not have any transaction history"
                style={styles.nothing}
              />
            )}
            estimatedItemSize={200}
          />
        )}
      </View>
    </View>
  );
};

export default TransactionHistory;
