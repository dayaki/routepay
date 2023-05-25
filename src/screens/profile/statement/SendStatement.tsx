import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Close } from '@icons';
import { Button, Input, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';

const SendStatement = ({ navigation, route }) => {
  const type = route.params.type || '';
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const styles = useStyles();

  const handleSubmit = () => {};
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
                  janedoe@gmail.com
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
        </View>
        <Button
          text="Proceed"
          onPress={handleSubmit}
          disabled={!startDate || !endDate}
        />
      </View>
    </View>
  );
};

export default SendStatement;
