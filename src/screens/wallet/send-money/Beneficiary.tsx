import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header, RegularText, TitleText } from '@common';
import { useStyles } from '../styles';
import { ChevronForward } from '@icons';
import { useAppSelector } from '@store';

const Beneficiary = ({ navigation, route }) => {
  const { theme } = useAppSelector(state => state.misc);
  const type = route.params?.type || '';
  console.log('type', type);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Send Money" centered />
      <View style={styles.content}>
        <View>
          <TitleText
            text={
              type === 'recent' ? 'Recent Transfers' : 'Saved Beneficiaries'
            }
            size={14}
            style={{ lineHeight: 21, marginBottom: 20 }}
          />
          <View style={styles.beneficiaryWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.beneficiary}
              onPress={() => navigation.navigate('pay_beneficiary')}>
              <View style={styles.row}>
                <Image
                  source={
                    theme === 'dark'
                      ? require('@images/wallet/bank_dark.png')
                      : require('@images/wallet/bank.png')
                  }
                  resizeMode="cover"
                  style={styles.beneficiaryIcon}
                />
                <View>
                  <TitleText
                    text="Ayodeji Subair"
                    size={11}
                    style={{ marginBottom: 5 }}
                  />
                  <RegularText text="GTbank - 0123456789" size={11} />
                </View>
              </View>
              <ChevronForward />
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.beneficiary}
              onPress={() => navigation.navigate('pay_beneficiary')}>
              <View style={styles.row}>
                <Image
                  source={
                    theme === 'dark'
                      ? require('@images/wallet/routepay_dark.png')
                      : require('@images/wallet/routepay.png')
                  }
                  resizeMode="cover"
                  style={styles.beneficiaryIcon}
                />
                <View>
                  <TitleText
                    text="Jane Anikulapo"
                    size={11}
                    style={{ marginBottom: 5 }}
                  />
                  <RegularText text="Routepay - 08123456789" size={11} />
                </View>
              </View>
              <ChevronForward />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Beneficiary;
