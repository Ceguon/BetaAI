// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type == "createContextMenu") {
    // Create context menu item
    chrome.contextMenus.create({
      id: "DefineOpenAI",
      title: "Define With OpenAI",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
      id: "SummarizeOpenAI",
      title: "Summarize With OpenAI",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
      id: "SendToOpenAI",
      title: "Send To OpenAI",
      contexts: ["selection"]
    });
  }
});

// Add event listener for when context menu item is clicked
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "DefineOpenAI") {
    // Send message to content script with selected text
    chrome.tabs.sendMessage(tab.id, {
      type: "contextMenuClicked",
      selectedText: info.selectionText,
      messagetype: "define"
    });
  }

  if (info.menuItemId == "SummarizeOpenAI") {
    // Send message to content script with selected text
    chrome.tabs.sendMessage(tab.id, {
      type: "contextMenuClicked",
      selectedText: info.selectionText,
      messagetype: "summarize"
    });
  }

  if (info.menuItemId == "SendToOpenAI") {
    // Send message to content script with selected text
    chrome.tabs.sendMessage(tab.id, {
      type: "contextMenuClicked",
      selectedText: info.selectionText,
      messagetype: "send"
    });
  }
});
