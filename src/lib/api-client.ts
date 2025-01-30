import axios from 'axios';

const apiClient = axios.create({
  withCredentials: true, // ✅ 쿠키 자동 전송
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default apiClient; 