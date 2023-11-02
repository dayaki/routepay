import React, { useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Button,
  DatePicker,
  Input,
  RegularText,
  TextButton,
  TitleText,
  TransactionList,
} from '@common';
import {
  accountSetUp,
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
import { apiService, nairaFormat, postBvnCheck } from '@utils';
import { useStyles } from './styles';

const Dashboard = ({ navigation }) => {
  const { user, wallet } = useAppSelector(state => state.user);
  const { showBalance, transactions, theme } = useAppSelector(
    state => state.misc,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dob, setDob] = useState<Date | null>(null);
  const [bvn, setBvn] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isLoading, setIsLoading] = useState(false);
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const bvnSheet = useRef<RBSheet>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        dispatch(accountSetUp(user.phoneNumber));
      }
    }, [user, dispatch]),
  );

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

  const closeSheet = () => {
    bvnSheet.current?.close();
    setIsLoading(false);
  };

  const checkBvn = async () => {
    if (bvn.length === 11) {
      setIsLoading(true);
      try {
        const { url } = await apiService(postBvnCheck, 'post', {
          uniqueRef: user?.userId,
          bvn: bvn,
          isUser: true,
        });
        closeSheet();
        navigation.navigate('browser', {
          params: {
            uri: url,
            type: 'bvn',
            data: { dob: dob?.toISOString().split('T')[0], gender, bvn },
          },
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
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
            onPress={() =>
              navigation.navigate('transaction_history', {
                transactions: transactions,
              })
            }>
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
                          text={
                            user?.bvn
                              ? nairaFormat(wallet?.balance)
                              : nairaFormat(0)
                          }
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
              onPress={() =>
                user?.bvn
                  ? navigation.navigate('wallet_topup')
                  : bvnSheet.current?.open()
              }>
              <Image
                source={
                  theme === 'dark'
                    ? require('@images/dashboard/topup_dark.png')
                    : require('@images/dashboard/topup.png')
                }
                resizeMode="cover"
                style={styles.boxIcon}
              />
              <TitleText text="Fund Wallet" size={11} />
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
              onPress={() =>
                navigation.navigate('transaction_history', {
                  transactions: transactions,
                })
              }
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
      <RBSheet
        ref={bvnSheet}
        height={460}
        openDuration={250}
        customStyles={{
          container: styles.rbSheet,
        }}>
        <View>
          <TitleText text="Create Your RoutePay Wallet" />
          <RegularText
            text="Provide the data below to enable us create a wallet for you."
            style={styles.label}
          />
          <Input
            placeholder="Your BVN"
            value={bvn}
            onChangeText={setBvn}
            keyboardType="number-pad"
            maxLength={11}
            returnKeyType="done"
          />
          <DatePicker
            placeholder="Date of Birth"
            value={dob}
            onSelect={setDob}
          />
          <View style={styles.gender}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.genderBtn}
              onPress={() => setGender('male')}>
              <Image
                source={require('@images/male.png')}
                resizeMode="cover"
                style={styles.genderIcon}
              />
              <RegularText text="Male" style={styles.genderText} />
              {gender === 'male' && <View style={styles.dot} />}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.genderBtn}
              onPress={() => setGender('female')}>
              <Image
                source={require('@images/female.png')}
                resizeMode="cover"
                style={styles.genderIcon}
              />
              <RegularText text="Female" style={styles.genderText} />
              {gender === 'female' && <View style={styles.dot} />}
            </TouchableOpacity>
          </View>
          <Button
            text="Create Wallet"
            onPress={checkBvn}
            isLoading={isLoading}
            disabled={bvn.length < 11 || !dob}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default Dashboard;
