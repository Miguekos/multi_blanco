const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/Index.vue") },
      { path: "/planing", component: () => import("pages/Gantt.vue") },
      { path: "/searchplaning", component: () => import("pages/GanttPasados.vue") },
      { path: "/operario", component: () => import("pages/Operarios.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
