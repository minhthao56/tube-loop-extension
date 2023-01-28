/* eslint-disable no-undef */
chrome.tabs.onUpdated.addListener(moveToFirstPosition);
async function moveToFirstPosition(tabId, changeInfo, tab) {
  if (changeInfo?.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["/static/js/main.js"],
    });
  }
}
