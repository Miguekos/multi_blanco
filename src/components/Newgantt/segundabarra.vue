<template>
  <div>
    <div class="q-pa-xs">
      <!--      {{$store.state.planing.persons}}-->
      <div class="row">
        <div class="col-xs-12 col-md-2 q-pa-xs text-black">
          <q-select
            stack-label
            dense
            outlined
            v-model="empleados_select"
            :options="$store.state.planing.persons"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            label="Empleado"
          />
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <!--          <q-select stack-label dense outlined v-model="model" :options="options" label="Outlined" />-->
          <q-input
            stack-label
            dense
            outlined
            v-model="id_registro"
            label="Registro"
          />
        </div>
        <div class="col-xs-12 col-md-4 q-pa-xs">
          <!--          <q-select stack-label dense outlined v-model="model" :options="options" label="Outlined" />-->
          <q-input
            stack-label
            dense
            outlined
            v-model="comentario"
            label="Comentario"
          />
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-input dense outlined v-model="date_ini">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date_ini" mask="DD-MM-YYYY HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="date_ini" mask="DD-MM-YYYY HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-input dense outlined v-model="date_fin">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date_fin" mask="DD-MM-YYYY HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="date_fin" mask="DD-MM-YYYY HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs self-center">
          <q-btn
            color="green"
            class="full-width"
            push
            :loading="botonesload"
            @click="addTask"
            label="agregar"
          ></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import { mapActions } from "vuex";
import dayjs from "dayjs";
const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "DD-MM-YYYY HH:mm");
const formattedDateSinSegundos = date.formatDate(timeStamp, "DD-MM-YYYY HH:00");
// const formattedDateStart = date.formatDate(timeStamp, 'ddd, DD MMM YYYY HH:mm:ss Z')
const formattedDateStart = date.formatDate(timeStamp, "DD-MM-YYYY 00:00");
const formattedDateEnd = date.formatDate(timeStamp, "DD-MM-YYYY 23:00");

export default {
  props: {
    empleados_group: {
      type: Array
    }
  },
  name: "segundabarra",
  data() {
    return {
      botonesload: false,
      empleados_select: null,
      date_ini: formattedDateStart,
      date_fin: formattedDateStart,
      id_registro: "",
      comentario: ""
    };
  },
  methods: {
    ...mapActions("planing", ["cargar_datas"]),
    async addTask() {
      this.botonesload = true;
      this.$q.loading.show();
      console.log("addTask");
      for (let i = 0; i < this.$store.state.planing.datas.length; i++) {
        const element = this.$store.state.planing.datas[i];
        // console.log("element", element);
        // console.log(
        //   dayjs(`${this.date_ini} -05:00`, "DD-MM-YYYY HH:mm Z").toString()
        // );
        // console.log(element.name, this.empleados_select)
        if (element.id === this.empleados_select) {
          const start = dayjs(`${this.date_ini} -05:00`, "DD-MM-YYYY HH:mm Z");
          const end = dayjs(`${this.date_fin} -05:00`, "DD-MM-YYYY HH:mm Z");
          const jsonAdd = {
            name: this.id_registro,
            zipcode: "",
            comentario: this.comentario,
            start: start.toString(),
            end: end.toString()
          };
          // element.gtArray.push(jsonAdd);
          console.log("jsonAdd", jsonAdd);
          console.log("element", element);
          await this.$axios
            .post("http://95.111.235.214:8808/api/assigments", {
              operator_id: this.empleados_select,
              registration_id: this.id_registro,
              comentario: this.comentario,
              // gtArray: jsonAdd,
              start: start,
              end: end
            })
            .then(async resp => {
              console.log(resp);
              await this.cargar_datas();
              // this.persons_group = resp.data;
              this.botonesload = false;
              this.$q.loading.hide();
            })
            .catch(err => {
              console.error(err);
              console.log("Error");
              this.botonesload = false;
              this.$q.loading.hide();
            });
        } else {
          this.botonesload = false;
          this.$q.loading.hide();
        }
      }
      this.resetParams();
    },
    resetParams() {
      this.empleados_select = "";
      this.id_registro = "";
      this.comentario = "";
      this.date_ini = formattedDateStart;
      this.date_fin = formattedDateStart;
    }
  },
  async created() {
    await this.$axios
      .get("http://95.111.235.214:8808/api/users")
      .then(async resp => {
        console.log("resp_usuarios", resp);
        // this.persons_group = resp.data;
        this.$store.commit("planing/set_persons", resp.data.users);
        await this.$router.push("/dia1");
      })
      .catch(err => {
        console.error(err);
        console.log("Error");
      });
  }
};
</script>

<style scoped></style>
