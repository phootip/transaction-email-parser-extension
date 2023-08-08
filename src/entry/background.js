/*global chrome*/

import { textToTransaction } from 'transaction-email-parser';
import dayjs from 'dayjs';
const state = {
	scraping: false,
	dataSource: [],
}
chrome.runtime.onMessage.addListener((msg, sender, response) => {
	if (msg.subject === 'toggleScrape') {
		state.scraping = !state.scraping
		if (state.scraping) queryAndUpdate()
		else updatePopup()
	}
	else if (msg.subject === 'getState') {
		updatePopup()
	}
})

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
	if (!state.scraping) return
	if (!('title' in changeInfo && changeInfo.title !== 'Gmail' && tab.active)) return
	queryAndUpdate()
})

chrome.tabs.onActivated.addListener(async (tabId) => {
	if (!state.scraping) return
	queryAndUpdate()
})

async function queryAndUpdate() {
	const tabId = await checkGmailUrl()
	if (!tabId) return
	const mailDoms = await chrome.tabs.sendMessage(tabId, { subject: 'getMailDoms' });
	domsToTransaction(mailDoms)
	updatePopup()
}

function glob(pattern, input) {
	var re = new RegExp(pattern.replace(/([.?+^$[\]\\(){}|/-])/g, "\\$1").replace(/\*/g, '.*'));
	return re.test(input);
}

async function checkGmailUrl() {
	const tabs = await chrome.tabs.query({
		active: true,
		// currentWindow: true
	});
	console.log(tabs)
	const id = tabs[0].id;
	const url = tabs[0].url;
	if (glob('https://mail.google.com/mail/*', url)) return id
	return null
}

function domsToTransaction(mailDoms) {
	for (const mailDom of mailDoms) {
		if (state.dataSource.find(data => data.legacyId === mailDom.legacyId)) continue
		const result = textToTransaction(mailDom.text);
		result.date = dayjs(result.date).format()
		state.dataSource.push(result);
	}
}

async function updatePopup() {
	await chrome.action.setBadgeText({
		text: state.scraping ? `on:${state.dataSource.length}` : 'off',
	});
	await chrome.runtime.sendMessage({
		from: 'popup',
		subject: 'updatePopup',
		state
	});
}
