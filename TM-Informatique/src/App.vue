<script setup>
import Sidebar from './components/Sidebar.vue'

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
    --sidebar-width: 300px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

</style>
