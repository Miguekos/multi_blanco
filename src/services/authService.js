// src/services/authService.js
import axios from 'axios';

const API_URL = process.env.IP || '';

export async function login(name, password) {
  const response = await axios.post(`${API_URL}api/login`, {name, password});
  localStorage.setItem('user-token', response.data.token);
  localStorage.setItem('user-data', JSON.stringify(response.data.user));
  return response.data;
}

export function logout() {
  localStorage.removeItem('user-token');
}

export function getToken() {
  return localStorage.getItem('user-token');
}

export function getData() {
  return localStorage.getItem('user-data');
}
