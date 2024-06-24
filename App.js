/* 
Store data - Expo Documentation
https://docs.expo.dev/develop/user-interface/store-data/
FileSystem - Expo Documentation
https://docs.expo.dev/versions/latest/sdk/filesystem/
 */
// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DownloadManager from './Component';

export default function App() {
  return (
    <View style={styles.container}>
      <DownloadManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
