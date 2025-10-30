import axios from 'axios';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const getFarms = () => axios.get('/api/farms', { headers: getAuthHeader() });
const getAllFarms = () => axios.get('/api/farms', { headers: getAuthHeader() }); // Alias for consistency
const getFarmById = (id) => axios.get(`/api/farms/${id}`, { headers: getAuthHeader() });
const createFarm = (data) => axios.post('/api/farms', data, { headers: getAuthHeader() });
const updateFarm = (id, data) => axios.put(`/api/farms/${id}`, data, { headers: getAuthHeader() });
const deleteFarm = (id) => axios.delete(`/api/farms/${id}`, { headers: getAuthHeader() });

export default {
    getFarms,
    getAllFarms,
    getFarmById,
    createFarm,
    updateFarm,
    deleteFarm,
};