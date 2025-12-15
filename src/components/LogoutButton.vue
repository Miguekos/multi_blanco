<!-- src/components/LogoutButton.vue -->
<template>
  <q-btn @click="handleLogout" label="Logout" />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('auth', ['logoutAction']),
    handleLogout() {
      this.logoutAction();
      this.$router.push('/login');
    }
  }
};
</script>
