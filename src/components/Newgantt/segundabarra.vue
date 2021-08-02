<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-xs">
        <div class="text-black">
          <!--          {{ filteredByAll }}-->
        </div>
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
          <!--        <div class="col-xs-12 col-md-1 q-pa-xs">-->
          <!--          <q-input-->
          <!--            stack-label-->
          <!--            dense-->
          <!--            outlined-->
          <!--            v-model="json_send.zip_code"-->
          <!--            label="Codigo postal"-->
          <!--          />-->
          <!--        </div>-->
          <div class="col-xs-12 col-md-1 q-pa-xs">
            <q-input
              stack-label
              dense
              outlined
              v-model="json_send.insurance_company"
              label="Empresa"
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
          <div class="col-xs-12 col-md-2 q-pa-xs">
            <q-input
              label="Direccion"
              v-model="id_address"
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
          <!--          <div class="col-xs-12 col-md-1 q-pa-xs"></div>-->
          <div class="col-xs-12 col-md-1 q-pa-xs text-black"></div>
          <div class="col-xs-12 col-md-2 q-pa-xs">
            <q-input dense outlined v-model="date_ini">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date_ini" mask="DD-MM-YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <!--            <template v-slot:append>-->
              <!--              <q-icon name="access_time" class="cursor-pointer">-->
              <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
              <!--                  <q-time v-model="date_ini" mask="DD-MM-YYYY HH:mm">-->
              <!--                    <div class="row items-center justify-end">-->
              <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
              <!--                    </div>-->
              <!--                  </q-time>-->
              <!--                </q-popup-proxy>-->
              <!--              </q-icon>-->
              <!--            </template>-->
            </q-input>
          </div>
          <!--        <div class="col-xs-12 col-md-2 q-pa-xs">-->
          <!--          <q-input dense outlined v-model="date_ini">-->
          <!--            <template v-slot:prepend>-->
          <!--              <q-icon name="event" class="cursor-pointer">-->
          <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
          <!--                  <q-date v-model="date_ini" mask="DD-MM-YYYY">-->
          <!--                    <div class="row items-center justify-end">-->
          <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
          <!--                    </div>-->
          <!--                  </q-date>-->
          <!--                </q-popup-proxy>-->
          <!--              </q-icon>-->
          <!--            </template>-->
          <!--            &lt;!&ndash;            <template v-slot:append>&ndash;&gt;-->
          <!--            &lt;!&ndash;              <q-icon name="access_time" class="cursor-pointer">&ndash;&gt;-->
          <!--            &lt;!&ndash;                <q-popup-proxy transition-show="scale" transition-hide="scale">&ndash;&gt;-->
          <!--            &lt;!&ndash;                  <q-time v-model="date_fin" mask="DD-MM-YYYY HH:mm">&ndash;&gt;-->
          <!--            &lt;!&ndash;                    <div class="row items-center justify-end">&ndash;&gt;-->
          <!--            &lt;!&ndash;                      <q-btn v-close-popup label="Close" color="primary" flat />&ndash;&gt;-->
          <!--            &lt;!&ndash;                    </div>&ndash;&gt;-->
          <!--            &lt;!&ndash;                  </q-time>&ndash;&gt;-->
          <!--            &lt;!&ndash;                </q-popup-proxy>&ndash;&gt;-->
          <!--            &lt;!&ndash;              </q-icon>&ndash;&gt;-->
          <!--            &lt;!&ndash;            </template>&ndash;&gt;-->
          <!--          </q-input>-->
          <!--        </div>-->
          <div class="col-xs-12 col-md-1 q-pa-xs">
            <vue-timepicker
              v-model="time_ini"
              :hour-range="[7, [8, 18], 19]"
              :minute-interval="60"
            ></vue-timepicker>
            <!--          <q-input-->
            <!--            dense-->
            <!--            outlined-->
            <!--            v-model="time_ini"-->
            <!--            mask="time"-->
            <!--            :rules="['time']"-->
            <!--          >-->
            <!--            <template v-slot:append>-->
            <!--              <q-icon name="access_time" class="cursor-pointer">-->
            <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
            <!--                  <q-time v-model="time_ini">-->
            <!--                    <div class="row items-center justify-end">-->
            <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
            <!--                    </div>-->
            <!--                  </q-time>-->
            <!--                </q-popup-proxy>-->
            <!--              </q-icon>-->
            <!--            </template>-->
            <!--          </q-input>-->
          </div>
          <div class="col-xs-12 col-md-1 q-pa-xs">
            <vue-timepicker
              v-model="time_fin"
              :hour-range="[7, [8, 18], 19]"
              :minute-interval="60"
            ></vue-timepicker>
            <!--          <q-input-->
            <!--            dense-->
            <!--            outlined-->
            <!--            v-model="time_fin"-->
            <!--            mask="time"-->
            <!--            :rules="['time']"-->
            <!--          >-->
            <!--            <template v-slot:append>-->
            <!--              <q-icon name="access_time" class="cursor-pointer">-->
            <!--                <q-popup-proxy transition-show="scale" transition-hide="scale">-->
            <!--                  <q-time v-model="time_fin">-->
            <!--                    <div class="row items-center justify-end">-->
            <!--                      <q-btn v-close-popup label="Close" color="primary" flat />-->
            <!--                    </div>-->
            <!--                  </q-time>-->
            <!--                </q-popup-proxy>-->
            <!--              </q-icon>-->
            <!--            </template>-->
            <!--          </q-input>-->
          </div>
          <div class="col-xs-12 col-md-1 q-pa-xs">
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
    </q-form>
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
const formattedDateStart = date.formatDate(timeStamp, "DD-MM-YYYY");
const formattedDateEnd = date.formatDate(timeStamp, "DD-MM-YYYY 23:00");

