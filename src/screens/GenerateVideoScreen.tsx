import {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const options = [
  {
    id: '1',
    title: 'Text to Video',
    image: require('../assets/images/images.jpg'),
  },
  {
    id: '2',
    title: 'Image to Video',
    image: require('../assets/images/images(1).jpg'),
  },
  {
    id: '3',
    title: 'Video extend',
    image: require('../assets/images/images(2).jpg'),
  },
];

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES // Android 13+
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE; // Android 12 trở xuống

      const granted = await PermissionsAndroid.request(permission, {
        title: 'Permission Required',
        message: 'App needs access to your photos to continue',
        buttonPositive: 'OK',
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  }
  return true;
};

const GenerateVideoScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);

  const handlePress = async id => {
    if (id === '1') {
      navigation.navigate('PromptTextScreen');
    }
    if (id === '2') {
      // Chỉ yêu cầu quyền khi người dùng bấm vào nút
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert('Error', 'Permission denied');
        return;
      }

      launchImageLibrary({mediaType: 'photo'}, response => {
        console.log('Image Picker Response:', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }
        if (response.errorMessage) {
          console.log('Image Picker Error:', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          console.log('Selected Image:', selectedImage);
          navigation.navigate('PromptImageScreen', {imageUri: selectedImage});
        } else {
          console.log('No image selected');
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.id)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
  },
  card: {
    width: 120,
    height: 140,
    backgroundColor: '#222',
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default GenerateVideoScreen;
