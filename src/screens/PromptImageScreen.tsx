import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';

const PromptTextScreen = ({route, navigation}) => {
  console.log('Route Params:', route.params);
  if (!route.params || !route.params.imageUri) {
    console.log('Missing imageUri in route params:', route.params);
    Alert.alert('Error', 'No image received');
    return null;
  }

  const {imageUri} = route.params;
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // Xử lý logic generate video ở đây
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Video generated successfully!');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image} />
      <Text style={styles.label}>Enter Prompt:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your prompt here..."
        value={prompt}
        onChangeText={setPrompt}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Generate Video" onPress={handleGenerate} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default PromptTextScreen;
