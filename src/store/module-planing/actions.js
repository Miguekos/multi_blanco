import dayjs from "dayjs";
import { axios, api } from "boot/axios";

function delete_id(val) {
  delete val.id;
  return val;
}

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

export async function edit_datas({ commit }, payload) {
  console.log("cargarDatas");
  await api
    .put(`/api/assigments/${payload.id}`, {
      ...delete_id(payload)
    })
    .then(resp => {
      console.log("resp", resp);
      return resp.data;
      // commit("set_datas", resp.data.data);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function delete_datas({ commit }, payload) {
  console.log("cargarDatas");
  await api
    .delete(`/api/assigments/${payload}`)
    .then(resp => {
      console.log("resp", resp);
      return resp.data;
      // commit("set_datas", resp.data.data);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}
