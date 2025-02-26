import dayjs from "dayjs";
import {axios, api} from "boot/axios";

function delete_id(val) {
  delete val.id;
  return val;
}

function create_datas(array) {
  let datas = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    console.log(typeof element.colorPair);
    try {
      if (element.role_id === 3) {
        const color = {
          dark: "rgb(131, 89, 111,0.8)",
          light: "rgb(131, 89, 111,0.1)"
        };
        //const color = JSON.parse(newColor);
        // console.log("color", color);
        // delete element.colorPair;
        datas.push({
          colorPair: element.colorPair ? element.colorPair : color,
          ...element
        });
      } else {
        console.log("element", element.name);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return datas;
  // console.log("datas", datas);
}

export async function cargar_datas({commit}) {
  console.log("cargar_datas");
  await api
    .get("/api/assignments/users-with-assignments")
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

export async function edit_datas({commit}, payload) {
  console.log("edit_datas", payload);
  await api
    .put(`/api/assignments/${payload.id}`, {
      ...delete_id(payload)
    })
    .then(async resp => {
      // await load_operator()
      // commit("set_datas", create_datas(resp.data.data));

      console.log("resp", resp);
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

export async function delete_datas({commit}, payload) {
  console.log("delete_datas");
  await api
    .delete(`/api/assignments/${payload}`)
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

// OPERATOR
export async function load_operator({commit}) {
  await api
    .get(`/api/users`)
    .then(async resp => {
      // console.log("resp_usuarios", resp);
      // this.persons_group = resp.data;
      // let result = [];
      console.log("resp_load_operator", resp.data);
      // const array = resp.data.users;
      // for (let i = 0; i < array.length; i++) {
      //   const element = array[i];
      //   if (element.name === "Admin" || element.name === "Processor") {
      //   } else {
      //     result.push(element);
      //   }
      // }
      // commit("set_persons", result);
      commit("set_persons", resp.data?.users);
      const result = resp.data?.users;
      // this.$store.commit("planing/set_persons", result);
      const filteredUsers = result.filter(user => user.role_id === 3);
      commit("set_operator", filteredUsers);
      const filteredTramitadores = result.filter(user => user.role_id === 1);
      commit("set_tramitadores", filteredTramitadores);
      // console.log("resp.data?.users", resp.data?.users);
      // await this.$router.push("/dia1");
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function create_operator({commit}, payload) {
  await api
    .post(`/api/users`, payload)
    .then(async resp => {
      console.log("resp_create_users", resp);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function update_operator({commit}, payload) {
  await api
    .put(`/api/users/${payload.id}`, payload)
    .then(async resp => {
      console.log("resp_update_users", resp);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function delete_operator({commit}, payload) {
  await api
    .delete(`/api/users/${payload}`)
    .then(async resp => {
      console.log("resp_delete_users", resp);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

// COMPANIES
export async function load_companies({commit}) {
  await api
    .get(`/api/companies`)
    .then(async resp => {
      commit("set_companies", resp.data);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function create_companies({commit}, payload) {
  await api
    .post(`/api/companies`, payload)
    .then(async resp => {
      console.log("resp_create_companies", resp);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function update_companies({commit}, payload) {
  await api
    .put(`/api/companies/${payload.id}`, payload)
    .then(async resp => {
      console.log("resp_update_companies", resp);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}

export async function delete_companies({commit}, payload) {
  await api
    .delete(`/api/companies/${payload}`)
    .then(async resp => {
      console.log("resp_delete_companies", resp);
    })
    .catch(err => {
      console.error(err);
      console.log("Error");
    });
}
