import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Header, Primary, RegularText, TitleText } from '@common';
import { useAppDispatch, useAppSelector } from '@store';
import { apiService, nairaFormat, postTransferHistory } from '@utils';
import { useStyles } from './styles';
import moment from 'moment';
import { capitalize } from 'lodash';

const TransactionHistory = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const { items } = await apiService(postTransferHistory, 'post', {
        pageNumber: 1,
        pageSize: 10,
        searchRequest: {
          externalReference: '',
          merchantReference: '',
          transferReference: '',
          transferType: '',
          startDate: '',
          endDate: '',
          transferStatus: '00',
        },
      });
      setHistory(items);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Transaction History" centered hideBalance />
      <View style={styles.scroll}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <FlashList
            showsVerticalScrollIndicator={false}
            data={history}
            renderItem={({ item }) => (
              <View style={styles.history}>
                <View style={styles.historyTexts}>
                  <RegularText
                    text={item.beneficiaryAccountName}
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
