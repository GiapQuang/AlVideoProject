import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJHacOhcCDEkOG7lyBRdWFuZyIsIlVzZXJOYW1lIjoiR2nDoXAgxJDhu5cgUXVhbmciLCJBY2NvdW50IjoiIiwiU3ViamVjdElEIjoiMTg5OTMxODE3NjM5MTM2OTA1OSIsIlBob25lIjoiIiwiR3JvdXBJRCI6IjE4OTkzMTgxNzYzODcxNzQ3NTUiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJxdWFuZ2dpYXBhcm1vckBnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNS0wMy0xMiAxNTo0NjoyOSIsIlRva2VuVHlwZSI6MSwiaXNzIjoibWluaW1heCJ9.oveWIe0nWD2B3TGWxPQa3xh1zCwvz8BBX_94cNb9TTU_MYPrp3amUjG7VNtjjT021HsnbX94qtNW0BoBpFhvN-fpR-EsCMLq5WmcVmKxvZFfg3M43hbM57lCQnwhuuSyM72NDhA_JY5k4Rv4WQMEB72FlXcsBXmtzeuOsyxrdDyfgis5bleWOaDHMwneGr901cAFcHLrqXiv7j-0CEHfc-BQD50StSeFyoUrfiBvms9Jhha794O5Zz2LjMzoZbQ7PGOmJ2Geg3ONGMQ9RFzeMmSdmppr5ZjpVReK1SzMY43gfhCj91fbwOkB72OXMK0qbUMJ8I-AUoIOIhkdK_rc9g';
const BASE_URL = 'https://api.minimaxi.chat/v1';

// 🟢 Tạo video từ prompt
export const generateVideo = async prompt => {
  try {
    const response = await axios.post(
      `${BASE_URL}/video_generation`,
      {
        prompt,
        model: 'T2V-01',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    return response.data.task_id;
  } catch (error) {
    console.error('Lỗi khi tạo video:', error);
    throw new Error('Không thể tạo video');
  }
};

// 🟡 Kiểm tra trạng thái video
export const checkVideoStatus = async taskId => {
  try {
    const response = await axios.get(`${BASE_URL}/query/video_generation`, {
      params: {task_id: taskId},
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra trạng thái video:', error);
    throw new Error('Không thể kiểm tra trạng thái video');
  }
};

// 🔵 Tải video về
export const downloadVideo = async fileId => {
  try {
    const response = await axios.get(`${BASE_URL}/files/retrieve`, {
      params: {file_id: fileId},
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return response.data.file.download_url;
  } catch (error) {
    console.error('Lỗi khi tải video:', error);
    throw new Error('Không thể tải video');
  }
};
