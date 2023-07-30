/*global chrome*/
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log(msg);
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    const txt = document.documentElement.innerHTML;
    response(txt);
  }
});
