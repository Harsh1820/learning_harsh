import axios from 'axios';

const API_URL = "http://localhost:3000/products";

// Create a new product
export const createProduct = (productData) => {
    return axios.post(`${API_URL}`, productData);
};

// Get all products
export const getAllProducts = () => {
    return axios.get(`${API_URL}/`);
};

// Search products by name
export const searchProductsByName = (name) => {
    return axios.get(`${API_URL}/name/${name}`);
};

// Search products by availability
export const searchProductsByAvailability = (availability) => {
    return axios.get(`${API_URL}/availability/${availability}`);
};

// Search products by price greater than a certain value
export const searchProductsByPrice = (price) => {
    return axios.get(`${API_URL}/price/${price}`);
};

// Delete a product by ID
export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

// Update a product by ID
export const updateProduct = (id, productData) => {
    return axios.put(`${API_URL}/${id}`, productData);
};

