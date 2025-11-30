import axios from 'axios';

const API_URL = 'http://localhost:8000'; // CAMBIA POR TU IP LOCAL

const api = axios.create({ baseURL: API_URL });

export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const login = (email, password) =>
  api.post('/auth/login', new URLSearchParams({ username: email, password }));

export const getPersonas = () => api.get('/personas');
export const createPersona = (data) => api.post('/personas', data);
export const createAdmin = (data) => api.post('/auth/create-admin', data);