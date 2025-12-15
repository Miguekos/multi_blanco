import Login from 'src/pages/Login.vue';
import Home from 'src/pages/Index.vue';

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // {path: '/login', component: Login},
      // {path: "/", redirect: "/login"},
      {path: "", component: () => import("pages/Index.vue"), meta: {requiresAuth: true}},
      {path: "/planing", component: () => import("pages/Gantt.vue"), meta: {requiresAuth: true}},
      {path: "/searchplaning", component: () => import("pages/GanttPasados.vue")},
      {path: "/operario", component: () => import("pages/Operarios.vue"), meta: {requiresAuth: true}},
      {path: "/companies", component: () => import("pages/Companies.vue"), meta: {requiresAuth: true}}
    ]
  },
  // {
  //   path: "/login",
  //   component: () => import("pages/Login.vue"),
  // },
  {path: '/login', component: Login},
  // {path: '/', component: Home, meta: {requiresAuth: true}},

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
