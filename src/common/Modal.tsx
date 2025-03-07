import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { getImage, getName, moneyFormat, ms, nairaFormat } from '@utils';
import { RegularText, TitleText } from './Text';
import { Close } from '@icons';
import { Checkbox } from './Input';
import { Button, TextButton } from './Button';
import { DataProps, IsBillProvider, ModalProps } from '@types';
import { useTheme } from './Colors';
import { ProviderIcon } from './View';

export const SelectModal = ({
  show,
  onClose,
  selected,
  onSelect,
  data,
  title,
  selector,
  onSelection,
  noName,
  searchText,
  setSearchText,
  canSearch,
}: {
  show: boolean;
  selector: string;
  onClose: () => void;
  selected: any;
  onSelect: (item: any) => void;
  onSelection: (item: any) => void;
  data: [] | undefined;
  title: string;
  noName?: boolean;
  searchText?: string;
  setSearchText?: (text: string) => void;
  canSearch?: boolean;
}) => {
  const styles = useStyles();
  return (
    <View>
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.viewWrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeBtn}
              onPress={onClose}>
              <Close size={18} />
            </TouchableOpacity>
            <TitleText text={title} size={14} />
          </View>
          {canSearch && (
            <TextInput
              placeholder="Search bank"
              placeholderTextColor="rgba(0,0,0,0.3)"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.search}
            />
          )}
          <View style={[styles.networks, canSearch && { height: '70%' }]}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <View style={styles.network}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onSelect(item)}
                    style={styles.row}>
                    {noName ? (
                      <TitleText
                        text={nairaFormat(item[selector], 0)}
                        size={14}
                      />
                    ) : (
                      <TitleText text={getName(item[selector])} size={14} />
                    )}
                  </TouchableOpacity>
                  <Checkbox
                    isChecked={
                      selected && selected[selector] === item[selector]
                    }
                    onPress={() => onSelect(item)}
                  />
                </View>
              )}
            />
          </View>
          <Button
            text="Continue"
            onPress={() => {
              onSelection(selected);
              onClose();
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export const NetworkModal = ({
  show,
  onClose,
  selectedNetwork,
  onSelect,
  data,
  title,
  largeIcon,
}: ModalProps) => {
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
              <TitleText text={title} size={14} />
            </View>
            <View style={styles.networks}>
              {data &&
                data.map((network, index) => (
                  <View style={styles.network} key={index}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => onSelect(network)}
                      style={styles.row}>
                      <Image
                        source={getImage(
                          getName(network.billCode).toLowerCase(),
                        )}
                        resizeMode="contain"
                        style={
                          largeIcon
                            ? styles.networkLogoLarge
                            : styles.networkLogo
                        }
                      />
                      <TitleText text={getName(network.billCode)} size={14} />
                    </TouchableOpacity>
                    <Checkbox
                      isChecked={selectedNetwork?.billCode === network.billCode}
                      onPress={() => onSelect(network)}
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
  title,
  data,
  networkName,
}: DataProps) => {
  const styles = useStyles();
  return (
    <View>
      <Modal isVisible={show} style={styles.modal}>
        <View style={styles.viewWrapper}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.closeBtn}
              onPress={onClose}>
              <Close size={18} />
            </TouchableOpacity>
            <TitleText text={title} size={14} />
          </View>
          <View style={styles.networks}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.network}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.row}
                    onPress={() => onSelect(item)}>
                    <ProviderIcon name={getName(networkName)} />
                    <View>
                      <View style={styles.textWrapper}>
                        <RegularText
                          text={item.dataName}
                          size={14}
                          style={styles.dataType}
                        />
                      </View>

                      <RegularText text={nairaFormat(item.amount)} size={12} />
                    </View>
                  </TouchableOpacity>
                  <Checkbox
                    isChecked={selectedNetwork?.dataCode === item.dataCode}
                    onPress={() => onSelect(item)}
                  />
                </View>
              )}
            />
          </View>
          <Button text="Continue" onPress={onClose} />
        </View>
      </Modal>
    </View>
  );
};

export const Loader = ({ show }: { show: boolean }) => {
  const styles = useStyles();
  return (
    <View>
      <Modal isVisible={show} style={styles.modal} animationIn="fadeIn">
        <ActivityIndicator size="small" color="rgba(249, 247, 246, 0.6)" />
      </Modal>
    </View>
  );
};

export const LogoutModal = ({ show, onCancel, handleLogout }) => {
  const styles = useStyles();
  return (
    <View>
      <Modal isVisible={show}>
        <View style={styles.logoutWrapper}>
          <TitleText text="Log Out" size={20} />
          <RegularText
            text="Oh no, you are leaving! Are you sure you want to log out?"
            size={11}
            style={styles.logoutText}
          />
          <Button
            onPress={onCancel}
            text="Cancel"
            style={styles.cancelLogout}
          />
          <TextButton
            onPress={handleLogout}
            text="Yes, I want to log out"
            style={styles.logoutBtn}
            textStyle={styles.logout}
          />
        </View>
      </Modal>
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    logoutWrapper: {
      backgroundColor: colors.input,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: ms(8),
      paddingVertical: ms(40),
      position: 'absolute',
      bottom: ms(90),
      width: '100%',
    },
    search: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      borderRadius: 4,
      paddingVertical: 12,
      paddingLeft: 6,
      color: '#000',
    },
    logoutText: {
      width: '60%',
      marginTop: ms(15),
      marginBottom: ms(20),
      textAlign: 'center',
      lineHeight: 20,
    },
    cancelLogout: {
      width: ms(92),
      height: ms(34),
      borderRadius: ms(64),
      marginBottom: ms(15),
    },
    logoutBtn: {
      alignSelf: 'center',
    },
    logout: {
      fontSize: 10,
    },
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
      height: '80%',
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
      width: ms(34),
      height: ms(34),
      borderRadius: ms(6),
      // borderRadius: 6,
      marginRight: ms(8),
    },
    networkLogoLarge: {
      width: ms(50),
      height: ms(50),
      borderRadius: ms(6),
      // borderRadius: 6,
      marginRight: ms(8),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textWrapper: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 220,
    },
    dataType: {
      lineHeight: 20,
      marginBottom: ms(1),
    },
  });
};
