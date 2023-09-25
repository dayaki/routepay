import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { RegularText, TextButton, TitleText, TransactionList } from '@common';
import {
  accountSetUp,
  getWallet,
  toggleShowBalance,
  useAppDispatch,
  useAppSelector,
} from '@store';
import {
  AirtimeIcon,
  BillsIcon,
  ChevronDown,
  DataIcon,
  EyeClose,
  EyeIcon,
  FuelIcon,
  Notification,
} from '@icons';
import { apiService, nairaFormat, postCreateWallet } from '@utils';
import { useStyles } from './styles';
import { useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const { user, wallet } = useAppSelector(state => state.user);
  const { showBalance, transactions, theme } = useAppSelector(
    state => state.misc,
  );
  // const { dashboard } = useAppSelector(state => state.loyalty);
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = useStyles();
  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        dispatch(getWallet(user.phoneNumber));
        dispatch(accountSetUp(user.userId));
        // check if first time user, create wallet
        // createAccount();
      }
    }, [user, dispatch]),
  );

  const createAccount = async () => {
    try {
      const resp = await apiService(postCreateWallet, 'post', {
        externalId: user?.phoneNumber,
        walletType: 'USER',
        firstName: user?.firstName,
        lastName: user?.lastName,
        bvn: '12345678909',
        gender: 0,
        dob: '1997-08-21',
      });
      console.log('create wallet', resp);
    } catch (error) {
      console.log('create wallet Err', error);
    }
  };

  const toggleShow = () => {
    dispatch(toggleShowBalance(!showBalance));
  };

  const onMomentumScrollEnd = ({ nativeEvent }: any) => {
    // const position = nativeEvent.contentOffset;
    const index = Math.round(nativeEvent.contentOffset.x / 320);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('account')}
            style={styles.name}>
            <TitleText
              text={`${user?.firstName[0]}${user?.lastName[0]}`}
              size={20}
            />
          </TouchableOpacity>
          <TitleText text={`Hi, ${user?.firstName}`} size={14} />
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Image
              source={require('@images/nigeria_flag.png')}
              resizeMode="cover"
              style={styles.countryFlag}
            />
            <ChevronDown size={10} />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.notifyBtn}
            onPress={() => navigation.navigate('transaction_history')}>
            <Notification />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.padded}>
          <ImageBackground
            source={require('@images/dashboard/routepay_bg.png')}
            resizeMode="cover"
            imageStyle={styles.dashboard}
            style={styles.dashboard}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onMomentumScrollEnd={onMomentumScrollEnd}>
              <View style={styles.slide}>
                <View style={styles.dashboardPoints}>
                  <RegularText
                    text="WALLET BALANCE"
                    style={styles.dashboardLabel}
                  />
                  <View style={styles.row}>
                    {showBalance ? (
                      <>
                        <TitleText
                          text={nairaFormat(wallet?.balance)}
                          style={[styles.dashboardPoint, { marginLeft: 42 }]}
                        />
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.eyeIcon}
                          onPress={toggleShow}>
                          <EyeClose size={16} color="#F9F7F6" />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TitleText
                          text="********"
                          style={[
                            styles.dashboardPoint,
                            { marginTop: 10, marginLeft: 40 },
                          ]}
                        />
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={toggleShow}
                          style={styles.eyeIcon}>
                          <EyeIcon size={16} color="#F9F7F6" />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
              {/*  */}
              <View style={styles.slide}>
                <View style={styles.dashboardPoints}>
                  <RegularText
                    text="LOYALTY BALANCE"
                    style={styles.dashboardLabel}
                  />
                  <TitleText
                    // text={`${dashboard?.points} pts`}
                    text="0.00 pts"
                    style={styles.dashboardPoint}
                  />
                </View>
                <View style={styles.dashboardRow}>
                  <View />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.refreshBtn}
                    onPress={
                      () => {}
                      // navigation.navigate('rewards')
                    }>
                    <Image
                      source={require('@images/dashboard/arrow_btn.png')}
                      resizeMode="cover"
                      style={styles.loyaltyBtn}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={styles.pagination}>
              <View
                style={[
                  styles.paginationDot,
                  currentIndex === 0 && styles.activeDot,
                ]}
              />
              <View
                style={[
                  styles.paginationDot,
                  currentIndex === 1 && styles.activeDot,
                ]}
              />
            </View>
          </ImageBackground>

          <View style={styles.quickLink}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.row}
              onPress={() => navigation.navigate('wallet_topup')}>
              <Image
                source={
                  theme === 'dark'
                    ? require('@images/dashboard/topup_dark.png')
                    : require('@images/dashboard/topup.png')
                }
                resizeMode="cover"
                style={styles.boxIcon}
              />
              <TitleText text="Top-up Wallet" size={11} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.row}
              onPress={() => navigation.navigate('send_money')}>
              <Image
                source={
                  theme === 'dark'
                    ? require('@images/dashboard/sendmoney_dark.png')
                    : require('@images/dashboard/sendmoney.png')
                }
                resizeMode="cover"
                style={styles.boxIcon}
              />
              <TitleText text="Send Money" size={11} />
            </TouchableOpacity>
          </View>

          <View style={styles.links}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.link}
              onPress={() => navigation.navigate('airtime')}>
              <AirtimeIcon
                size={20}
                color={theme === 'dark' ? '#4575F6' : '#FF6600'}
              />
              <RegularText text="Buy Airtime" size={11} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.link}
              onPress={() => navigation.navigate('data')}>
              <DataIcon color={theme === 'dark' ? '#4575F6' : '#9747FF'} />
              <RegularText text="Buy Data" size={11} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.link}
              onPress={() => navigation.navigate('buy_fuel')}>
              <FuelIcon color={theme === 'dark' ? '#4575F6' : '#FCC729'} />
              <RegularText text="Buy Fuel" size={11} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.link}
              onPress={() => navigation.navigate('bills')}>
              <BillsIcon color={theme === 'dark' ? '#4575F6' : '#4575F6'} />
              <RegularText text="Pay Bills" size={11} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={1}
          decelerationRate="fast"
          pagingEnabled
          style={styles.adScroll}>
          <TouchableOpacity activeOpacity={0.8} style={styles.adsBtn}>
            <Image
              source={require('@images/dashboard/ads.jpg')}
              resizeMode="cover"
              style={styles.adImage}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.adsBtn}>
            <Image
              source={require('@images/dashboard/ads.jpg')}
              resizeMode="cover"
              style={styles.adImage}
            />
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.padded}>
          <View style={styles.transactions}>
            <TitleText text="Transactions" size={14} />
            <TextButton
              text="View All"
              size={11}
              color="#FF6600"
              onPress={() => navigation.navigate('transaction_history')}
            />
          </View>
          {!transactions || transactions.length === 0 ? (
            <RegularText
              text="You do not have any transaction history"
              style={styles.nothing}
            />
          ) : (
            transactions
              .slice(0, 2)
              .map(transac => (
                <TransactionList
                  key={transac.transactionId}
                  desc={transac.billCode || transac.providerName}
                  amount={transac.amount}
                  date={transac.created}
                />
              ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
