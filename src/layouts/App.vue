<template>
   <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">dashboard</router-link>
      <router-link to="/admin">admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'AppLayout',
  };
</script>

<style>
</style>