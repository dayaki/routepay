import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
// import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { RegularText } from '@common';
import { ChevronBack, Exclamation } from '@icons';
import { useStyles } from '../styles';

const ScanPay = ({ navigation }) => {
  //   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //     checkInverted: true,
  //   });
  const styles = useStyles();
  //   const devices = useCameraDevices();
  //   const device = devices.back;

  //   useEffect(() => {
  //     (async () => {
  //       const cameraPermission = await Camera.getCameraPermissionStatus();
  //       console.log('cameraPermission', cameraPermission);
  //       if (cameraPermission === 'not-determined') {
  //         Camera.requestCameraPermission();
  //       }
  //       //   setUsers(users);
  //     })();

  //     // return () => {
  //     //   // this now gets called when the component unmounts
  //     // };
  //   }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <ChevronBack />
          </TouchableOpacity>
          <View>
            {/* {device && (
              <>
                <Camera
                  style={StyleSheet.absoluteFill}
                  device={device}
                  isActive={true}
                  frameProcessor={frameProcessor}
                  frameProcessorFps={5}
                />
                {barcodes.map((barcode, idx) => (
                  <Text key={idx} style={styles.barcodeTextURL}>
                    {barcode.displayValue}
                  </Text>
                ))}
              </>
            )} */}
          </View>
        </View>
        <View style={styles.reviewInfo}>
          <Exclamation />
          <RegularText
            text="Please ensure the QR code fits into the scan area"
            size={14}
            style={styles.reviewInfoText}
          />
        </View>
      </View>
    </View>
  );
};
export default ScanPay;
