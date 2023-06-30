import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Close } from '@icons';
import { Button, DatePicker, Input, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';
import { useAppSelector } from '@store';

const SendStatement = ({ navigation, route }) => {
  const { user } = useAppSelector(state => state.user);
  const type = route.params.type || '';
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [email, setEmail] = useState(type === 'self' ? 'tetsing' : '');
  const styles = useStyles();

  const handleSubmit = () => {
    navigation.navigate('transaction_success', {
      title: 'Successful!',
      message: `We’ve successfully sent your account statement to your email - ${user.email}`,
      buttonText: 'Continue',
      data: {
        email,
      },
    });
  };
  return (
    <View style={styles.containerr}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Close />
        </TouchableOpacity>
      </View>
      <View style={styles.contentt}>
        <View>
          <TitleText
            text="Statement to my email"
            size={20}
            style={[styles.contenttTitle, { marginBottom: 15 }]}
          />
          {type === 'self' ? (
            <View style={styles.textWrapper}>
              <Text style={styles.contenttText}>
                Kindly select your desired dates. Your statement will be sent to
                your registered email -{' '}
                <Text style={[styles.contenttText, { color: '#FF6600' }]}>
                  {user?.email}
                </Text>
              </Text>
            </View>
          ) : (
            <RegularText
              text="Kindly select your desired dates. Your statement will be sent to the third party’s email"
              size={14}
              style={styles.contenttTitle}
            />
          )}
          <DatePicker
            placeholder="Start date"
            value={startDate}
            onSelect={setStartDate}
          />
          <DatePicker
            placeholder="End date"
            value={endDate}
            onSelect={setEndDate}
          />
          {type === 'others' && (
            <Input
              placeholder="Third party email address"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          )}
        </View>
        <Button
          text="Proceed"
          onPress={handleSubmit}
          disabled={!startDate || !endDate || !email}
        />
      </View>
    </View>
  );
};

export default SendStatement;
