// create an axios instance that has the base url set to the api url and auth header set to the token

import axios from 'axios';
import { ADART_REST_API } from './constants';
import { readTokenFromLocalStorage } from '../utils/token';

export const apiClient = axios.create({
  baseURL: ADART_REST_API,
  headers: {
    Authorization: `Bearer ${readTokenFromLocalStorage()}`,
  },
});
