import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');

const NEXT_PUBLIC_BASE_URL = `https://calendars2.duckdns.org`;

export const instance = axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
