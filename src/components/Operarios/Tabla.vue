<template>
  <div>
    <template>
      <div class="q-pa-md">
        <q-table
          dense
          title="Operarios"
          :data="info"
          :columns="columns"
          row-key="name"
          :pagination="pagination"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              {{ props.row.name }}
            </q-td>
          </template>
          <template v-slot:body-cell-acciones="props">
            <q-td :props="props">
              <div class="q-gutter-xs">
                <q-btn
                  dense
                  size="sm"
                  color="orange"
                  @click="activate_update(props.row)"
                  icon="edit"
                ></q-btn>
                <q-btn
                  dense
                  size="sm"
                  @click="delete_operator(props.row)"
                  color="red"
                  icon="delete"
                ></q-btn>
              </div>
              {{ props.row.acciones }}
            </q-td>
          </template>
        </q-table>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    info: Array
  },
  name: "TablaOperarios",
  data() {
    return {
      pagination: {
        sortBy: "name",
        descending: false,
        page: 1,
        rowsPerPage: 20
        // rowsNumber: xx if getting data from a server
      }
    };
  },
  methods: {
    activate_update(val) {
      console.log("activate_update", val);
      this.$emit("click", val);
    },
    async delete_operator(val) {
      this.$q
        .dialog({
          title: "Confirmar!",
          message: "Estas seguro que desear borra este registro?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          this.$q.loading.show();
          console.log("json_send", this.json_send);
          await this.$axios
            .delete(`${process.env.IP}api/users/${val.id}`)
            .then(async resp => {
              console.log("resp_usuarios", resp);
              this.$q.notify({
                message: `Se elimino ${val.name} con exito`
              });
              await this.$store.dispatch("planing/load_operator");
              this.$q.loading.hide();
              // this.persons_group = resp.data;
              // await this.$router.push("/dia1");
            })
            .catch(err => {
              console.error(err);
              console.log("Error");
              this.$q.loading.hide();
            });
          // console.log('>>>> OK')
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
  }
};
</script>

<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
