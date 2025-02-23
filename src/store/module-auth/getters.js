// src/store/module-auth/getters.js
export function isLoggedIn(state) {
  return !!state.token;
}

export function authStatus(state) {
  return state.status;
}
