import dayjs from "dayjs";
import { axios, api } from "boot/axios";

function delete_id(val) {
  delete val.id;
  return val;
}

function create_datas(array) {
  let datas = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    // console.log(JSON.parse(element.colorPair));
    try {
      if (element.id === 1 || element.id === 2) {
        console.log("no found element");
      } else {
        const color = JSON.parse(element.colorPair);
        console.log("color", color);
        delete element.colorPair;
        datas.push({
          colorPair: color,
          ...element
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return datas;
  // console.log("datas", datas);
}

export async function cargar_datas({ commit }) {
  console.log("cargar_datas");
  await api
    .get("/api/assigments")
    .then(resp => {
      console.log("resp", resp);
      // const array = resp.data.data;
      // commit("set_datas", resp.data.data);
      commit("set_datas", create_datas(resp.data.data));
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function edit_datas({ commit }, payload) {
  console.log("edit_datas");
  await api
    .put(`/api/assigments/${payload.id}`, {
      ...delete_id(payload)
    })
    .then(resp => {
      commit("set_datas", create_datas(resp.data.data));
      // const array_edit = resp.data.data;
      // let datas = [];
      // for (let i = 0; i < array_edit.length; i++) {
      //   const element = array_edit[i];
      //   // console.log(JSON.parse(element.colorPair));
      //   const color = JSON.parse(element.colorPair);
      //   delete element.colorPair;
      //   datas.push({
      //     colorPair: color,
      //     ...element
      //   });
      // }
      // console.log("datas", datas);
      // // commit("set_datas", resp.data.data);
      // commit("set_datas", datas);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function delete_datas({ commit }, payload) {
  console.log("delete_datas");
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
