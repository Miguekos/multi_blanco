<template>
  <div>
    <div class="q-pa-xs">
      <!--      {{$store.state.planing.persons}}-->
      <div class="row">
        <div class="col-xs-12 col-md-1 q-pa-xs text-black">
          <q-select
            stack-label
            dense
            outlined
            v-model="json_send.operator_id"
            :options="$store.state.planing.persons"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            label="Operario"
          />
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-input
            stack-label
            dense
            outlined
            v-model="json_send.processor"
            label="Temerario"
          />
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-input
            stack-label
            dense
            outlined
            v-model="json_send.registration_id"
            label="Expediente"
          />
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-input
            stack-label
            dense
            outlined
            v-model="json_send.customer"
            label="Asegurado"
          />
        </div>
        <div class="col-xs-12 col-md-2 q-pa-xs">
          <q-input
            stack-label
            dense
            outlined
            v-model="json_send.address"
            label="Direccion"
          />
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-input
            stack-label
            dense
            outlined
            v-model="json_send.zip_code"
            label="Codigo postal"
          />
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-input
            stack-label
            dense
            outlined
            v-model="json_send.phone"
            label="Telefono"
          />
        </div>
        <div class="col-xs-12 col-md-3 q-pa-xs">
          <q-input
            stack-label
            dense
            outlined
            v-model="json_send.description"
            label="Detalles"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-input
            label="Registro"
            v-model="id_buscar"
            dense
            outlined
          ></q-input>
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-btn
            color="blue"
            class="full-width"
            push
            @click="buscar"
            label="buscar"
          ></q-btn>
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-input
            label="Zipcode"
            v-model="id_zipcode"
            dense
            outlined
          ></q-input>
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs">
          <q-btn
            color="blue"
            class="full-width"
            push
            @click="buscar"
            label="buscar"
          ></q-btn>
        </div>
        <div class="col-xs-12 col-md-1 q-pa-xs"></div>
        <div class="col-xs-12 col-md-1 q-pa-xs"></div>
        <div class="col-xs-12 col-md-1 q-pa-xs"></div>
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
            glossy
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
      json_send: {
        operator_id: "",
        processor: "",
        registration_id: "",
        date: "", //cita
        customer: "",
        address: "",
        zip_code: "",
        phone: "",
        details: "",
        comment: "",
        policy_number: ""
      },
      botonesload: false,
      processor: "",
      registration_id: "",
      date_ini: formattedDateStart,
      date_fin: formattedDateStart,
      id_registro: "",
      id_zipcode: "",
      id_buscar: ""
    };
  },
  methods: {
    ...mapActions("planing", ["cargar_datas"]),
    buscar() {
      this.$emit("click", this.id_buscar, this.id_zipcode);
      this.id_buscar = "";
      this.id_zipcode = "";
    },
    async addTask() {
      this.botonesload = true;
      this.$q.loading.show();
      console.log("addTask");
      const start = dayjs(`${this.date_ini} -05:00`, "DD-MM-YYYY HH:mm Z");
      const end = dayjs(`${this.date_fin} -05:00`, "DD-MM-YYYY HH:mm Z");
      await this.$axios
        .post("https://api.apps.com.pe/api/assigments", {
          ...this.json_send,
          start: start,
          end: end
        })
        .then(async resp => {
          console.log(resp);
          this.$store.commit("planing/set_datas", resp.data.data);
          // await this.cargar_datas();
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
      // for (let i = 0; i < this.$store.state.planing.datas.length; i++) {
      //   const element = this.$store.state.planing.datas[i];
      //   // console.log("element", element);
      //   // console.log(
      //   //   dayjs(`${this.date_ini} -05:00`, "DD-MM-YYYY HH:mm Z").toString()
      //   // );
      //   // console.log(element.name, this.json_send.operator_id)
      //   if (element.id === this.json_send.operator_id) {
      //     const start = dayjs(`${this.date_ini} -05:00`, "DD-MM-YYYY HH:mm Z");
      //     const end = dayjs(`${this.date_fin} -05:00`, "DD-MM-YYYY HH:mm Z");
      //     // const jsonAdd = {
      //     //   name: this.id_registro,
      //     //   zipcode: "",
      //     //   comentario: this.comentario,
      //     //   start: start.toString(),
      //     //   end: end.toString()
      //     // };
      //     // element.gtArray.push(jsonAdd);
      //     // console.log("jsonAdd", jsonAdd);
      //     // console.log("element", element);
      //     await this.$axios
      //       .post("https://api.apps.com.pe/api/assigments", {
      //         ...this.json_send,
      //         start: start,
      //         end: end
      //       })
      //       .then(async resp => {
      //         console.log(resp);
      //         await this.cargar_datas();
      //         // this.persons_group = resp.data;
      //         this.botonesload = false;
      //         this.$q.loading.hide();
      //       })
      //       .catch(err => {
      //         console.error(err);
      //         console.log("Error");
      //         this.botonesload = false;
      //         this.$q.loading.hide();
      //       });
      //   } else {
      //     this.botonesload = false;
      //     this.$q.loading.hide();
      //   }
      // }
      this.resetParams();
    },
    resetParams() {
      this.json_send = {
        operator_id: "",
        processor: "",
        registration_id: "",
        date: new Date(), //cita
        customer: "",
        address: "",
        zip_code: "",
        phone: "",
        details: "",
        comment: "",
        policy_number: ""
      };
      this.date_ini = formattedDateStart;
      this.date_fin = formattedDateStart;
    }
  },
  async created() {
    await this.$axios
      .get("https://api.apps.com.pe/api/users")
      .then(async resp => {
        console.log("resp_usuarios", resp);
        // this.persons_group = resp.data;
        this.$store.commit("planing/set_persons", resp.data.users);
        // await this.$router.push("/dia1");
      })
      .catch(err => {
        console.error(err);
        console.log("Error");
      });
  }
};
</script>

<style scoped></style>
