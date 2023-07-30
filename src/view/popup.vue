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
  'id',
  'url'
];
const state = reactive({
  msg: 'world',
  count: 0,
  dataSource: [],
  columns: default_headers.map((header) => {
    return { title: header, dataIndex: header, key: header };
  })
});
const regex = new RegExp('เข้าบัญชี:\\s*(x+[0-9]{4})');
const click = async () => {
  console.log('clicked...');
  state.count++;
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });
  const txt = await chrome.tabs.sendMessage(tabs[0].id, {
    from: 'popup',
    subject: 'DOMInfo'
  });
  let result = textToTransaction(txt);
  result.date = dayjs(result.date).format()
  state.dataSource.push(result);
  state.msg = result;
  console.log(state.dataSource);
  // if (txt.includes('รับเงินผ่านรายการพร้อมเพย์')) {
  //   state.count = -1;
  //   const values = regex.exec(txt);
  //   state.msg = values;
  // }
  // state.msg = txt;
  // console.log(txt)
};
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  state.count++;
});
</script>

<template>
  <div class="main_app">
    <Button type="primary" @click="() => state.count++"> test </Button>
    {{ state.count }}
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
