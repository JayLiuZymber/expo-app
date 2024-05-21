/* 
Assets - Expo Documentation
https://docs.expo.dev/develop/user-interface/assets/
 */
import { Image } from 'react-native';
import { useAssets } from 'expo-asset';

export default function App() {
  const [assets, error] = useAssets([
    require('./path/to/example-1.jpg'),
    require('./path/to/example-2.png'),
  ]);

  return assets ? <Image source={assets[0]} /> : null;
}
