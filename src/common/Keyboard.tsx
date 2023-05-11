import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { RegularText } from './Text';
import { ms } from '@utils';
import { CancelKey } from '@icons';

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
  });
};
