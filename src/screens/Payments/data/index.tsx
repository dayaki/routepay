import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox } from '@common';
import { useStyles } from '../styles';
import { Header } from '../utils';

const Data = ({ navigation }) => {
  const [selectionOption, setSelectionOption] = useState('');
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Buy Data" centered />
      <View style={styles.content}>
        <View style={styles.review}>
          <View style={[styles.row, { marginBottom: 31 }]}>
            <Checkbox
              text="Buy for self"
              isChecked={selectionOption === 'self'}
              onPress={() => setSelectionOption('self')}
            />
          </View>
          <View style={[styles.row, { marginBottom: 29 }]}>
            <Checkbox
              text="Buy for others"
              isChecked={selectionOption === 'others'}
              onPress={() => setSelectionOption('others')}
            />
          </View>
        </View>
        <View>
          <Button
            text="Continue"
            onPress={() =>
              navigation.navigate('buy_data', { type: selectionOption })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Data;
