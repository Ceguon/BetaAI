var apiKeyInput = document.getElementById("apiKeyInput");
function saveit() {
    var apiKey = apiKeyInput.value;
    chrome.storage.sync.set({'openKey': apiKey}, function() {
        alert('Login information saved: ' + apiKey);
      });
      chrome.tabs.executeScript({
        file: 'content.js'
      })
    };
  
  document.getElementById('saveApiKeyButton').addEventListener('click', saveit);