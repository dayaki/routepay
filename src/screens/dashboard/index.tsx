import React, { useEffect, useState } from 'react';
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
  toggleShowBalance,
  useAppDispatch,
  useAppSelector,
} from '@store';
import { EyeClose, EyeIcon, Notification } from '@icons';
import { nairaFormat } from '@utils';
import { useStyles } from './styles';

const Dashboard = ({ navigation }) => {
  const { user, wallet } = useAppSelector(state => state.user);
  const { theme, showBalance } = useAppSelector(state => state.misc);
  const { dashboard } = useAppSelector(state => state.loyalty);
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = useStyles();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (user) {
      dispatch(accountSetUp(user.userId));
    }
  }, [user, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.name}>
            <TitleText
              text={`${user?.firstName[0]}${user?.lastName[0]}`}
              size={20}
            />
          </View>
          <TitleText text={`Hi, ${user?.firstName}`} size={14} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.notifyBtn}
          onPress={() => navigation.navigate('notifications')}>
          <Notification />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.padded}>
          <ImageBackground
            source={require('@images/dashboard_bg.png')}
            resizeMode="cover"
            style={styles.dashboard}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onMomentumScrollEnd={onMomentumScrollEnd}>
              <View style={styles.slide}>
                <View style={styles.dashboardWallet}>
                  <RegularText
                    text="WALLET BALANCE"
                    style={styles.dashboardLabel}
                  />
                  <View style={styles.row}>
                    {showBalance ? (
                      <>
                        <TitleText
                          text={nairaFormat(wallet.balance)}
                          style={styles.dashboardPoint}
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
                          style={[styles.dashboardPoint, { marginTop: 10 }]}
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
                <View style={styles.dashboardRow}>
                  <View>
                    <RegularText text="NAME" style={styles.dashboardLabel} />
                    <RegularText
                      text={`${dashboard?.firstname} ${dashboard?.lastname}`}
                      size={14}
                      color="#F9F7F6"
                    />
                  </View>
                  <View>
                    <RegularText text="TIER" style={styles.dashboardLabel} />
                    <RegularText
                      text={dashboard?.customerclass}
                      size={14}
                      color="#F9F7F6"
                    />
                  </View>
                </View>
                <View style={styles.dashboardPoints}>
                  <RegularText
                    text="LOYALTY BALANCE"
                    style={styles.dashboardLabel}
                  />
                  <TitleText
                    text={`${dashboard?.points} pts`}
                    style={styles.dashboardPoint}
                  />
                </View>
                <View style={styles.dashboardRow}>
                  <View>
                    <RegularText
                      text="WALLET ID"
                      style={styles.dashboardLabel}
                    />
                    <RegularText
                      text={dashboard?.memberid.replace(
                        /(?<=^(?:.{4})+)(?!$)/g,
                        ' ',
                      )} // "4352  4210  5674  2341"
                      size={14}
                      color="#F9F7F6"
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.refreshBtn}
                    onPress={() => navigation.navigate('rewards')}>
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
              <Image
                source={require('@images/dashboard/buy_airtime_dark.png')}
                resizeMode="contain"
                style={styles.linkImg}
              />
              <RegularText text="Buy Airtime" size={11} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.link}
              onPress={() => navigation.navigate('data')}>
              <Image
                source={require('@images/dashboard/buy_data_dark.png')}
                resizeMode="contain"
                style={styles.linkImg}
              />
              <RegularText text="Buy Data" size={11} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.link}
              onPress={() => navigation.navigate('buy_fuel')}>
              <Image
                source={require('@images/dashboard/buy_fuel_dark.png')}
                resizeMode="contain"
                style={styles.linkImg}
              />
              <RegularText text="Buy Fuel" size={11} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.link}
              onPress={() => navigation.navigate('bills')}>
              <Image
                source={require('@images/dashboard/pay_bills_dark.png')}
                resizeMode="contain"
                style={styles.linkImg}
              />
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
              source={require('@images/dashboard/ads.png')}
              resizeMode="cover"
              style={styles.adImage}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.adsBtn}>
            <Image
              source={require('@images/dashboard/ads.png')}
              resizeMode="cover"
              style={styles.adImage}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.adsBtn}>
            <Image
              source={require('@images/dashboard/ads.png')}
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
              onPress={() => {}}
            />
          </View>

          <RegularText
            text="You do not have any transaction history"
            style={styles.nothing}
          />

          {/* <TransactionList
            desc="Data Purchase"
            amount={2000}
            date={new Date()}
          />
          <TransactionList
            desc="Wallet Topup"
            amount={34000}
            date={new Date()}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
