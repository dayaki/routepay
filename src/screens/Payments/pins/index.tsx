import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Header } from '@common';
import { useStyles } from '../styles';
import { useAppSelector } from '@store';
import { IsBillProvider } from '@types';

const Pins = ({ navigation }) => {
  const { pins } = useAppSelector(state => state.bill);
  const [selectionOption, setSelectionOption] = useState('network');
  const [data, setData] = useState<IsBillProvider[]>();
  const styles = useStyles();
  console.log('pins', pins);

  useEffect(() => {
    let fileredData: IsBillProvider[] | undefined;
    if (selectionOption === 'jamb') {
      fileredData = pins?.filter(
        elem =>
          elem.billCode.includes('JAMB') || elem.billCode.includes('WAEC'),
      );
    } else {
      fileredData = pins?.filter(
        elem =>
          !elem.billCode.includes('JAMB') && !elem.billCode.includes('WAEC'),
      );
    }
    setData(fileredData);
  }, [selectionOption, pins]);

  const onContinue = () => {
    navigation.navigate('network_pins', { data: data });
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
