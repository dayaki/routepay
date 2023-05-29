import React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header, RegularText, TextButton, TitleText } from '@common';
import { RefreshIcon } from '@icons';
import { useStyles } from './styles';

const Rewards = ({ navigation }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header title="Rewards" hideBalance />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <ImageBackground
          source={require('@images/dashboard_bg.png')}
          resizeMode="cover"
          style={styles.dashboard}>
          <View style={styles.dashboardRow}>
            <View>
              <RegularText text="NAME" style={styles.dashboardLabel} />
              <RegularText text="Vek Akinyemi" size={14} color="#F9F7F6" />
            </View>
            <View>
              <RegularText text="TIER" style={styles.dashboardLabel} />
              <RegularText text="Silver Class" size={14} color="#F9F7F6" />
            </View>
          </View>
          <View style={styles.dashboardPoints}>
            <RegularText text="LOYALTY BALANCE" style={styles.dashboardLabel} />
            <TitleText text="300 pts" style={styles.dashboardPoint} />
          </View>
          <View style={styles.dashboardRow}>
            <View>
              <RegularText text="WALLET ID" style={styles.dashboardLabel} />
              <RegularText
                text="4352  4210  5674  2341"
                size={14}
                color="#F9F7F6"
              />
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.refreshBtn}>
              <RefreshIcon color="#F9F7F6" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.spread}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.navLink}
            onPress={() => navigation.navigate('leadership')}>
            <Image
              source={require('@images/rewards/leadership.png')}
              resizeMode="cover"
              style={styles.leadership}
            />
            <RegularText text="Leaderboard" size={11} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.navLink}>
            <Image
              source={require('@images/rewards/award.png')}
              resizeMode="cover"
              style={styles.leadership}
            />
            <RegularText text="Play Games" size={11} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.navLink}>
            <Image
              source={require('@images/rewards/info.png')}
              resizeMode="cover"
              style={styles.leadership}
            />
            <RegularText text="Enquiry" size={11} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={require('@images/rewards/banner.png')}
            resizeMode="cover"
            style={styles.banner}
          />
        </TouchableOpacity>

        <View style={styles.spread}>
          <TitleText text="Categories (9)" size={14} />
          <TextButton text="View all" color="#FF6600" size={11} />
        </View>

        <View style={styles.spread}>
          <TouchableOpacity activeOpacity={0.8} style={styles.linkBtn}>
            <ImageBackground
              source={require('@images/rewards/data.png')}
              resizeMode="cover"
              style={styles.linkBanner}>
              <TitleText text="Airtime/Data" size={11} />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.linkBtn}>
            <ImageBackground
              source={require('@images/rewards/cabletv.png')}
              resizeMode="cover"
              style={styles.linkBanner}>
              <TitleText text="Cable TV" size={11} />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.linkBtn}>
            <ImageBackground
              source={require('@images/rewards/electric.png')}
              resizeMode="cover"
              style={styles.linkBanner}>
              <TitleText text="Electricity" size={11} />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Rewards;
