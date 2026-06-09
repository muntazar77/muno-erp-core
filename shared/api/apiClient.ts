import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // إجبار المتصفح على إرسال واستقبال الـ Cookies مع كل طلب
});
