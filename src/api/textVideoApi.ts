import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJHacOhcCDEkOG7lyBRdWFuZyIsIlVzZXJOYW1lIjoiR2nDoXAgxJDhu5cgUXVhbmciLCJBY2NvdW50IjoiIiwiU3ViamVjdElEIjoiMTg5ODg2NzI0NjU3MTIwMTI1MSIsIlBob25lIjoiIiwiR3JvdXBJRCI6IjE4OTg4NjcyNDY1NjcwMDYzMzIiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJxdWFuZ2dpYXBkb0BnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNS0wMy0xMiAxNzozNDo0OCIsIlRva2VuVHlwZSI6MSwiaXNzIjoibWluaW1heCJ9.PNE9CGYYpuC12iC2sXvp9947ncxx0r0NbbCHe0vzgy-OBHA0NgyTehKe4-TxykVlMjA35U61zrNESr78SREb1m5RKanXjj1H5nIevcQB5ovh5smW49HlZ5ebrVyUHUmSv7Y-k5bDOtig_7hPfKK6JtXkhE2WHIcDleSQmGJtt1TEnn2cMHuvuaL-PovrZMPcWNB8jezvUkrHhs18G1kjh6H0WS7a7xEs9DOLbXZHAOoEuRYjz5n_UdM3sUtjxfzAFhULQOuokYQJL2j6JwhAMDjegInBvbMsLEfhocXEC6ZN2wm9ggJR_1mUNQNuBFKQNFI4Mz3YQ98oh5pTvCDaoQ';
const BASE_URL = 'https://api.minimaxi.chat/v1';

// 🟢 Tạo video từ prompt
export const generateVideo = async prompt => {
  try {
    console.log('🔵 Gửi request tạo video với prompt:', prompt);
    const response = await axios.post(
      `${BASE_URL}/video_generation`,
      {prompt, model: 'T2V-01'},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );
    console.log('✅ Response từ API:', response.data);
    return response.data.task_id; // Kiểm tra nếu response.data có task_id không
  } catch (error) {
    console.error('🔴 Lỗi khi tạo video:', error.response?.data || error);
    throw new Error('Không thể tạo video');
  }
};

// 🟡 Kiểm tra trạng thái video
export const checkVideoStatus = async taskId => {
  try {
    console.log(`🟡 Kiểm tra trạng thái của video Task ID: ${taskId}`);
    const response = await axios.get(`${BASE_URL}/query/video_generation`, {
      params: {task_id: taskId},
      headers: {Authorization: `Bearer ${API_KEY}`},
    });
    console.log('✅ Trạng thái video:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      '❌ Lỗi khi kiểm tra trạng thái video:',
      error?.response?.data || error,
    );
    throw new Error('Không thể kiểm tra trạng thái video');
  }
};

// 🔵 Tải video về
export const downloadVideo = async fileId => {
  try {
    console.log(`🟢 Tải video với File ID: ${fileId}`);
    const response = await axios.get(`${BASE_URL}/files/retrieve`, {
      params: {file_id: fileId},
      headers: {Authorization: `Bearer ${API_KEY}`},
    });
    console.log('✅ Link tải video:', response.data.file.download_url);
    return response.data.file.download_url;
  } catch (error) {
    console.error('❌ Lỗi khi tải video:', error?.response?.data || error);
    throw new Error('Không thể tải video');
  }
};
