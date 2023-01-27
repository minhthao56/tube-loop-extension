/* eslint-disable no-undef */
// background.js

// function handleActionClick(tab) {
//   function greet(greeting) {
//     console.log(`${greeting}, World!`);
//   }
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: greet,
//     args: ["Hello"],
//   });
// }

// // Listener is registered on startup
// chrome.action.onClicked.addListener(handleActionClick);

chrome.tabs.onUpdated.addListener(moveToFirstPosition);

async function moveToFirstPosition(tabId, changeInfo, tab) {
  if (changeInfo?.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["script.js"],
    });
  }
}
