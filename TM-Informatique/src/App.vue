<script setup>
import Sidebar from './components/Sidebar.vue'
import Qcm from './components/Qcm.vue'
// import pageaccueil from './components/pageacceuil.vue'
</script>

<template>
    <div class="app">
        
        <sidebar/>
        <!-- <pageacceuil></pageacceuil> -->
        <router-view />
    </div>
</template>

<style lang="scss">
:root {
    --primary: #a31b1b;
    --grey: #858585;
    --dark: #141414;
    --dark-alt: #3a3b3d;
    --light: #f1f5f9;
    --sidebar-width: 300px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}
.app {
    display: flex;
    height: 100vh;
    justify-content: center;
    main {
        padding: 2rem;
        @media (max-width: 768px) {
            padding-left: 6rem;
        }
    }
}
</style>
