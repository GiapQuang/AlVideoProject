import React, {useState} from 'react';
import {View, Text, Button, ActivityIndicator, TextInput} from 'react-native';
import {
  invokeVideoGeneration,
  queryVideoGeneration,
  fetchVideoResult,
} from '../api/alVideoApi';

const VideoGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    console.log('generateVideo function called');
    if (!prompt.trim()) {
      setStatus('Please enter a video description.');
      return;
    }

    setLoading(true);
    setStatus('Submitting request...');
    console.log('Calling invokeVideoGeneration...');

    try {
      const taskId = await invokeVideoGeneration(prompt);
      console.log('Task ID:', taskId);
      setStatus('Processing...');

      let fileId: string | undefined = undefined;

      while (!fileId) {
        console.log('Waiting for task to complete...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        const queryResult = await queryVideoGeneration(taskId);
        console.log('Query result:', queryResult);

        if (queryResult.status === 'Success') {
          fileId = queryResult.file_id;
        } else if (queryResult.status === 'Fail') {
          setStatus('Failed to generate video');
          setLoading(false);
          return;
        } else {
          setStatus(`Status: ${queryResult.status}...`);
        }
      }

      if (fileId) {
        const videoDownloadUrl = await fetchVideoResult(fileId);
        console.log('Video URL:', videoDownloadUrl);
        setVideoUrl(videoDownloadUrl);
        setStatus('Video generated successfully!');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setStatus('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Enter video description..."
        value={prompt}
        onChangeText={setPrompt}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
      />
      <Button title="Generate Video" onPress={generateVideo} />
      {loading && <ActivityIndicator size="large" />}
      <Text>{status}</Text>
      {videoUrl ? <Text>Video URL: {videoUrl}</Text> : null}
    </View>
  );
};

export default VideoGenerator;
