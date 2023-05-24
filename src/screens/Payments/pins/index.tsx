import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox } from '@common';
import { useStyles } from '../styles';
import { Header } from '../utils';

const Pins = ({ navigation }) => {
  const [selectionOption, setSelectionOption] = useState('network');
  const styles = useStyles();

  const onContinue = () => {
    if (selectionOption === 'network') {
      navigation.navigate('network_pins');
    } else {
      navigation.navigate('network_pins');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Pins" centered />
      <View style={styles.content}>
        <View style={styles.review}>
          <View style={[styles.row, { marginBottom: 31 }]}>
            <Checkbox
              text="Buy network pins"
              isChecked={selectionOption === 'network'}
              onPress={() => setSelectionOption('network')}
            />
          </View>
          <View style={[styles.row, { marginBottom: 29 }]}>
            <Checkbox
              text="Buy Jamb/Waec pins"
              isChecked={selectionOption === 'jamb'}
              onPress={() => setSelectionOption('jamb')}
            />
          </View>
        </View>
        <Button text="Continue" onPress={onContinue} />
      </View>
    </View>
  );
};

export default Pins;
