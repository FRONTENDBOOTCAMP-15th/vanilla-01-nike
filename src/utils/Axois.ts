import axios from 'axios';

const API_SERVER = import.meta.env.VITE_API_SERVER_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export function getAxios() {
  const instance = axios.create({
    baseURL: API_SERVER, // 기본 URL
    headers: {
      'Content-Type': 'application/json', // 요청 바디의 데이터 타입
      Accept: 'application/json', // 응답 바디의 데이터 타입
      'Client-Id': CLIENT_ID,
    },
  });
  return instance;
}
