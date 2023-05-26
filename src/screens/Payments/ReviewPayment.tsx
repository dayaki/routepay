import React from 'react';
import { Image, View } from 'react-native';
import { Button, RegularText, TitleText } from '@common';
import { useStyles } from './styles';
import { Header } from './utils';
import { Exclamation } from '@icons';
import { getImage, getName, nairaFormat } from '@utils';

const ReviewPayment = ({ navigation, route }) => {
  const type = route.params.type || '';
  const data = route.params.data || null;
  console.log('ReviewPayment DATA', data);
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Review Payment" centered hideBalance />
      <View style={styles.content}>
        <View style={styles.review}>
          {type === 'payment' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText text="Recipient’s mobile no" size={14} />
                <TitleText text={data.phone} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Remark" size={14} />
                <TitleText text={data.remark || 'N/A'} size={14} />
              </View>
            </>
          )}

          {type === 'bank_payment' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText text="Account number" size={14} />
                <TitleText text={data.accountNumber} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Bank’s name" size={14} />
                <TitleText text={data.bankName} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Account name" size={14} />
                <TitleText text={data.accountName} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Remark" size={14} />
                <TitleText text={data.remark || 'N/A'} size={14} />
              </View>
            </>
          )}

          {type === 'data' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText text="Phone number" size={14} />
                <TitleText text={data.phone} size={14} />
              </View>

              <View style={styles.reviewItem}>
                <RegularText text="Network provider" size={14} />
                <View style={styles.row}>
                  <Image
                    source={getImage(
                      getName(data.selectedNetwork.billCode).toLowerCase(),
                    )}
                    resizeMode="cover"
                    style={styles.networkLogo}
                  />
                  <TitleText
                    text={getName(data.selectedNetwork.billCode)}
                    size={14}
                  />
                </View>
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Data plan" size={14} />
                <TitleText text={data.data_plan} size={14} />
              </View>
            </>
          )}

          {type === 'fuel' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText text="Filling station" size={14} />
                <TitleText text={data.station} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Email" size={14} />
                <TitleText text={data.email} size={14} />
              </View>
            </>
          )}
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
