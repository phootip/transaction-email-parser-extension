/*global chrome*/
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.subject === 'getMailDoms') {
    const mailsDom = document.querySelectorAll('div[data-legacy-message-id]')
    const output = []
    mailsDom.forEach(mail => { return output.push({ text: mail.outerHTML, legacyId: mail.dataset.legacyMessageId }) })
    response(output)
  }
});
