<!--&lt;!&ndash; src/pages/Login.vue &ndash;&gt;-->
<!--<template>-->
<!--  <div>-->
<!--    <q-form @submit="handleLogin">-->
<!--      <q-input v-model="username" label="Username"/>-->
<!--      <q-input v-model="password" type="password" label="Password"/>-->
<!--      <q-btn type="submit" label="Login"/>-->
<!--    </q-form>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div
    :class="
      !$q.screen.xs
        ? `q-pa-md vertical-middle absolute-center ${loginClass}`
        : 'q-pa-lg'
    "
    :style="!$q.screen.xs ? loginStyle : ''"
  >
    <q-item class="bg-grey-2 q-pa-xs">
      <q-item-section avatar>
        <!-- <q-avatar rounded> -->
        <!-- <q-img src="logoColegio.jpeg" /> -->
        <!-- </q-avatar> -->
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-h5 text-center"> Login</q-item-label>
      </q-item-section>

      <q-item-section side>
        <!-- <span>2 min ago</span> -->
      </q-item-section>
    </q-item>
    <form @submit.prevent="loginAccount">
      <div class="q-pa-xs">
        <!--        <label for="username">Username:</label>-->
        <!--        <input type="text" v-model="username" required>-->
        <q-input outlined v-model="username" label="Username:"/>
      </div>
      <div class="q-pa-xs">
        <q-input
          v-model="password"
          outlined
          label="Contraseña:"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <!--      <button type="submit">Login</button>-->
      <div class="q-pa-xs">
        <q-btn type="submit" color="primary" label="Login" class="full-width"/>
      </div>
    </form>
  </div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
  computed: {
    loginStyle() {
      return "width: 50%";
    },
    loginClass() {
      return "";
    },
  },
  data() {
    return {
      isPwd: true,
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions('auth', ['loginAction']),
    async loginAccount() {
      try {
        this.$q.loading.show();
        await this.loginAction({username: this.username, password: this.password});
        this.$router.push('/planing');
      } catch (error) {
        this.$q.notify({
          message: `Usuario o contraseña incorrecta`,
          color: "red",
          position: "top-right",
        });
        console.error('Login failed:', error);
      } finally {
        this.$q.loading.hide();
        // Limpiar los campos de entrada
      }
    }
  }
};
</script>
