<template>
  <div class="welcome">
    <h2 v-if="user.username">
      Hi, {{user.username}}.
    </h2>
  </div>
</template>

<script>
import UserStore from "../stores/UserStore.js";

export default {
  data() {
    return {
      user: UserStore.state
    };
  }
};
</script>

<style scoped>
.welcome {
  margin: 10px;
}
</style>
