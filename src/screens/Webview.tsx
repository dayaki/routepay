import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import type {
  WebViewNativeEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';

const Webview = ({ route, navigation }) => {
  const { params } = route.params;
  console.log('browser params', params);
  const [hasRedirected, setHasRedirected] = useState(false);
  const webview = useRef<WebView>(null);

  const onPaystackMessage = (syntheticEvent: WebViewMessageEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log('Webview nativeEvent', nativeEvent);
    if (nativeEvent.data === 'cancel') {
      navigation.goBack();
    }
  };

  const onNavigationStateChange = async (event: WebViewNativeEvent) => {
    const { url } = event;
    console.log('onNavigationStateChange URL', url);

    if (url.includes('/about-routepay')) {
      webview.current?.stopLoading();
      setHasRedirected(true);
      navigation.navigate('transaction_success', {
        trnxRef: params.reference,
        type: params.type,
        access_token: params.access_token,
      });
    }

    if (url.startsWith('https://apiqa.routepay')) {
      webview.current?.stopLoading();
      setHasRedirected(true);
      navigation.navigate('bvn_verification', {
        data: params.data,
      });
    }
  };

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
