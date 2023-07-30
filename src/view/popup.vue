<script setup>
import { reactive } from 'vue';
import { Button } from "ant-design-vue";
const state = reactive({
  msg: 'world'
})
</script>

<template>
  <div class="main_app">
    <h1>Hello {{ state.msg }} phoo 2</h1>
    <Button type="primary">
      primary button
    </Button>
    <Button type="dashed">
      dashed button
    </Button>
  </div>
</template>


<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
