<template>
  <div>
    <FormRegisterComapanies
      :data_update="data_update"
      :activate_add="activate_add"
      @click="func_activate_add"
    />
    <TablaCompanies
      :info="$store.state.planing.companies"
      :columns="columns"
      @click="func_activate_add"
    />
  </div>
</template>

<script>
export default {
  name: "Companies",
  components: {
    FormRegisterComapanies: () => import("src/components/Companies/FormRegister"),
    TablaCompanies: () => import("src/components/Companies/Tabla")
  },
  data() {
    return {
      data_update: [],
      activate_add: true,
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "acciones",
          label: "Acciones",
          field: "acciones",
          sortable: true
        }
      ]
    };
  },
  methods: {
    func_activate_add(val) {
      console.log("func_activate_add", val);
      if (this.activate_add) {
        this.data_update = val;
      } else {
        this.data_update = {};
      }
      this.activate_add = !this.activate_add;
    }
  },
  async created() {
    this.$q.loading.show();
    await this.$store.dispatch("planing/load_companies")
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
