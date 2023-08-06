<script setup>
/*global chrome*/
import { reactive, onMounted } from 'vue';
import { Button, Table } from 'ant-design-vue';
import { textToTransaction } from 'transaction-email-parser';
import dayjs from 'dayjs';
const default_headers = [
  'type',
  'provider',
  'account',
  'opposing_provider',
  'opposing_account',
  'amount',
  'date',
  'legacyId',
  'url'
];
const state = reactive({
  msg: '',
  count: 0,
  dataSource: [],
  scraping: false,
  columns: default_headers.map((header) => {
    return { title: header, dataIndex: header, key: header };
  })
});
const click = async () => {
  await chrome.runtime.sendMessage({
    subject: 'toggleScrape'
  });
};
onMounted(async () => {
  await chrome.runtime.sendMessage({ subject: 'getState' });
});
chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg);
  if (msg.subject === 'updatePopup') {
    state.dataSource = msg.state.dataSource;
    state.scraping = msg.state.scraping;
  }
});
</script>

<template>
  <div class="main_app">
    <Button type="primary" @click="click"> Start Scraping </Button>
    <div>
      {{ state.scraping }}
    </div>
    <Table
      :data-source="state.dataSource"
      :columns="state.columns"
      :pagination="false"
      bordered
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
