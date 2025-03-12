import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  generateVideo,
  checkVideoStatus,
  downloadVideo,
} from '../api/textVideoApi';

const PromptTextScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung');
      return;
    }

    setLoading(true);
    try {
      const taskId = await generateVideo(prompt);
      Alert.alert('Thành công', 'Đang tạo video, vui lòng đợi...');
      // Kiểm tra trạng thái liên tục
      const interval = setInterval(async () => {
        const statusResponse = await checkVideoStatus(taskId);
        console.log('Trạng thái:', statusResponse.status);

        if (statusResponse.status === 'Success') {
          clearInterval(interval);
          const url = await downloadVideo(statusResponse.file_id);
          setVideoUrl(url);
          Alert.alert('Thành công', 'Video đã sẵn sàng để tải xuống');
          setLoading(false);
        } else if (statusResponse.status === 'Fail') {
          clearInterval(interval);
          Alert.alert('Lỗi', 'Tạo video thất bại');
          setLoading(false);
        }
      }, 5000);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập nội dung:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung tạo video..."
        value={prompt}
        onChangeText={setPrompt}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Tạo Video" onPress={handleGenerate} />
      )}
      {videoUrl ? (
        <Text style={styles.downloadText}>Link tải: {videoUrl}</Text>
      ) : null}
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
  downloadText: {
    color: '#fff',
    marginTop: 10,
  },
});

export default PromptTextScreen;
