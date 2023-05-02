<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../assets/vue.svg" alt="vue" />
    </div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">double_arrow </span>
      </button>
    </div>
    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-icons">question_mark</span>
        <span class="text">DragDropQuiz</span>
      </router-link>
      <router-link class="button" to="/quiz">
        <span class="material-icons">question_mark</span>
        <span class="text">Quiz</span>
      </router-link>
      <router-link class="button" to="/QCM">
        <span class="material-icons">question_mark</span>
        <span class="text">Qcm1</span>
      </router-link>
      <router-link class="button" to="/QCM2">
        <span class="material-icons">question_mark</span>
        <span class="text">Qcm2</span>
      </router-link>
      <router-link class="button" to="/triage">
        <span class="material-icons">question_mark</span>
        <span class="text">Ancien DragDrop</span>
      </router-link>
      <router-link class="button" to="/TextTrou">
        <span class="material-icons">question_mark</span>
        <span class="text">Fill-in-the-gaps</span>
      </router-link>
      <router-link class="button" to="/TextArea">
        <span class="material-icons">question_mark</span>
        <span class="text">Question à developpement</span>
      </router-link>
    </div>
    <div class="flex"></div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;

  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  right: 0;
  background-color: lightgray;
  color: black;

  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;
    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: black;
      }
      &:hover {
        .material-icons {
          color: blue;
          transform: translateX(0.2rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }
  h3 {
    color: darkgray;
    font-size: 0.5rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: 0.3s ease-out;
      .material-icons {
        font-size: 2rem;
        color: black;
        transition: 0.2s ease-out;
      }
      .text {
        color: black;
        transition: 0.2s ease-out;
      }
      &:hover,
      &.router-link-exact-active {
        background: darkgray;
        .material-icons,
        .text {
          color: blue;
        }
      }
      &.router-link-exact-active {
        border-right: 5px solid blue;
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);
    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }
    h3,
    .button .text {
      opacity: 1;
      transition: 0.3s ease-out;
    }
    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>
