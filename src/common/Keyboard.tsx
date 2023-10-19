import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RegularText, TitleText } from './Text';
import { ms } from '@utils';
import { CancelKey } from '@icons';
import { useTheme } from './Colors';

export const Keyboard = ({
  handleDelete,
  handleInput,
  icon,
  iconPress,
  style,
}) => {
  const styles = useStyles();
  return (
    <View style={[styles.keyboardGrid, style]}>
      <View style={styles.topPanel}>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('1')}>
          <RegularText style={styles.keyText} text="1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('2')}>
          <RegularText style={styles.keyText} text="2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('3')}>
          <RegularText style={styles.keyText} text="3" />
        </TouchableOpacity>
      </View>

      <View style={styles.panel}>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('4')}>
          <RegularText style={styles.keyText} text="4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('5')}>
          <RegularText style={styles.keyText} text="5" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('6')}>
          <RegularText style={styles.keyText} text="6" />
        </TouchableOpacity>
      </View>

      <View style={styles.panel}>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('7')}>
          <RegularText style={styles.keyText} text="7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('8')}>
          <RegularText style={styles.keyText} text="8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('9')}>
          <RegularText style={styles.keyText} text="9" />
        </TouchableOpacity>
      </View>

      <View style={styles.panel}>
        <TouchableOpacity style={styles.keySpace}></TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => handleInput('0')}>
          <RegularText style={styles.keyText} text="0" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteKey} onPress={handleDelete}>
          <CancelKey size={37} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TransactionPIN = ({
  handleSubmit,
  external,
  hasError,
  resetError,
}: {
  handleSubmit: (pin: string) => void;
  resetError?: () => void;
  external?: boolean;
  hasError?: boolean;
}) => {
  const styles = useStyles();
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (pin.length === 4) {
      if (external) {
        handleSubmit(pin);
      } else {
        setTimeout(() => {
          handleSubmit(pin);
          setPin('');
        }, 200);
      }
    }
  }, [pin]);

  const handleInput = (value: string) => {
    console.log('handleInput', value);
    // resetError();
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleDelete = () => {
    if (pin.length) {
      let pinCode = pin.split('');
      pinCode.pop();
      let newPin = pinCode.join('');
      setPin(newPin);
    }
  };

  return (
    <View style={styles.centered}>
      <View style={styles.indicator}>
        {pin.length > 0 && !hasError ? (
          <TitleText text={pin[0]} size={20} style={styles.pinText} />
        ) : (
          <View style={styles.pinDot} />
        )}
        {pin.length > 0 && !hasError ? (
          <TitleText text={pin[1]} size={20} style={styles.pinText} />
        ) : (
          <View style={styles.pinDot} />
        )}
        {pin.length > 0 && !hasError ? (
          <TitleText text={pin[2]} size={20} style={styles.pinText} />
        ) : (
          <View style={styles.pinDot} />
        )}
        {pin.length > 0 && !hasError ? (
          <TitleText text={pin[3]} size={20} style={styles.pinText} />
        ) : (
          <View style={styles.pinDot} />
        )}
      </View>
      <Keyboard handleInput={handleInput} handleDelete={handleDelete} />
    </View>
  );
};

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    keyboardGrid: {
      // height: hp(200),
    },
    topPanel: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: ms(305),
    },
    key: {
      width: ms(80),
      height: ms(80),
      borderRadius: ms(40),
      backgroundColor: colors.input,
      justifyContent: 'center',
      alignItems: 'center',
    },
    keySpace: {
      width: ms(80),
      height: ms(80),
    },
    deleteKey: {
      width: ms(80),
      height: ms(80),
      justifyContent: 'center',
      alignItems: 'center',
    },
    keyText: {
      fontSize: 24,
      color: colors.text,
      fontWeight: '500',
    },
    panel: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: ms(305),
      marginTop: ms(20),
    },
    centered: {
      alignItems: 'center',
    },
    indicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: ms(60),
      height: ms(22),
      alignSelf: 'center',
      justifyContent: 'center',
    },
    pinDot: {
      width: ms(11),
      height: ms(11),
      borderRadius: 6,
      marginRight: ms(7),
      backgroundColor: colors.input,
    },
    pinText: {
      marginRight: ms(10),
    },
  });
};
