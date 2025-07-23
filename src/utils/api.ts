import axios, { AxiosInstance } from 'axios';

import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.apiKey;

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;
