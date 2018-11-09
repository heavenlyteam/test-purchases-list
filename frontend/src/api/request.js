import axios from 'axios';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default service;
