import axios from 'axios';

const API_URL = 'https://api.minimaxi.chat/v1/video_generation';
const API_KEY = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJHacOhcCDEkOG7lyBRdWFuZyIsIlVzZXJOYW1lIjoiR2nDoXAgxJDhu5cgUXVhbmciLCJBY2NvdW50IjoiIiwiU3ViamVjdElEIjoiMTg5ODg2NzI0NjU3MTIwMTI1MSIsIlBob25lIjoiIiwiR3JvdXBJRCI6IjE4OTg4NjcyNDY1NjcwMDYzMzIiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJxdWFuZ2dpYXBkb0BnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNS0wMy0xMCAxODo0MzoxNiIsIlRva2VuVHlwZSI6MSwiaXNzIjoibWluaW1heCJ9.G5xOHyuFb6xhFJdBf8f0hB6ZTUTyCUoIwWWbuJsjzShn6omc3PcBSb_AJlRAUvgitsuFiamxPZcO6lo0QoSN5nA2DgH4pk6auCEB2Z8VCx-iZytKUoOe8jGsmYuBOU7wWJ5r6s3M8tm6aYfXye-STO_PB6GIBtE4Y3kc6oayogP6lEqlZsRtn4vcyaGMM1Kz2YIgPZEofB7LODBDyPDFD37yffc3uPcyt-udw502tEPhCX2GZ2ThYxmrowKaeiDwzPjRtva-ODqRblrqpkVL4eJdEHHufCEt-s_kb_WjhyTh_GUJIjbP21wtelqR-iqEgxeumYNmhKSg08gUOWaThw'; // Thay thế bằng API Key của bạn

export const generateVideo = async (prompt: string) => {
  try {
    const response = await axios.post(
      API_URL,
      { prompt }, // Gửi prompt lên AI Video API
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data; // Dữ liệu video trả về từ API
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
};
