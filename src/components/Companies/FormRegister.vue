<template>
  <div>
    {{ data_update_empty }}
    <!--    {{activate_add}}-->
    <div v-if="activate_add" class="row justify-center">
      <div class="col-xs-12 col-md-3 q-pa-xs">
        <q-input
          dense
          outlined
          label="Nombre Empresa"
          v-model="json_send.name"
        ></q-input>
      </div>
      <div class="col-xs-12 col-md-1 q-pa-xs">
        <q-btn
          label="Guardar"
          color="green"
          class="full-width"
          @click="save_companies"
        ></q-btn>
      </div>
    </div>
    <div v-else class="row justify-center">
      <div class="col-xs-12 col-md-3 q-pa-xs">
        <q-input
          dense
          outlined
          label="Nombre Empresa"
          v-model="update_data.name"
        ></q-input>
      </div>
      <div class="col-xs-12 col-md-1 q-pa-xs">
        <q-btn
          label="Update"
          color="info"
          class="full-width"
          @click="update_companies"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activate_add: {
      type: Boolean,
      default: true
    },
    data_update: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    monitor() {
      console.log("----> this.activate_add", this.activate_add);
    }
  },
  name: "FormRegister",
  data() {
    return {
      update_data: "",
      json_send: {
        // colorPair: `{"dark": "rgb(11, 209, 171,0.8)", "light": "rgb(11, 209, 171,0.1)"}`,
        role_id: 3
        // password: 'secret',
        // password_confirmation: 'secret'
      }
    };
  },
  computed: {
    data_update_empty() {
      if (this.activate_add) {
      } else {
        this.set_date();
      }
      return "";
    }
  },
  methods: {
    set_date() {
      this.update_data = this.data_update;
    },
    async save_companies() {
      this.$q.loading.show();
      console.log("json_send", this.json_send);
      await this.$store.dispatch("planing/create_companies", this.json_send);
      await this.$store.dispatch("planing/load_companies");
      this.json_send = {};
      this.$q.loading.hide();
      // await this.$axios
      //   .post(`${process.env.IP}api/companies`, this.json_send)
      //   .then(async resp => {
      //     console.log("resp_companies", resp);
      //     // this.persons_group = resp.data;
      //     // await this.$router.push("/dia1");
      //     await this.$store.dispatch("planing/load_companies");
      //     this.json_send = {};
      //     this.$q.loading.hide();
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     console.log("Error");
      //     this.$q.loading.hide();
      //   });
    },
    async update_companies() {
      this.$q.loading.show();
      console.log("json_send", this.update_data);
      await this.$store.dispatch("planing/update_companies", this.update_data);
      this.$q.notify({
        message: `Se actualizo ${this.update_data.name} con exito`
      });
      await this.$store.dispatch("planing/load_companies");
      this.$emit("click", this.update_data);
      this.$q.loading.hide();
      // await this.$axios
      //   .put(
      //     `${process.env.IP}api/companies/${this.update_data.id}`,
      //     this.update_data
      //   )
      //   .then(async resp => {
      //     console.log("resp_companies", resp);
      //     this.$q.notify({
      //       message: `Se actualizo ${this.update_data.name} con exito`
      //     });
      //     await this.$store.dispatch("planing/load_companies");
      //     this.$emit("click", this.update_data);
      //     // this.persons_group = resp.data;
      //     // await this.$router.push("/dia1");
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     console.log("Error");
      //   });
    }
  }
};
</script>

<style scoped></style>
