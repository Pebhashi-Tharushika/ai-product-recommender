import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const addProduct = (data) => axios.post(`${API_BASE_URL}/products`, data);
export const getProductById = (id) => axios.get(`${API_BASE_URL}/products/${id}`);
export const updateProduct = (id, data) => axios.put(`${API_BASE_URL}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/products/${id}`);
export const getRecommendations = (id) => axios.get(`${API_BASE_URL}/products/${id}/recommendations`);
