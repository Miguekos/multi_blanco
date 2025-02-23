// src/store/module-auth/state.js
export default function () {
  return {
    token: localStorage.getItem('user-token') || '',
    status: '',
    user: JSON.parse(localStorage.getItem('user-data')) || {},
  };
}
