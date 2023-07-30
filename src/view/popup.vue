<script setup>
/*global chrome*/
import { reactive } from 'vue';
import { Button, Table } from 'ant-design-vue';
const state = reactive({
  msg: 'world',
  dataSource: [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ],

  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }
  ]
});
const click = () => {
  console.log('clicked...');
  chrome.action.setBadgeText({
    text: 'ON'
  });
};
</script>

<template>
  <div class="main_app">
    <Button type="primary" @click="click"> Start Scraping </Button>
    <Table
      :data-source="state.dataSource"
      :columns="state.columns"
      :pagination="false"
    />
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
