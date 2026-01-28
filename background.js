chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "test-thumbnail",
    title: "Test My Thumbnail Here",
    contexts: ["all"],
    documentUrlPatterns: ["*://www.youtube.com/*"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "test-thumbnail") {
    chrome.tabs.sendMessage(tab.id, { action: "replaceVideo" })
      .catch(err => console.log(err));
  }
});
