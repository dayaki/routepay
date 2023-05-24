import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox } from '@common';
import { useStyles } from '../styles';
import { Header } from '../utils';

const Electricity = ({ navigation }) => {
  const [selectionOption, setSelectionOption] = useState('');
  const styles = useStyles();

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
              navigation.navigate('buy_electricity', { type: selectionOption })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Electricity;
