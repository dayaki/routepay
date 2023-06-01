import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Button, RegularText, TitleText, useTheme } from '@common';
import { formatPhone, ms } from '@utils';
import moment from 'moment';
import { ChevronForward } from '@icons';
import { LoyaltyT } from '@types';

export const OverallView = ({
  data,
  userphone,
}: {
  data: LoyaltyT[];
  userphone?: string;
}) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.spread}>
        <View style={styles.leader}>
          <Image
            source={{ uri: 'https://100k-faces.glitch.me/random-image' }}
            resizeMode="cover"
            style={styles.leaderPhoto}
          />
          <TitleText text="John Doe" size={11} />
          <TitleText
            text={`${data[1].total_points}pts`}
            size={14}
            color="#FF6600"
          />
          <View style={styles.badge}>
            <RegularText text="2" style={styles.badgeText} />
          </View>
        </View>

        <View style={[styles.leader, { marginTop: 0 }]}>
          <Image
            source={{ uri: 'https://100k-faces.glitch.me/random-image' }}
            resizeMode="cover"
            style={[styles.leaderPhoto, styles.topPhoto]}
          />
          <TitleText text="JChett Damee" size={11} />
          <TitleText
            text={`${data[0].total_points}pts`}
            size={14}
            color="#FF6600"
            style={styles.topPoint}
          />
          <View style={[styles.badge, styles.first]}>
            <RegularText text="1" style={styles.badgeText} />
          </View>
        </View>

        <View style={styles.leader}>
          <Image
            source={{ uri: 'https://100k-faces.glitch.me/random-image' }}
            resizeMode="cover"
            style={styles.leaderPhoto}
          />
          <TitleText text="Joy Doe" size={11} />
          <TitleText
            text={`${data[3].total_points}pts`}
            size={14}
            color="#FF6600"
          />
          <View style={[styles.badge, styles.third]}>
            <RegularText text="3" style={styles.badgeText} />
          </View>
        </View>
      </View>

      <View style={styles.lists}>
        {data &&
          data
            .slice(3)
            .map((item, index) => (
              <WinningList
                rank={item.subrank}
                point={item.total_points}
                key={index}
                isUser={item.msisdn === formatPhone(userphone)}
              />
            ))}
      </View>
    </>
  );
};

export const MyWinnings = ({ data }) => {
  const styles = useStyles();
  console.log('MyWinnings', data);
  return (
    <>
      {data || data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <View style={styles.winning}>
              <View style={styles.winningSpread}>
                <View>
                  <RegularText
                    text="Total points"
                    size={11}
                    style={styles.winningLabel}
                  />
                  <TitleText text="100 points" size={14} color="#FF6600" />
                </View>
                <View>
                  <RegularText
                    text="Date"
                    size={11}
                    style={styles.winningLabel}
                  />
                  <TitleText text={moment().format('D MMM, YY')} size={14} />
                </View>
              </View>
              <View style={styles.spread}>
                <View>
                  <RegularText
                    text="Rank"
                    size={11}
                    style={styles.winningLabel}
                  />
                  <TitleText text="1st" size={14} />
                </View>
                <View>
                  <RegularText
                    text="Period"
                    size={11}
                    style={styles.winningLabel}
                  />
                  <TitleText text="One Week" size={14} />
                </View>
                <View />
                <View />
              </View>
            </View>
          ))}
        </>
      ) : (
        <TitleText text="No Winngins available" size={23} />
      )}
    </>
  );
};

const WinningList = ({
  isUser,
  point,
  rank,
}: {
  isUser?: boolean;
  point: string;
  rank: string;
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.list, isUser && styles.meList]}>
      <View style={styles.spread}>
        <View style={styles.row}>
          <View style={styles.number}>
            <RegularText text={rank} size={11} />
          </View>
          <Image
            source={{ uri: 'https://100k-faces.glitch.me/random-image' }}
            resizeMode="cover"
            style={styles.listImage}
          />
        </View>
        <TitleText
          text={`${point}pts`}
          size={14}
          style={isUser && styles.mePoint}
        />
      </View>
    </TouchableOpacity>
  );
};

