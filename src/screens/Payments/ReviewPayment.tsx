import React from 'react';
import { Image, View } from 'react-native';
import { Button, Header, RegularText, TitleText } from '@common';
import { useStyles } from './styles';
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
          {type === 'airtime' && (
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
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
              </View>
            </>
          )}

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

          {type === 'scan' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText text="Merchant’s name" size={14} />
                <TitleText text={data.merchant} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Sub merchant name" size={14} />
                <TitleText text={data.merchant_sub} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Payment type" size={14} />
                <TitleText text={data.payment_type || 'N/A'} size={14} />
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
              <View style={styles.reviewItem}>
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
              </View>
            </>
          )}

          {type === 'fuel' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText text="Phone number" size={14} />
                <TitleText text={data.phone} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Filling station" size={14} />
                <TitleText text={data.station.fuelStation} size={14} />
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

          {type === 'electricity' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText text="Meter number" size={14} />
                <TitleText text={data.meter} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Electricity company" size={14} />
                <TitleText text={data.company} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
              </View>
            </>
          )}

          {type === 'cable' && (
            <>
              <View style={styles.reviewItem}>
                <RegularText
                  text={
                    data.billCode.includes('SHOWMAX')
                      ? 'Phone number'
                      : 'Smart card number'
                  }
                  size={14}
                />
                <TitleText text={data.number} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Service provider" size={14} />
                <View style={styles.row}>
                  <Image
                    source={getImage(getName(data.billCode).toLowerCase())}
                    resizeMode="cover"
                    style={styles.networkLogo}
                  />
                  <TitleText text={getName(data.billCode)} size={14} />
                </View>
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Subscription plan" size={14} />
                <TitleText text={data.plan} size={14} />
              </View>
              <View style={styles.reviewItem}>
                <RegularText text="Amount" size={14} />
                <TitleText text={nairaFormat(data.amount)} size={14} />
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
            disabled={type === 'scan'}
            onPress={() =>
              navigation.navigate('payment_options', { data, type })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewPayment;
