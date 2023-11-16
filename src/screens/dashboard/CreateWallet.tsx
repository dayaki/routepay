import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import { Button, DatePicker, Header, RegularText } from '@common';

const CreateWallet = ({ navigation }) => {
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>();
  const styles = useStyles();

  return (
    <View style={styles.contain}>
      <Header title="Account Verification" centered hideBalance />
      <View style={styles.content}>
        <View>
          {/* <TitleText text="Create Your RoutePay Wallet" /> */}
          <RegularText
            text="Provide the data below to enable us create a wallet for you."
            style={styles.label}
          />

          <View style={styles.input}>
            <RegularText text="Date of Birth" style={styles.inputLabel} />
            <DatePicker
              placeholder="Date of Birth"
              value={dob}
              onSelect={setDob}
            />
          </View>
          <View style={styles.input}>
            <RegularText text="Gender" style={styles.inputLabel} />
            <View style={styles.gender}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.genderBtn}
                onPress={() => setGender('male')}>
                <Image
                  source={require('@images/male.png')}
                  resizeMode="cover"
                  style={styles.genderIcon}
                />
                <RegularText text="Male" style={styles.genderText} />
                {gender === 'male' && <View style={styles.dot} />}
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.genderBtn}
                onPress={() => setGender('female')}>
                <Image
                  source={require('@images/female.png')}
                  resizeMode="cover"
                  style={styles.genderIcon}
                />
                <RegularText text="Female" style={styles.genderText} />
                {gender === 'female' && <View style={styles.dot} />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button
          text="Continue"
          onPress={() =>
            navigation.navigate('create_wallet_two', {
              gender,
              dob,
            })
          }
          disabled={!dob || !gender}
        />
      </View>
    </View>
  );
};

export default CreateWallet;
