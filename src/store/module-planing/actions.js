import dayjs from "dayjs";
import { axios, api } from 'boot/axios'

export async function cargar_datas({ commit }) {
  console.log("cargarDatas");
  await api
    .get("/api/assigments")
    .then(resp => {
      console.log("resp", resp);
      commit("set_datas", resp.data.data);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}


// export function register ({commit}, form) {
//   return api.post('/auth/register', form)
//     .then(response => {
//       api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
//       commit('login', {token: response.data.token, user: response.data.user})
//     })
// }
