import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Header } from '@common';
import { useStyles } from '../styles';
import { useAppSelector } from '@store';
import { IsBillProvider } from '@types';

const Electricity = ({ navigation }) => {
  const { power } = useAppSelector(state => state.bill);
  const [selectionOption, setSelectionOption] = useState('prepaid');
  const [data, setData] = useState<IsBillProvider[]>();
  const styles = useStyles();

  useEffect(() => {
    let fileredData: IsBillProvider[] | undefined;
    if (selectionOption === 'prepaid') {
      fileredData = power?.filter(elem => elem.billCode.includes('PREPAID'));
    } else {
      fileredData = power?.filter(elem => elem.billCode.includes('POSTPAID'));
    }
    setData(fileredData);
    return () => {
      setData([]);
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <Header title="Electricity" centered />
      <View style={styles.content}>
        <View style={styles.review}>
          <View style={[styles.row, { marginBottom: 31 }]}>
            <Checkbox
              text="Prepaid"
              isChecked={selectionOption === 'prepaid'}
              onPress={() => setSelectionOption('prepaid')}
            />
          </View>
          <View style={[styles.row, { marginBottom: 29 }]}>
            <Checkbox
              text="Postpaid"
              isChecked={selectionOption === 'postpiad'}
              onPress={() => setSelectionOption('postpiad')}
            />
          </View>
        </View>
        <View>
          <Button
            text="Continue"
            onPress={() =>
              navigation.navigate('buy_electricity', {
                data,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Electricity;