export const EnquiryView = ({ onOpen }) => {
  const styles = useStyles();
  return (
    <View style={styles.enquiry}>
      <TitleText text="Enquiry" size={14} />
      <View style={styles.enquiryList}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.enquiryBtn}
          onPress={() => onOpen('Rank')}>
          <RegularText text="My Rank" size={14} />
          <ChevronForward size={13} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.enquiryBtn}
          onPress={() => onOpen('My Balance')}>
          <RegularText text="My Balance" size={14} />
          <ChevronForward size={13} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.enquiryBtn}
          onPress={() => onOpen('Point Count')}>
          <RegularText text="Point Count" size={14} />
          <ChevronForward size={13} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.enquiryBtn}
          onPress={() => onOpen('Transact Count')}>
          <RegularText text="Transact Count" size={14} />
          <ChevronForward size={13} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.enquiryBtn}>
          <RegularText text="My Vault" size={14} />
          <ChevronForward size={13} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const EnquiryBox = ({
  data,
  isVisible,
  onPress,
}: {
  data: {
    title: string;
    text: string;
  };
  isVisible: boolean;
  onPress: () => void;
}) => {
  const styles = useStyles();
  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      onBackButtonPress={onPress}>
      <View style={styles.enquiryBox}>
        <TitleText text={data.title} style={styles.boxTitle} />
        <RegularText text={data.text} style={styles.boxText} />
        <Button text="Close" onPress={onPress} />
      </View>
    </Modal>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    enquiry: {
      backgroundColor: colors.selector,
      paddingVertical: ms(30),
      paddingHorizontal: ms(20),
    },
    enquiryList: {
      marginTop: ms(20),
    },
    enquiryBox: {
      backgroundColor: colors.selector,
      position: 'absolute',
      zIndex: 5000,
      bottom: 0,
      left: 0,
      width: '100%',
      height: ms(225),
      borderRadius: ms(7),
      paddingVertical: ms(30),
      paddingHorizontal: ms(20),
    },
    enquiryBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: ms(15),
      paddingRight: ms(21),
      paddingVertical: ms(15),
      backgroundColor: colors.listBg,
      marginBottom: ms(10),
      borderRadius: ms(8),
    },
    boxTitle: {
      fontSize: 14,
      lineHeight: 21,
      marginBottom: ms(20),
    },
    boxText: {
      fontSize: 11,
      lineHeight: 20,
      marginBottom: ms(30),
    },
    winning: {
      borderRadius: ms(10),
      paddingVertical: ms(12),
      paddingHorizontal: ms(15),
      backgroundColor: colors.selector,
      marginBottom: ms(20),
    },
    winningSpread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: ms(20),
    },
    winningLabel: {
      marginBottom: ms(3),
      color: colors.counter,
    },
    list: {
      backgroundColor: colors.selector,
      paddingVertical: ms(9),
      paddingHorizontal: ms(20),
      borderRadius: ms(10),
      marginBottom: ms(10),
    },
    meList: {
      backgroundColor: colors.pink300,
    },
    mePoint: {
      color: colors.primary,
    },
    listImage: {
      width: ms(36),
      height: ms(36),
      borderRadius: ms(36 / 2),
    },
    scroll: {
      paddingTop: ms(30),
      paddingHorizontal: ms(20),
    },
    spread: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    number: {
      width: ms(23),
      height: ms(23),
      borderRadius: ms(23 / 2),
      backgroundColor: colors.doe,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: ms(20),
    },
    leader: {
      backgroundColor: colors.selector,
      borderRadius: ms(10),
      paddingTop: ms(15),
      paddingBottom: ms(10),
      paddingHorizontal: ms(19),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: ms(30),
    },
    leaderPhoto: {
      width: ms(42),
      height: ms(42),
      borderRadius: ms(42 / 2),
      marginBottom: ms(13),
    },
    topPhoto: {
      marginBottom: ms(25),
    },
    topPoint: {
      marginTop: ms(5),
      marginBottom: ms(15),
    },
    badge: {
      width: ms(23),
      height: ms(23),
      borderRadius: ms(23 / 2),
      backgroundColor: '#D9DACA',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: ms(-10),
      right: ms(-4),
    },
    first: {
      backgroundColor: '#FDDC4F',
    },
    third: {
      backgroundColor: '#F5AB6C',
    },
    badgeText: {
      fontSize: 11,
      lineHeight: 20,
      color: '#1F1F23',
    },
    lists: {
      marginTop: ms(20),
    },
  });
};
