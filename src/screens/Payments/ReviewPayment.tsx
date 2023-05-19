import React from 'react';
import { Image, View } from 'react-native';
import { Button, RegularText, TitleText } from '@common';
import { useStyles } from './styles';
import { Header } from './utils';
import { Exclamation } from '@icons';

const ReviewPayment = ({ navigation, route }) => {
  const { data_plan } = route.params;
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Review Payment" centered hideBalance />
      <View style={styles.content}>
        <View style={styles.review}>
          <View style={styles.reviewItem}>
            <RegularText text="Phone number" size={14} />
            <TitleText text="08123456789" size={14} />
          </View>
          <View style={styles.reviewItem}>
            <RegularText text="Network provider" size={14} />
            <View style={styles.row}>
              <Image
                source={require('@images/networks/mtn.png')}
                resizeMode="cover"
                style={styles.networkLogo}
              />
              <TitleText text="MTN" size={14} />
            </View>
          </View>
          {data_plan && (
            <View style={styles.reviewItem}>
              <RegularText text="Data plan" size={14} />
              <TitleText text="2GB for Monthly - Monthly" size={14} />
            </View>
          )}
          <View style={styles.reviewItem}>
            <RegularText text="Amount" size={14} />
            <TitleText text="₦200" size={14} />
          </View>
        </View>
        <View>
          <View style={styles.reviewInfo}>
            <Exclamation />
            <RegularText
              text="Kindly review the payment details before continuing your transaction."
              size={14}
              style={styles.reviewInfoText}
            />
          </View>
          <Button
            text="Continue payment"
            onPress={() => navigation.navigate('payment_options')}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewPayment;
