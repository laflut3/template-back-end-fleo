import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
});

export const getUsers = () => {
    return axiosInstance.get('/users');
};

export const addUser = (userData) => {
    return axiosInstance.post('/users', userData);
};

export const getProducts = () => {
    return axiosInstance.get('/products');
}
