import { URL_YOUTUBE_PLAY } from "../constants/app";

chrome.tabs.onUpdated.addListener(handleUpdated);
async function handleUpdated(
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) {
  if (
    changeInfo?.status === "complete" &&
    tab.url?.includes(URL_YOUTUBE_PLAY)
  ) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["/static/js/main.js"],
    });
  }
}
chrome.runtime.onMessage.addListener((message) => {
  console.log({ messageBG: message });
});
