import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { useTheme } from './Colors';
import { ms } from '@utils';

export const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const status = await Camera.checkDeviceCameraAuthorizationStatus();
        console.log('scanner', status);
      } catch (error) {
        console.log('scanner error', error);
      }
    })();
  }, []);

  const onFound = (event: any) => {
    console.log('QR code found', JSON.stringify(event.nativeEvent));
  };

  return (
    <View style={styles.scanner}>
      <View style={styles.wrapper}>
        <Camera scanBarcode={true} onReadCode={onFound} style={styles.camera} />
      </View>
    </View>
  );
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
      width: ms(180),
      height: ms(170),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      width: ms(180),
      height: ms(170),
    },
  });
};
