<template>
  <!--  <q-layout view="hhh lpR fFf">-->
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white">
      <q-toolbar class="bg-red-8">
        <q-btn
          flat
          dense
          round
          icon="home"
          aria-label="Menu"
          @click="set_state_leftDrawerOpen"
        />

        <q-toolbar-title>
          Multiservicios Blanco
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}-5</div>
      </q-toolbar>
      <!--      <div class="text-white">-->
      <!--        <SegundaLinea />-->
      <!--      </div>-->
      <!--      <div>-->
      <!--        <TerceraLinea />-->
      <!--      </div>-->
      <!--      <q-separator color="red" class="q-pb-xs" />-->
    </q-header>

    <!--    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">-->
    <q-drawer
      v-model="$store.state.planing.leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Planing",
    caption: "Planing del mes",
    icon: "date_range",
    link: "#/planing"
  },
  // {
  //   title: "Planing pasados",
  //   caption: "Planing del mes",
  //   icon: "event_note",
  //   link: "#/searchplaning"
  // },
  // {
  //   title: "Empresas",
  //   caption: "Control de empresas ",
  //   icon: "business_center",
  //   link: ""
  // },
  {
    title: "Operarios",
    caption: "Control de operarios",
    icon: "groups",
    link: "#/operario"
  },
  // {
  //   title: "Usuarios",
  //   caption: "Controla de usuarios",
  //   icon: "group",
  //   link: ""
  // },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink
    // SegundaLinea: () => import('src/components/Newgantt/segundabarra'),
    // TerceraLinea: () => import('src/components/Newgantt/tercerabarra')
  },
  data() {
    return {
      leftDrawerOpen: true,
      essentialLinks: linksData
    };
  },
  methods: {
    async set_state_leftDrawerOpen() {
      this.$store.commit("planing/set_leftDrawerOpen", true);
    }
  }
};
</script>
