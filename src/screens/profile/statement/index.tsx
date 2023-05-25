import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Header } from '@common';
import { useStyles } from '../styles';

const Statement = ({ navigation }) => {
  const [selectionOption, setSelectionOption] = useState('self');
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Routepay Statement" hideBalance centered />
      <View style={[styles.content, { flex: 1 }]}>
        <View>
          <View style={[styles.row, { marginBottom: 31 }]}>
            <Checkbox
              text="Send statement to my email"
              isChecked={selectionOption === 'self'}
              onPress={() => setSelectionOption('self')}
            />
          </View>
          <View style={[styles.row, { marginBottom: 29 }]}>
            <Checkbox
              text="Send my statement to others"
              isChecked={selectionOption === 'others'}
              onPress={() => setSelectionOption('others')}
            />
          </View>
        </View>
        <Button
          text="Continue"
          onPress={() =>
            navigation.navigate('send_statement', { type: selectionOption })
          }
        />
      </View>
    </View>
  );
};

export default Statement;
