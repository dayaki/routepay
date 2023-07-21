import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, TitleText } from '@common';
import { useStyles } from './styles';
import { ChevronBack } from '@icons';
import { useAppSelector } from '@store';

const Refer = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const { user } = useAppSelector(state => state.user);
  const styles = useStyles();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        title: 'Share Payment Link',
        message: `Ayodeji Subair wants you to Download and signup with his referral code. Enjoy instant bonus points after your first bills or payment transaction on Routepay. https://rewards.routepay.com/register?referralID=234${user?.phoneNumber}`,
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
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <ChevronBack />
        </TouchableOpacity>
        <TitleText text="Refer & Earn" size={23} />
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.waveWrapper}>
          <Image
            source={require('@images/brand_waves_inverse.png')}
            resizeMode="cover"
            style={styles.waves}
          />
        </View>
        <View style={styles.slider}>
          <View style={styles.imageWraper}>
            <Image
              source={require('@images/success/success_6.png')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <Image
            source={
              theme === 'dark'
                ? require('@images/account/refer_dark.png')
                : require('@images/account/refer.png')
            }
            resizeMode="cover"
            style={styles.checkmark}
          />
          <View style={styles.texts}>
            <TitleText size={20} text="Earn" style={styles.welcomeTitle} />
            <TitleText
              size={20}
              text=" 200"
              style={styles.welcomeTitle}
              color="#FF6600"
            />
            <TitleText
              size={20}
              text=" Points With"
              style={styles.welcomeTitle}
            />
          </View>
          <TitleText
            size={20}
            text="Every Referral"
            style={styles.welcomeTitle}
          />
          <Text style={styles.welcomeText}>
            Share your referral message and link with your friends and instantly
            earn 200 points as soon as they complete a transaction on Routepay.
          </Text>
          <Button
            text="Share"
            onPress={handleShare}
            disabled
            style={{ marginBottom: 50 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Refer;