export default {
  props: {
    empleados_group: {
      type: Array
    }
  },
  computed: {
    filteredByAll() {
      return this.getByKeyword(
        this.$store.getters["planing/get_datas"],
        this.id_address
      );
      // const keyw = this.getByKeyword(this.info, this.keyword)
      // return keyw;
    }
  },
  name: "segundabarra",
  data() {
    return {
      id_address: "",
      simpleStringValue: "07:00",
      time_ini: "07:00",
      time_fin: "12:00",
      yourValue: "",
      json_send: {
        operator_id: "",
        processor: "",
        registration_id: "",
        date: "", //cita
        customer: "",
        address: "",
        zip_code: "",
        insurance_company: "",
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
    getByKeyword(list, keyword) {
      const search = keyword.trim().toLowerCase();
      // console.log(search);
      if (!search.length) return list;
      return list.filter(item => item.name.toLowerCase().indexOf(search) > -1);
    },
    async onReset() {},
    async onSubmit() {
      this.botonesload = true;
      this.$q.loading.show();
      console.log("addTask", `${this.date_ini} ${this.time_ini}`);
      const start = dayjs(
        `${this.date_ini} ${this.time_ini} +02:00`,
        "DD-MM-YYYY HH:mm Z"
      );
      const end = dayjs(
        `${this.date_ini} ${this.time_fin} +02:00`,
        "DD-MM-YYYY HH:mm Z"
      );
      console.log("start", start);
      console.log("end", end);
      await this.$axios
        .post(`${process.env.IP}api/assigments`, {
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
      this.resetParams();
    },
    buscar() {
      // console.log("this.id_address", this.id_address);
      this.$emit("click", this.id_buscar, this.id_address);
      this.id_buscar = "";
      this.id_address = "";
    },
    async addTask() {
      this.botonesload = true;
      this.$q.loading.show();
      console.log("addTask", `${this.date_ini} ${this.time_ini}`);
      const start = dayjs(
        `${this.date_ini} ${this.time_ini} +02:00`,
        "DD-MM-YYYY HH:mm Z"
      );
      const end = dayjs(
        `${this.date_ini} ${this.time_fin} +02:00`,
        "DD-MM-YYYY HH:mm Z"
      );
      console.log("start", start);
      console.log("end", end);
      await this.$axios
        .post(`${process.env.IP}api/assigments`, {
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
      this.resetParams();
    },
    resetParams() {
      this.json_send = {
        operator_id: "",
        processor: "",
        registration_id: "",
        date: "", //cita
        customer: "",
        address: "",
        zip_code: "",
        insurance_company: "",
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
      .get(`${process.env.IP}api/users`)
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

<style>
.vue__time-picker input.display-time {
  border-radius: 3px;
  border: 1px solid #d2d2d2;
  width: 10em;
  height: 40px;
  padding: 0.3em 0.5em;
  font-size: 1em;
}
</style>
