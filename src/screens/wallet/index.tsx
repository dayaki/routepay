import React, { useRef, useState } from 'react';
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  Button,
  DatePicker,
  Header,
  Input,
  RegularText,
  TitleText,
  UserAvatar,
} from '@common';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useStyles } from './styles';
import { useAppSelector } from '@store';
import { encode } from 'base-64';
import { apiService, postBvnCheck } from '@utils';

const Wallet = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const { user, wallet } = useAppSelector(state => state.user);
  const [dob, setDob] = useState<Date | null>(null);
  const [bvn, setBvn] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();
  const bvnSheet = useRef<RBSheet>(null);
  const userQRcode = encode(
    `AAAA${user?.phoneNumber}${user?.firstName} ${user?.lastName}`,
  );

  const closeSheet = () => {
    bvnSheet.current?.close();
    setIsLoading(false);
  };

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
        closeSheet();
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
      <Header title="Wallet" color="#FF6600" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.box}>
          <UserAvatar hideAvatar label={`QR code | @${user?.phoneNumber}`} />
          <View style={styles.qrCode}>
            <QRCode size={112} value={userQRcode} />
          </View>
          <RegularText
            text="Your QR code is secure. Anyone can scan to send money to your account."
            style={styles.qrcodeText}
          />
        </View>
        <View style={styles.boxes}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              wallet.status !== undefined && wallet.status === 'Active'
                ? navigation.navigate('send_money')
                : Platform.OS === 'ios'
                ? bvnSheet.current?.open()
                : navigation.navigate('create_wallet')
            }
            style={[styles.box, styles.boxed]}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/up_dark.png')
                  : require('@images/wallet/up.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <TitleText text="Send Money" size={14} />
            <RegularText
              text="Transfer money to self and anyone"
              style={styles.boxLabel}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}
            onPress={() => navigation.navigate('receive_money')}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/down_dark.png')
                  : require('@images/wallet/down.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <TitleText text="Receive Money" size={14} />
            <RegularText
              text="Get money from anyone with your link"
              style={styles.boxLabel}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.boxes}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}
            onPress={() => navigation.navigate('scan_landing')}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/scantopay_dark.png')
                  : require('@images/wallet/scantopay.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <TitleText text="Scan to Pay" size={14} />
            <RegularText
              text="Make fast payments with QR codes"
              style={styles.boxLabel}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}
            onPress={() => navigation.navigate('wallet_history')}>
            <Image
              source={
                theme === 'dark'
                  ? require('@images/wallet/history_dark.png')
                  : require('@images/wallet/history.png')
              }
              resizeMode="cover"
              style={styles.boxIcon}
            />
            <TitleText text="Transaction History" size={14} />
            <RegularText
              text="View the history of all your transactions"
              style={styles.boxLabel}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <RBSheet
        ref={bvnSheet}
        height={460}
        openDuration={250}
        customStyles={{
          container: styles.rbSheet,
        }}>
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
          <Button
            text="Create Wallet"
            onPress={checkBvn}
            isLoading={isLoading}
            disabled={bvn.length < 11 || !dob}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default Wallet;
