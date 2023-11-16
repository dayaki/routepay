import React, { useState } from 'react';
import { View } from 'react-native';
import { useStyles } from './styles';
import { Button, Header, Input, RegularText } from '@common';
import { useAppSelector } from '@store';

const CreateWalletTwo = ({ navigation, route }) => {
  const { dob, gender } = route.params;
  const { user } = useAppSelector(state => state.user);
  const [bvn, setBvn] = useState('');
  const styles = useStyles();

  return (
    <View style={styles.contain}>
      <Header title="Account Verification" centered hideBalance />
      <View style={styles.content}>
        <View>
          <View style={styles.input}>
            <RegularText text="Phone Number" style={styles.inputLabel} />
            <Input value={user?.phoneNumber || ''} editable={false} />
          </View>

          <View style={styles.input}>
            <RegularText text="BVN" style={styles.inputLabel} />
            <Input
              placeholder="Your BVN"
              value={bvn}
              onChangeText={setBvn}
              keyboardType="number-pad"
              maxLength={11}
              returnKeyType="done"
            />
          </View>
        </View>
        <Button
          text="Continue"
          onPress={() =>
            navigation.navigate('create_wallet_three', {
              gender,
              dob,
              bvn,
            })
          }
          disabled={!bvn}
        />
      </View>
    </View>
  );
};

export default CreateWalletTwo;
