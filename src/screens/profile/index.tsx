import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { Header, LogoutModal, RegularText, TitleText } from '@common';
import { useStyles } from './styles';
import { MenuRightArrow } from '@icons';
import {
  updateTheme,
  useAppDispatch,
  useAppSelector,
  userLogout,
} from '@store';

const NAV_ITEMS = [
  {
    name: 'Refer & Earn',
    icon: require('@images/account/refer.png'),
    darkIcon: require('@images/account/refer_dark.png'),
    link: 'refer',
  },
  {
    name: 'Account Statement',
    icon: require('@images/account/account.png'),
    darkIcon: require('@images/account/account_dark.png'),
    link: 'statement',
  },
  {
    name: 'Support Center',
    icon: require('@images/account/support.png'),
    darkIcon: require('@images/account/support_dark.png'),
    link: 'pins_landing',
  },
  {
    name: 'Change Password',
    icon: require('@images/account/password.png'),
    darkIcon: require('@images/account/password_dark.png'),
    link: 'password',
  },
  {
    name: 'Change PIN',
    icon: require('@images/account/pin.png'),
    darkIcon: require('@images/account/pin_dark.png'),
    link: 'bills',
  },
];

const Profile = ({ navigation }) => {
  const { theme } = useAppSelector(state => state.misc);
  const [appMode, setAppMode] = useState(theme === 'dark' ? false : true);
  const [showLogout, setShowLogout] = useState(false);
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const toggleTheme = (status: boolean) => {
    const tempStatus = status ? 'light' : 'dark';
    setAppMode(status);
    dispatch(updateTheme(tempStatus));
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles.container}>
      <LogoutModal
        show={showLogout}
        onCancel={() => setShowLogout(false)}
        handleLogout={handleLogout}
      />
      <Header title="Account" hideBalance />
      <ScrollView contentContainerStyle={styles.content} style={styles.wrapper}>
        <View style={styles.banner}>
          <View style={styles.name}>
            <TitleText text="JD" size={25} />
          </View>
          <TitleText text="Jane Doe" size={14} />
          <RegularText text="Payment link here" size={11} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.editBtn}
            onPress={() => navigation.navigate('edit_profile')}>
            <RegularText text="Edit Profile" size={11} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8} style={styles.listBtn}>
            <View style={styles.row}>
              <Image
                source={
                  theme === 'dark'
                    ? require('@images/account/mode_dark.png')
                    : require('@images/account/mode.png')
                }
                resizeMode="cover"
                style={styles.icon}
              />
              <RegularText text="Enable Light Mode" size={14} />
            </View>
            <ToggleSwitch
              isOn={appMode}
              onColor="#008751"
              offColor="#FF6600"
              size="small"
              onToggle={toggleTheme}
            />
          </TouchableOpacity>
          {NAV_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              style={styles.listBtn}
              onPress={() => navigation.navigate(item.link)}>
              <View style={styles.row}>
                <Image
                  source={theme === 'dark' ? item.darkIcon : item.icon}
                  resizeMode="cover"
                  style={styles.icon}
                />
                <RegularText text={item.name} size={14} />
              </View>
              <MenuRightArrow />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.listBtn}
            onPress={() => setShowLogout(true)}>
            <View style={styles.row}>
              <Image
                source={
                  theme === 'dark'
                    ? require('@images/account/logout_dark.png')
                    : require('@images/account/logout.png')
                }
                resizeMode="cover"
                style={styles.icon}
              />
              <RegularText text="Log Out" size={14} color="#FF0000" />
            </View>
            <MenuRightArrow />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
