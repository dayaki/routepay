import React from 'react';
import { TouchableOpacity, View, Share, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useToast } from 'react-native-toast-notifications';
import { Button, Header, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';
import { CopyIcon } from '@icons';
import { useAppSelector } from '@store';

const RouteLink = ({ navigation }) => {
  const { user } = useAppSelector(state => state.user);
  const styles = useStyles();
  const toast = useToast();
  const paymentLink = `https://payme.routepay.com/@${user?.phoneNumber}`;

  const copyLink = () => {
    Clipboard.setString(paymentLink);
    toast.show('Your payment link is copied to your clipboard!');
  };

  const shareLink = async () => {
    try {
      const result = await Share.share({
        title: 'Share Payment Link',
        message: paymentLink,
      });
      console.log('shared result', result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('shared dismissed');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
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
            <RegularText text={paymentLink} style={styles.linkBtnText} />
          </TouchableOpacity>
        </View>
        <Button text="Share" onPress={shareLink} />
      </View>
    </View>
  );
};

export default RouteLink;
