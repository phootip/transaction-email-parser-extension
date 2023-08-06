/*global chrome*/
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    const mailsDom = document.querySelectorAll('div[data-legacy-message-id]')
    const output = []
    mailsDom.forEach(mail => { return output.push({ text: mail.outerHTML, legacyId: mail.dataset.legacyMessageId }) })
    response(output)
  }
});
