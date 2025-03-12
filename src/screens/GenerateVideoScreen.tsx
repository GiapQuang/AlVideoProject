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
  Alert,
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
      const permissions =
        Platform.Version >= 33
          ? [
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]
          : [
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const allGranted = Object.values(granted).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (!allGranted) {
        Alert.alert(
          'Permission Denied',
          'You need to grant storage permissions to continue.',
        );
        return false;
      }
      return true;
    } catch (err) {
      console.error('Permission error:', err);
      Alert.alert(
        'Error',
        'Something went wrong while requesting permissions.',
      );
      return false;
    }
  }
  return true;
};

const GenerateVideoScreen = () => {
  const navigation = useNavigation();

  const handlePress = async id => {
    if (id === '1') {
      navigation.navigate('PromptTextScreen');
      return;
    }

    if (id === '2') {
      // Chỉ yêu cầu quyền khi người dùng bấm vào Image to Video
      const granted = await requestPermission();
      console.log('Permission granted:', granted);

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
          Alert.alert('Error', response.errorMessage);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0].uri;
          console.log('Selected Image:', selectedImage);

          if (!selectedImage) {
            Alert.alert('Error', 'No image selected');
            return;
          }

          // Chuyển màn hình với ảnh đã chọn
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
