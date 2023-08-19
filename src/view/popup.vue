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
  }),
  error: false,
  warning: ''
});
const click = async () => {
  await chrome.runtime.sendMessage({
    subject: 'toggleScrape'
  });
};
const manual = async () => {
  await chrome.runtime.sendMessage({
    subject: 'manual'
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
    state.error = false;
  }
  if (msg.subject === 'queryError') {
    state.warning = msg.warning;
    state.error = true;
  }
});
</script>

<template>
  <div class="main_app">
    <div>
      <span> Auto Scraping </span>
      <a-switch
        :checked="state.scraping"
        style="margin-right: 30px"
        @click="click"
      />
      <a-button @click="manual"> Manual Scraping </a-button>
    </div>
    <a-alert
      v-if="state.error"
      style="margin-bottom: 10px"
      message="Something went wrong, try refreshing this page"
      type="error"
    />
    <a-alert
      v-if="state.warning"
      style="margin-bottom: 10px"
      :message="state.warning"
      type="error"
    />
    <a-table
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
}
</style>
