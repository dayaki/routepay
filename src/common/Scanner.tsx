import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import { Camera } from 'react-native-camera-kit';
import { useTheme } from './Colors';
import { ms } from '@utils';

export const Scanner = ({ onDone }: { onDone: (code: string) => void }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const styles = useStyles();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'RoutePay Camera Permission',
              message:
                'RoutePay needs access to your camera ' +
                'so you can scan QRcodes',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermission(true);
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        try {
          const permission = await checkMultiple([
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
          ]);
          if (
            permission[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED ||
            permission[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED
          ) {
            setHasPermission(true);
          } else if (
            permission[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED ||
            permission[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.DENIED
          ) {
            await requestMultiple([
              PERMISSIONS.IOS.CAMERA,
              PERMISSIONS.IOS.PHOTO_LIBRARY,
            ]);
            setHasPermission(true);
          } else if (
            permission[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
            permission[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.BLOCKED
          ) {
            await openSettings();
          }
        } catch (error) {
          console.log('camera error', error);
        }
      }
    })();
  }, []);

  const onFound = ({ nativeEvent }: any) => {
    const { codeStringValue } = nativeEvent;
    onDone(codeStringValue);
  };

  return isFocused && hasPermission ? (
    <View style={styles.scanner}>
      <View style={styles.wrapper}>
        <Camera scanBarcode={true} onReadCode={onFound} style={styles.camera} />
      </View>
    </View>
  ) : null;
};

export const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    scanner: {
      flex: 1,
      //   backgroundColor: 'pink',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: {
      backgroundColor: colors.input,
      width: Platform.OS === 'android' ? ms(180) : '100%',
      height: Platform.OS === 'android' ? ms(170) : ms(400),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      // width: ms(180),
      // height: ms(170),
      width: Platform.OS === 'android' ? ms(180) : '80%',
      height: Platform.OS === 'android' ? ms(170) : '80%',
      alignSelf: 'center',
    },
  });
};
