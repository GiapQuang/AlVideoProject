import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJHacOhcCDEkOG7lyBRdWFuZyIsIlVzZXJOYW1lIjoiR2nDoXAgxJDhu5cgUXVhbmciLCJBY2NvdW50IjoiIiwiU3ViamVjdElEIjoiMTg5OTMxODE3NjM5MTM2OTA1OSIsIlBob25lIjoiIiwiR3JvdXBJRCI6IjE4OTkzMTgxNzYzODcxNzQ3NTUiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJxdWFuZ2dpYXBhcm1vckBnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNS0wMy0xMSAxNTowNzoyNCIsIlRva2VuVHlwZSI6MSwiaXNzIjoibWluaW1heCJ9.INx5orMBTAyF6JEhv4pLXNGeXSOv8BhtLZqwJOhipmbQjqun5VN42ekE-IVs1TD753W3L3mn05u2iLxXSTtvarws3wsbrRtbLY1G5KrsO3brXOEUMu18bqcNmV5zMLEsFZ9FMIydSzldrSf_cwrT-fObW96DFfpi93ohmn640zo6vPxWnRH_MSM0cntjWh8uQ4z_6Z0b32rwJBWQa-tIAEV2iNj4H07qJgXbxo2slsHePt-IHD8FVcaJBPD6RX-NfUEZUk9z4Y-oOXcQXlO4rt6NKrII_iDIOr7QnJ8T8TkkJ8aL-5gRjEbNi7mRpp4ICOfnBZFbuCocyg-tv6qslQ';
const BASE_URL = 'https://api.minimaxi.chat/v1';

export const invokeVideoGeneration = async (
  prompt: string,
): Promise<string> => {
  console.log('Calling API with prompt:', prompt);
  try {
    const response = await axios.post(
      `${BASE_URL}/video_generation`,
      {prompt, model: 'T2V-01'},
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('API response:', response.data);
    return response.data.task_id;
  } catch (error) {
    console.error('Error invoking video generation:', error);
    throw error;
  }
};

export const queryVideoGeneration = async (
  taskId: string,
): Promise<{status: string; file_id?: string}> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/query/video_generation?task_id=${taskId}`,
      {
        headers: {Authorization: `Bearer ${API_KEY}`},
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error querying video generation:', error);
    throw error;
  }
};

export const fetchVideoResult = async (fileId: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/files/retrieve?file_id=${fileId}`,
      {
        headers: {Authorization: `Bearer ${API_KEY}`},
      },
    );
    return response.data.file.download_url;
  } catch (error) {
    console.error('Error fetching video result:', error);
    throw error;
  }
};
