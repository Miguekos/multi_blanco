import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

console.log("process.env.IP", process.env.IP);

const api = axios.create({ baseURL: process.env.IP });
Vue.prototype.$api = api;
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

// export { axios, api }
export { axios, api };
