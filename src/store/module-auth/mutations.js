// src/store/module-auth/mutations.js
export function auth_request(state) {
  state.status = 'loading';
}

export function auth_success(state, token) {
  state.status = 'success';
  state.token = token;
}

export function auth_error(state) {
  state.status = 'error';
}

export function logout(state) {
  state.status = '';
  state.token = '';
}
