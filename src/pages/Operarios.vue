<template>
  <div>
    <FormRegisterOperator
      :data_update="data_update"
      :activate_add="activate_add"
    />
    <Tablaoperario
      :info="$store.state.planing.persons"
      :columns="columns"
      @click="func_activate_add"
    />
  </div>
</template>

<script>
export default {
  name: "Operarios",
  components: {
    FormRegisterOperator: () => import("src/components/Operarios/FormRegister"),
    Tablaoperario: () => import("src/components/Operarios/Tabla")
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
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true
        },
        { name: "phone", label: "Telf.", field: "phone", sortable: true },
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
    await this.$store.dispatch("planing/load_operator")
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
