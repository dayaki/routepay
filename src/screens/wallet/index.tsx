import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Header, RegularText, TitleText, UserAvatar } from '@common';
import { useStyles } from './styles';
import { useAppSelector } from '@store';
import { encode } from 'base-64';

const Wallet = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const { user } = useAppSelector(state => state.user);
  const styles = useStyles();
  const userQRcode = encode(
    `AAAA${user?.phoneNumber}${user?.firstName} ${user?.lastName}`,
  );

  return (
    <View style={styles.container}>
      <Header title="Wallet" color="#FF6600" />
      {/* <View style={styles.header}>
        <View style={styles.headerTop}>
          <TitleText text="Wallet" size={20} color="#15151A" />
          <TouchableOpacity activeOpacity={0.8} style={styles.refreshBtn}>
            <RefreshIcon />
          </TouchableOpacity>
        </View>
        <RegularText
          text="Your Wallet Balance"
          size={11}
          color="#15151A"
          style={{ marginBottom: 8 }}
        />
        <TitleText
          text={nairaFormat(wallet.balance)}
          size={20}
          color="#FF6600"
        />
      </View> */}
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
            onPress={() => navigation.navigate('send_money')}
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
            onPress={() => navigation.navigate('transaction_history')}>
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
    </View>
  );
};

export default Wallet;
