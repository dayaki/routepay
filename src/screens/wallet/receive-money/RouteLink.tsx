import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToast } from 'react-native-toast-notifications';
import { Button, Header, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';
import { ChevronForward, CopyIcon } from '@icons';
import { useAppSelector } from '@store';

const RouteLink = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const styles = useStyles();
  const toast = useToast();

  const copyLink = async () => {
    Clipboard.setString('https://routepay.com/refer/dejisub');
    toast.show('Payment link copied to your clipboard!');
  };
  return (
    <View style={styles.container}>
      <Header title="Receive Money" centered hideBalance />
      <View style={styles.contentt}>
        <View>
          <TitleText text="Receive money via Routepay link" size={14} />
          <RegularText
            text="Share your payment link to get paid by anyone"
            style={styles.routeLinkLabel}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.linkBtn}
            onPress={copyLink}>
            <CopyIcon size={16} />
            <RegularText text="Payment link here" style={styles.linkBtnText} />
          </TouchableOpacity>
        </View>
        <Button text="Share" onPress={() => {}} />
      </View>
    </View>
  );
};

export default RouteLink;
