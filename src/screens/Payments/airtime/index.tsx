import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Header } from '@common';
import { useStyles } from '../styles';
import { useAppSelector } from '@store';

const Airtime = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const [selectionOption, setSelectionOption] = useState('self');
  const styles = useStyles();

  const onContinue = () => {
    if (selectionOption === 'self') {
      navigation.navigate('buy_airtime', {
        phone: user?.phoneNumber.startsWith('234')
          ? `0${user.phoneNumber.slice(3)}`
          : user?.phoneNumber,
      });
    } else {
      navigation.navigate('buy_airtime', { phone: '' });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Airtime" centered />
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
          <Button text="Continue" onPress={onContinue} />
        </View>
      </View>
    </View>
  );
};

export default Airtime;
