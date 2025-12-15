// src/store/module-auth/actions.js
import {getData, login, logout} from 'src/services/authService';

export async function loginAction({commit}, user) {
  console.log("loginAction")
  commit('auth_request');
  try {
    const data = await login(user.username, user.password);
    console.log(data);
    commit('auth_success', data.token);
  } catch (error) {
    commit('auth_error');
    throw error;
  }
}

export function logoutAction({commit}) {
  logout();
  commit('logout');
}

export function getDataLofin({commit}) {
  getData()
  commit('getData');
}


