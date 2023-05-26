import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  Button,
  Checkbox,
  Header,
  Input,
  RegularText,
  TextCounter,
} from '@common';
import { useStyles } from '../styles';
import { SearchIcon } from '@icons';

const Routepay = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [userData, setUserData] = useState();
  const [hasUser, setHasUser] = useState(false);
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Send Money" centered />
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          paddingBottom: 40,
        }}>
        <View>
          <RegularText
            text="Please provide the details of the Routepay wallet id you would like to send money to below"
            size={14}
            style={{ lineHeight: 25, marginBottom: 30 }}
          />
          <Input
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search by mobile number"
            leftIcon={<SearchIcon />}
          />
          {hasUser && (
            <Input
              editable
              value={'Ayodeji Subair'}
              onChangeText={setAmount}
              placeholder="Account number"
            />
          )}
          <Input value={amount} onChangeText={setAmount} placeholder="Amount" />
          <Input
            value={memo}
            onChangeText={setMemo}
            placeholder="Remark"
            rightIcon={<TextCounter text={memo} />}
          />
          <View style={styles.beneficiary}>
            <RegularText text="Save as Beneficiary?" size={14} />
            <ToggleSwitch
              isOn={saveBeneficiary}
              onColor="#008751"
              offColor="#FF6600"
              size="small"
              onToggle={setSaveBeneficiary}
            />
          </View>
        </View>
        <Button
          text="Continue"
          onPress={() =>
            navigation.navigate('review_payment', {
              type: 'payment',
              data: {
                phone: '08123456789',
                remark: memo,
                amount,
              },
            })
          }
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Routepay;
