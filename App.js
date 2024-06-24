/* 
Store data - Expo Documentation
https://docs.expo.dev/develop/user-interface/store-data/
Usage | Async Storage
https://react-native-async-storage.github.io/async-storage/docs/usage
 */
// App.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  // 當組件掛載時，嘗試讀取已存儲的值
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const value = await AsyncStorage.getItem('my-key');
        if (value !== null) {
          setStoredValue(value);
        }
      } catch (e) {
        console.error('Failed to fetch the data from storage');
      }
    };
    
    loadStoredValue();
  }, []);

  // 存儲數據到 AsyncStorage
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('my-key', inputValue);
      setStoredValue(inputValue);
      setInputValue('');
    } catch (e) {
      console.error('Failed to save the data to the storage');
    }
  };

  // 刪除數據從 AsyncStorage
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('my-key');
      setStoredValue('');
    } catch (e) {
      console.error('Failed to remove the data from the storage');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage 範例</Text>
      <TextInput
        style={styles.input}
        placeholder="輸入一些文字"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <Button title="存儲" onPress={storeData} />
      <Text style={styles.storedValue}>存儲的值: {storedValue}</Text>
      <Button title="刪除存儲的值" onPress={removeData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  storedValue: {
    marginVertical: 16,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
