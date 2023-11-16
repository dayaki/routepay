import React, { useState } from 'react';
import { Image, Keyboard, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import { Button, DatePicker, Input, RegularText, TitleText } from '@common';
import { apiService, postBvnCheck } from '@utils';
import { useAppSelector } from '@store';

const CreateWallett = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const [dob, setDob] = useState<Date | null>(null);
  const [bvn, setBvn] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();

  const checkBvn = async () => {
    if (bvn.length === 11) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const { url } = await apiService(postBvnCheck, 'post', {
          uniqueRef: user?.userId,
          bvn: bvn,
          isUser: true,
        });
        setIsLoading(false);
        navigation.navigate('browser', {
          params: {
            uri: url,
            type: 'bvn',
            data: { dob: dob?.toISOString().split('T')[0], gender, bvn },
          },
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <TitleText text="Create Your RoutePay Wallet" />
          <RegularText
            text="Provide the data below to enable us create a wallet for you."
            style={styles.label}
          />
          <Input
            placeholder="Your BVN"
            value={bvn}
            onChangeText={setBvn}
            keyboardType="number-pad"
            maxLength={11}
            returnKeyType="done"
          />
          <DatePicker
            placeholder="Date of Birth"
            value={dob}
            onSelect={setDob}
          />
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
        <Button
          text="Create Wallet"
          onPress={checkBvn}
          isLoading={isLoading}
          disabled={bvn.length < 11 || !dob}
        />
      </View>
    </View>
  );
};

export default CreateWallett;
