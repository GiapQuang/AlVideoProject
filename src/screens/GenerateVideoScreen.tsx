import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { generateVideo } from '../api/alVideoApi';

const GenerateVideoScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateVideo(prompt);
      setVideoUrl(data.video_url); // Giả sử API trả về 'video_url'
    } catch (error) {
      console.error('Failed to generate video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nhập mô tả video AI:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Ví dụ: Một chú chó chạy trên bãi biển"
      />
      <Button title="Tạo Video" onPress={handleGenerate} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {videoUrl ? (
        <Text>Video đã tạo: {videoUrl}</Text>
      ) : null}
    </View>
  );
};

export default GenerateVideoScreen;
