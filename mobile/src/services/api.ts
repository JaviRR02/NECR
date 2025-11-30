import axios from 'axios';
import { Platform } from 'react-native';

function getBaseUrl() {
  if (Platform.OS === 'android') return 'http://10.0.2.2:8000';
  if (Platform.OS === 'web') return 'http://localhost:8000';
  return 'http://localhost:8000';
}

const instance = axios.create({ baseURL: getBaseUrl(), timeout: 10000 });

export default {
  async login(payload: { email: string; password: string }) {
    const res = await instance.post('/auth/login', payload);
    return res.data;
  },
  async createAdmin(payload: { name: string; email: string; password: string }) {
    const res = await instance.post('/admins', payload);
    return res.data;
  },
  async getPeople() {
    const res = await instance.get('/people');
    return res.data;
  },
  async getPerson(id: string | number) {
    const res = await instance.get(`/people/${id}`);
    return res.data;
  },
  async createPerson(payload: any) {
    const res = await instance.post('/people', payload);
    return res.data;
  },
  async getAdmins() {
    const res = await instance.get('/admins');
    return res.data;
  },
};
