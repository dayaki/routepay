import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { ms } from '@utils';
import { RegularText, TitleText } from './Text';
import { Close } from '@icons';
import { Checkbox } from './Input';
import { Button } from './Button';

const NETWORKS = [
  {
    id: 1,
    name: 'Airtel',
    slug: 'airtel',
    image: require('@images/networks/airtel.png'),
  },
  {
    id: 2,
    name: 'MTN',
    slug: 'mtn',
    image: require('@images/networks/mtn.png'),
  },
  {
    id: 3,
    name: '9mobile',
    slug: '9mobile',
    image: require('@images/networks/9mobile.png'),
  },
  {
    id: 4,
    name: 'Glo',
    slug: 'glo',
    image: require('@images/networks/glo.png'),
  },
];

export const NetworkModal = ({
  show,
  onClose,
  selectedNetwork,
  onSelect,
}: {
  selectedNetwork: string;
  show: boolean;
  onClose: () => void;
  onSelect: (text: string) => void;
}) => {
  const styles = useStyles();
  return (
    <View>
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.viewWrapper}>
          <View>
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeBtn}
                onPress={onClose}>
                <Close size={18} />
              </TouchableOpacity>
              <TitleText text="Choose Network Provider" size={14} />
            </View>
            <View style={styles.networks}>
              {NETWORKS.map(network => (
                <View style={styles.network} key={network.id}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onSelect(network.slug)}
                    style={styles.row}>
                    <Image
                      source={network.image}
                      resizeMode="cover"
                      style={styles.networkLogo}
                    />
                    <TitleText text={network.name} size={11} />
                  </TouchableOpacity>
                  <Checkbox
                    isChecked={selectedNetwork === network.slug}
                    onPress={() => onSelect(network.slug)}
                  />
                </View>
              ))}
            </View>
          </View>
          <Button text="Continue" onPress={onClose} />
        </View>
      </Modal>
    </View>
  );
};

export const DataModal = ({
  show,
  onClose,
  selectedNetwork,
  onSelect,
}: {
  selectedNetwork: string;
  show: boolean;
  onClose: () => void;
  onSelect: (text: string) => void;
}) => {
  const styles = useStyles();
  return (
    <View>
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.viewWrapper}>
          <View>
            <View style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeBtn}
                onPress={onClose}>
                <Close size={18} />
              </TouchableOpacity>
              <TitleText text="Choose Data Plan" size={14} />
            </View>
            <View style={styles.networks}>
              {NETWORKS.map(network => (
                <View style={styles.network} key={network.id}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.row}
                    onPress={() => onSelect(network.slug)}>
                    <Image
                      source={network.image}
                      resizeMode="cover"
                      style={styles.networkLogo}
                    />
                    <View>
                      <RegularText
                        text="100MB Daily for Daily - Daily"
                        size={11}
                        style={styles.dataType}
                      />
                      <RegularText
                        text="N100.00"
                        size={11}
                        style={styles.dataType}
                      />
                    </View>
                  </TouchableOpacity>
                  <Checkbox
                    isChecked={selectedNetwork === network.slug}
                    onPress={() => onSelect(network.slug)}
                  />
                </View>
              ))}
            </View>
          </View>
          <Button text="Continue" onPress={onClose} />
        </View>
      </Modal>
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    modal: {
      margin: 0,
    },
    viewWrapper: {
      flex: 1,
      paddingTop: ms(60),
      paddingHorizontal: ms(20),
      backgroundColor: colors.background,
      justifyContent: 'space-between',
      paddingBottom: ms(40),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: ms(31),
    },
    closeBtn: {
      padding: ms(10),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: -10,
    },
    networks: {
      backgroundColor: colors.selector,
      marginTop: ms(15),
      borderRadius: ms(8),
      paddingHorizontal: ms(15),
      paddingTop: ms(22),
    },
    networkTitle: {
      color: colors.dash,
      lineHeight: 14,
      marginBottom: ms(10),
    },
    network: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: ms(10),
      paddingBottom: ms(10),
    },
    networkLogo: {
      width: ms(24),
      height: ms(24),
      marginRight: ms(8),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dataType: {
      lineHeight: 20,
      marginBottom: ms(1),
    },
  });
};
