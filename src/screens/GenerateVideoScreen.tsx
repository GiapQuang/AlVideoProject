import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, PermissionsAndroid, Platform } from 'react-native';
import Video from 'react-native-video';
import { launchImageLibrary } from 'react-native-image-picker';
import { invokeVideoGeneration, queryVideoGeneration, fetchVideoResult } from '../api/alVideoApi';

const GenerateVideoScreen = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Kiểm tra quyền truy cập file
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO ||
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Quyền truy cập Video',
            message: 'Ứng dụng cần quyền truy cập video của bạn',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Lỗi cấp quyền:', error);
        return false;
      }
    }
    return true; // iOS tự động có quyền
  };

  // Chọn video từ thư viện
  const handlePickVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Lỗi', 'Bạn cần cấp quyền để chọn video');
      return;
    }

    try {
      launchImageLibrary({ mediaType: 'video' }, (response) => {
        if (response.didCancel) {
          console.log('User canceled');
        } else if (response.errorMessage) {
          console.error('Error:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setSelectedFile(response.assets[0]); // Lưu video được chọn
        }
      });
    } catch (error) {
      console.error('Lỗi khi chọn video:', error);
    }
  };

  // Gửi video lên API và lấy video AI xử lý
  const handleGenerate = async () => {
    if (!selectedFile) {
      Alert.alert('Lỗi', 'Vui lòng chọn một video');
      return;
    }

    setLoading(true);
    try {
      // Bước 1: Gửi video lên API để AI xử lý
      const taskId = await invokeVideoGeneration(selectedFile.uri);

      // Bước 2: Đợi API xử lý xong với giới hạn số lần thử
      let fileId = '';
      let retries = 0;
      const maxRetries = 10; // Giới hạn số lần kiểm tra
      while (!fileId && retries < maxRetries) {
        const result = await queryVideoGeneration(taskId);
        if (result.status === 'Success') {
          fileId = result.file_id;
          break;
        } else if (result.status === 'Fail') {
          throw new Error('Video processing failed');
        }
        retries++;
        await new Promise((res) => setTimeout(res, 5000)); // Đợi 5s rồi kiểm tra lại
      }

      if (!fileId) {
        throw new Error('Hết thời gian chờ xử lý video');
      }

      // Bước 3: Lấy video đã xử lý
      const videoUrl = await fetchVideoResult(fileId);
      setVideoUrl(videoUrl);
    } catch (error:any) {
      Alert.alert('Lỗi', error.message || 'Không thể tạo video');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Chọn video để xử lý:</Text>
      <Button title="Chọn Video" onPress={handlePickVideo} />
      {selectedFile && <Text>Đã chọn: {selectedFile.fileName}</Text>}

      <Button title="Xử lý Video" onPress={handleGenerate} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {videoUrl ? (
        <View>
          <Text>Video đã xử lý:</Text>
          <Video
            source={{ uri: videoUrl }}
            style={{ width: '100%', height: 300 }}
            controls
          />
        </View>
      ) : null}
    </View>
  );
};

export default GenerateVideoScreen;
