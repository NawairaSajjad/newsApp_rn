


import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function ArticleScreen() {
  const { url } = useLocalSearchParams();

  if (!url || typeof url !== 'string') {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Invalid or missing URL</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView source={{ uri: decodeURIComponent(url) }} startInLoadingState />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
