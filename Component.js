// Component.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DownloadManager = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadResumable, setDownloadResumable] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const startDownload = async () => {
    const downloadResumable = FileSystem.createDownloadResumable(
			'http://techslides.com/demos/sample-videos/small.mp4',
			FileSystem.documentDirectory + 'small.mp4',
			{},
			callback
	  );
    setDownloadResumable(downloadResumable);

    try {
      setIsDownloading(true);
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
      setIsDownloading(false);
    } catch (e) {
      console.error(e);
      setIsDownloading(false);
    }
  };

  const pauseDownload = async () => {
    try {
      await downloadResumable.pauseAsync();
      console.log('Paused download operation, saving for future retrieval');
      await AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
    } catch (e) {
      console.error(e);
    }
  };

  //To resume a download across app restarts, assuming the DownloadResumable.savable() object was stored:
  const resumeDownload = async () => {
    const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
    if (downloadSnapshotJson) {
      const downloadSnapshot = JSON.parse(downloadSnapshotJson);
      const downloadResumable = new FileSystem.DownloadResumable(
        downloadSnapshot.url,
        downloadSnapshot.fileUri,
        downloadSnapshot.options,
        callback,
        downloadSnapshot.resumeData
      );
      setDownloadResumable(resumable);
      try {
        setIsDownloading(true);
        const { uri } = await downloadResumable.resumeAsync();
        console.log('Finished downloading to ', uri);
        setIsDownloading(false);
      } catch (e) {
        console.error(e);
        setIsDownloading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Download Example</Text>
      {isDownloading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.progress}>{(downloadProgress * 100).toFixed(2)}%</Text>
          <Button title="Pause Download" onPress={pauseDownload} />
        </>
      ) : (
        <>
          <Button title="Start Download" onPress={startDownload} />
          <Button title="Resume Download" onPress={resumeDownload} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  progress: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DownloadManager;
