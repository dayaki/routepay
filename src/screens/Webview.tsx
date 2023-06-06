import React, { useRef, useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import qs from 'qs';
import type {
  WebViewNativeEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';
import {
  apiService,
  getTransactionStatus,
  getUniqueID,
  postCharge,
  postPaymentToken,
} from '@utils';
import { useAppSelector } from '@store';

const LoadingView = () => (
  <View style={styles.loadingView}>
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const Webview = ({ route, navigation }) => {
  const { params } = route.params;
  // const { order } = useAppSelector(state => state.misc);
  console.log('browser params', params);
  // console.log('order', order);
  const [hasRedirected, setHasRedirected] = useState(false);
  const webview = useRef<WebView>(null);

  const onPaystackMessage = (syntheticEvent: WebViewMessageEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.data === 'cancel') {
      navigation.goBack();
    }
  };

  const onNavigationStateChange = async (event: WebViewNativeEvent) => {
    const { url } = event;
    console.log('onNavigationStateChange URL', url);
    // console.log('onNavigationStateChange TITLE', title);

    const runFirst = `
    let rootElements = document.querySelector("body");
    rootElements.addEventListener("click", (event) => {
        let targetElement = event.target;

        while (targetElement != null) {
            if (targetElement.nodeName === "BUTTON") {
                if (targetElement.innerHTML.includes("Cancel")) {
                    window.ReactNativeWebView.postMessage("cancel");
                }
                return;
            }
            targetElement = targetElement.parentElement;
        }
    },
    true
    );
    true; // note: this is required, or you'll sometimes get silent failures
    `;

    // if (title.includes('Route Pay')) {
    //   webview.current?.injectJavaScript(runFirst);
    // }

    if (url.includes('callback.routepay.com/return')) {
      webview.current?.stopLoading();
      setHasRedirected(true);
      console.log('show redirect....');
      navigation.navigate('transaction_success', {
        trnxRef: params.reference,
        type: params.type,
      });
      // verifyTransaction();
    }
  };

  // const verifyTransaction = async () => {
  //   try {
  //     const {
  //       data: { access_token },
  //     } = await axios({
  //       method: 'post',
  //       url: postPaymentToken,
  //       data: qs.stringify({
  //         grant_type: 'client_credentials',
  //         client_id: 'yMesQUqwMDFebeb',
  //         client_secret: 'BUAIQoSElenGnypcfLJftByjcMsLEd',
  //       }),
  //       headers: {
  //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     });
  //     console.log('Webview TOKEN', access_token);
  //     const { data: transResp } = await axios({
  //       method: 'get',
  //       url: getTransactionStatus(params.reference),
  //       headers: {
  //         'content-type': 'application/json;charset=utf-8',
  //         Authorization: `Bearer ${params.access_token}`,
  //       },
  //     });
  //     // ///////
  //     //   const { data: transResp } = await axios.get(
  //     //     getTransactionStatus(params.reference),
  //     //     {
  //     //       headers: {
  //     //         Authorization: `Bearer ${params.access_token}`,
  //     //       },
  //     //     },
  //     //   );
  //     console.log('verifyTransaction', transResp);
  //     const { paymentStatus, paymentDescription } = transResp;
  //     if (paymentStatus === 0 && paymentDescription === 'Successful') {
  //       navigation.navigate('transaction_success', {
  //         trnxRef: params.reference,
  //       });
  //     }
  //   } catch (error) {
  //     console.log('verifyTransaction ERR', error);
  //   }
  // };

  const runFirst = `
    let rootElement = document.querySelector("body");
    rootElement.addEventListener("click", function(event) {
        let targetElement = event.target;
        while (targetElement != null) {
          if (targetElement.nodeName === "BUTTON") {
            if (targetElement.innerHTML.includes("Cancel")) {
              window.ReactNativeWebView.postMessage("cancel");
            }
            return;
          }
          targetElement = targetElement.parentElement;
        }
    },
  true
);

      true; // note: this is required, or you'll sometimes get silent failures
    `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <WebView
        source={params}
        ref={webview}
        startInLoadingState={true}
        // renderLoading={LoadingView}
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onMessage={onPaystackMessage}
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={
          !hasRedirected ? onNavigationStateChange : null
        }
        injectedJavaScriptBeforeContentLoaded={runFirst}
        mixedContentMode="always"
        thirdPartyCookiesEnabled
      />
    </SafeAreaView>
  );
};

export default Webview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingView: {
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
  },
  activityIndicator: {
    alignSelf: 'center',
    width: 100,
    height: 150,
  },
});
