import axios, { AxiosInstance } from 'axios';

/**
 * API key loaded from Expo config extra fields.
 * Should be defined in your app config under `extra.apiKey`.
 */
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.apiKey;

/**
 * Axios instance configured for The Movie Database (TMDb) API.
 * 
 * - Base URL is set to TMDb's v3 API endpoint.
 * - Authorization header uses Bearer token with the API key.
 * - Content-Type header set to application/json.
 * - Request timeout set to 10 seconds.
 * 
 * @type {AxiosInstance}
 */
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default api;
