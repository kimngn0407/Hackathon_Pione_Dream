import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

const saveSettings = (data) => axios.post(`${API_BASE_URL}/api/settings', data);

export default {
    saveSettings,
};