import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { RegularText, TitleText, UserAvatar } from '@common';
import { useStyles } from './styles';
import { RefreshIcon } from '@icons';
import { nairaFormat } from '@utils';
import { useAppSelector } from '@store';

const Wallet = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        <TitleText text={nairaFormat(0)} size={20} color="#FF6600" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.box}>
          <UserAvatar label="QR code | @08123456789" />
          <View style={styles.qrCode}>
            <QRCode size={112} value="https://routepay.com/" />
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
              text="Transfer money to your account or other accounts"
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
              text="Get money from a contact or via your payment link"
              style={styles.boxLabel}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.boxes}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.box, styles.boxed]}>
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
              text="Make payments fast by scanning a QR code"
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
              text="See the history of all your transactional activities"
              style={styles.boxLabel}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Wallet;
