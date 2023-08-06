<script setup>
/*global chrome*/
import { reactive } from 'vue';
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
  columns: default_headers.map((header) => {
    return { title: header, dataIndex: header, key: header };
  })
});
const click = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const mailDoms = await chrome.tabs.sendMessage(tabs[0].id, {
    from: 'popup',
    subject: 'DOMInfo'
  });
  for (const mailDom of mailDoms) {
    const result = textToTransaction(mailDom.text);
    if (state.dataSource.find(data => data.legacyId === result.legacyId)) continue
    result.date = dayjs(result.date).format()
    state.dataSource.push(result);
    localStorage['dataSource'] = state.dataSource
  }
};
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  state.count++;
});
</script>

<template>
  <div class="main_app">
    <Button type="primary" @click="click"> Start Scraping </Button>
    <div>
      {{ state.msg }}
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
