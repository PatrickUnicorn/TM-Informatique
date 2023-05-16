<template>
  <div class="login-form" v-if="!isAdmin && !isUser">
    <h2>Please Login</h2>
    <form @submit.prevent="login">
      <label>
        Username:
        <input type="text" v-model="loginUsername" />
      </label>
      <label>
        Password:
        <input type="password" v-model="loginPassword" />
      </label>
      <button id="loginAsAdmin" @click="login">Login as Admin</button>
      <p v-show="loginError">Invalid username or password.</p>
      <button id="loginAsUser" @click="loginAsUser">Login as User</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["isAdmin", "isUser"],
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      loginError: false,
    };
  },
  methods: {
    login() {
      if (this.loginUsername === "admin" && this.loginPassword === "admin123") {
        this.$emit("login", "admin");
        this.loginError = false;
      } else {
        this.loginError = true;
      }
      this.loginUsername = "";
      this.loginPassword = "";
    },
    loginAsUser() {
      this.$emit("login", "user");
    },
  },
};
</script>
<style scoped>
form input[type="text"],
form input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.login-form {
  position: absolute;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
}

form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
