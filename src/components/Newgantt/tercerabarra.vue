<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-2 q-pa-xs">

      </div>
      <div class="col-xs-12 col-md-2 q-pa-xs">

      </div>
      <div class="col-xs-6 col-md-2 q-pa-xs">

      </div>
      <div class="col-xs-12 col-md-2 q-pa-xs">
        <q-input
          label="Buscar por Registro"
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
          label="Buscar por Zipcode"
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
    </div>
  </div>
</template>

<script>
const scaleList = `1,2,3,4,5,6,10,12,15,20,30,60,120,180,240,360,720,1440,2880,4320`
  .split(",")
  .map(n => {
    let value = parseInt(n);
    let label;
    if (value < 60) {
      label = value + " Minutos";
    } else if (value >= 60 && value < 1440) {
      label = value / 60 + " Hora";
    } else {
      label = value / 1440 + " Dia";
    }
    return {
      value,
      label
    };
  });

export default {
  name: "tercerabarra",
  data() {
    return {
      scale: 60,
      scaleList: scaleList,
      id_buscar: "",
      cellHeight: 50,
      cellWidth: 90
    };
  },
  methods: {
    buscar() {
      console.log("buscar");
      this.$emit("click", this.id_buscar);
      // if (this.id_buscar.length > 2) {
      //   const array = this.datas;
      //   // console.log("this.id_buscar", this.id_buscar)
      //   const item_find = this.id_buscar;
      //   // console.log(this.datas)
      //   let result = "";
      //   for (let i = 0; i < array.length; i++) {
      //     const element = array[i].gtArray;
      //     // console.log("element", element)
      //     function esCereza(fruta) {
      //       return fruta.name === `${item_find}`;
      //     }
      //     if (element.find(esCereza)) {
      //       result = element.find(esCereza);
      //     } else {
      //       console.log("nada");
      //     }
      //   }
      //   console.log(result);
      //   this.updateTimeLines(result.start, result.end, result);
      // } else {
      //   this.$q.notify({
      //     message: "Campo de busqueda vacio.!"
      //   });
      // }
    }
  }
};
</script>

<style scoped></style>
