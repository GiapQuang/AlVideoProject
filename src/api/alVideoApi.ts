import axios from 'axios';

const API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJHacOhcCDEkOG7lyBRdWFuZyIsIlVzZXJOYW1lIjoiR2nDoXAgxJDhu5cgUXVhbmciLCJBY2NvdW50IjoiIiwiU3ViamVjdElEIjoiMTg5ODg2NzI0NjU3MTIwMTI1MSIsIlBob25lIjoiIiwiR3JvdXBJRCI6IjE4OTg4NjcyNDY1NjcwMDYzMzIiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJxdWFuZ2dpYXBkb0BnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNS0wMy0xMCAxODo0MzoxNiIsIlRva2VuVHlwZSI6MSwiaXNzIjoibWluaW1heCJ9.G5xOHyuFb6xhFJdBf8f0hB6ZTUTyCUoIwWWbuJsjzShn6omc3PcBSb_AJlRAUvgitsuFiamxPZcO6lo0QoSN5nA2DgH4pk6auCEB2Z8VCx-iZytKUoOe8jGsmYuBOU7wWJ5r6s3M8tm6aYfXye-STO_PB6GIBtE4Y3kc6oayogP6lEqlZsRtn4vcyaGMM1Kz2YIgPZEofB7LODBDyPDFD37yffc3uPcyt-udw502tEPhCX2GZ2ThYxmrowKaeiDwzPjRtva-ODqRblrqpkVL4eJdEHHufCEt-s_kb_WjhyTh_GUJIjbP21wtelqR-iqEgxeumYNmhKSg08gUOWaThw'; // Thay thế bằng API Key của bạn
const BASE_URL = 'https://api.minimaxi.chat/v1';

export const invokeVideoGeneration = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/video_generation`,
      { prompt, model: 'T2V-01' },
      { headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' } }
    );
    return response.data.task_id;
  } catch (error) {
    console.error('Error invoking video generation:', error);
    throw error;
  }
};

export const queryVideoGeneration = async (taskId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/query/video_generation?task_id=${taskId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error querying video generation:', error);
    throw error;
  }
};

export const fetchVideoResult = async (fileId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/files/retrieve?file_id=${fileId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    return response.data.file.download_url;
  } catch (error) {
    console.error('Error fetching video result:', error);
    throw error;
  }
};
