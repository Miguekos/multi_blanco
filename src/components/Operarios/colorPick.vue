<template>
  <div>
    <div class="q-gutter-md row items-start">
      <q-input
        dense
        filled
        v-model="secondColor"
        :rules="['anyColor']"
        hint="With validation"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="secondColor"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#FF00FF',
      secondColor: '#027be3'
    }
  },
  methods: {
    updateColor() {
      this.color = this.secondColor
    }
  }
}
</script>

<style lang="sass" scoped>
.my-input
  max-width: 250px
</style>
