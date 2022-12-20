chrome.storage.sync.get(['openKey'], function(result) {
  keytest = result.openKey;
  console.log("login retrived: " + keytest);
  // Use the username and password to log in
  chrome.runtime.sendMessage({
    type: "createContextMenu"
  });

  // Listen for messages from background page
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.type == "contextMenuClicked") {
        // Get selected text from message
        var selectedText = message.selectedText;
        var sendtype = message.messagetype;
        console.log(sendtype);
        
        if (sendtype = "summarize"){
          // Use GPT-3 API to generate response
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "https://api.openai.com/v1/completions");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + keytest);
          xhr.send(JSON.stringify({
            "prompt": "summarize the following as concisely as possible while retaining key details: " + selectedText,
            "model": 'text-davinci-002',
            "max_tokens": 256, // Make sure this is a number
            "temperature": 0.5, // Make sure this is a number
          }));
      
          // Handle response from API
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              var response = JSON.parse(xhr.responseText);
      
              // Make sure response.choices is defined and has at least one element
              if (response.choices && response.choices.length > 0) {
                console.log("OpenAI response: ", response.choices[0].text);
                var text = response.choices[0].text


                // Create a new div element to hold the text
                var bubble = document.createElement("div");

                // Add the text to the div
                bubble.innerHTML = text;

                // Set the CSS styles for the div to make it look like a bubble
                bubble.style.color = "#035956";
                bubble.style.position = "fixed";
                bubble.style.top = "50%";
                bubble.style.left = "50%";
                bubble.style.transform = "translate(-50%, -50%)";
                bubble.style.padding = "20px";
                bubble.style.backgroundColor = "#FBE6C4";
                bubble.style.borderRadius = "5px";

                // Create the "x" button and add it to the top right of the bubble
                var closeButton = document.createElement("button");
                closeButton.innerHTML = "x";
                closeButton.style.position = "absolute";
                closeButton.style.top = "0";
                closeButton.style.right = "0";
                closeButton.style.padding = "5px";
                closeButton.style.border = "none";
                closeButton.style.backgroundColor = "#00917C";
                closeButton.style.color = "white";
                closeButton.style.borderRadius = "4px";
                bubble.appendChild(closeButton);

                // Add an event listener to the close button to remove the bubble when clicked
                closeButton.addEventListener("click", function() {
                document.body.removeChild(bubble);
                });

                // Add an event listener to the bubble to allow it to be moved with the mouse
                bubble.addEventListener("mousedown", function(event) {
                var initialX = event.clientX;
                var initialY = event.clientY;
                var initialBubbleX = bubble.offsetLeft;
                var initialBubbleY = bubble.offsetTop;

                document.addEventListener("mousemove", function(event) {
                bubble.style.left = initialBubbleX + (event.clientX - initialX) + "px";
                bubble.style.top = initialBubbleY + (event.clientY - initialY) + "px";
                });

                // Add an event listener to the document to stop moving the bubble when the mouse is released
                document.addEventListener("mouseup", function() {
                document.removeEventListener("mousemove", function() {});
                });
                });

                // Add the div to the page
                document.body.appendChild(bubble);

              }
              
            }
          }
        }
        
        
        if (sendtype = "define"){
          // Use GPT-3 API to generate response
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "https://api.openai.com/v1/completions");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + keytest);
          xhr.send(JSON.stringify({
            "prompt": "what does: " + selectedText + " mean?",
            "model": 'text-davinci-002',
            "max_tokens": 256, // Make sure this is a number
            "temperature": 0.5, // Make sure this is a number
          }));
      
          // Handle response from API
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              var response = JSON.parse(xhr.responseText);
      
              // Make sure response.choices is defined and has at least one element
              if (response.choices && response.choices.length > 0) {
                console.log("OpenAI response: ", response.choices[0].text);
                var text = response.choices[0].text


                // Create a new div element to hold the text
                var bubble = document.createElement("div");

                // Add the text to the div
                bubble.innerHTML = text;

                // Set the CSS styles for the div to make it look like a bubble
                bubble.style.color = "#035956";
                bubble.style.position = "fixed";
                bubble.style.top = "50%";
                bubble.style.left = "50%";
                bubble.style.transform = "translate(-50%, -50%)";
                bubble.style.padding = "20px";
                bubble.style.backgroundColor = "#FBE6C4";
                bubble.style.borderRadius = "5px";

                // Create the "x" button and add it to the top right of the bubble
                var closeButton = document.createElement("button");
                closeButton.innerHTML = "x";
                closeButton.style.position = "absolute";
                closeButton.style.top = "0";
                closeButton.style.right = "0";
                closeButton.style.padding = "5px";
                closeButton.style.border = "none";
                closeButton.style.backgroundColor = "#00917C";
                closeButton.style.color = "white";
                closeButton.style.borderRadius = "4px";
                bubble.appendChild(closeButton);

                // Add an event listener to the close button to remove the bubble when clicked
                closeButton.addEventListener("click", function() {
                document.body.removeChild(bubble);
                });

                // Add an event listener to the bubble to allow it to be moved with the mouse
                bubble.addEventListener("mousedown", function(event) {
                var initialX = event.clientX;
                var initialY = event.clientY;
                var initialBubbleX = bubble.offsetLeft;
                var initialBubbleY = bubble.offsetTop;

                document.addEventListener("mousemove", function(event) {
                bubble.style.left = initialBubbleX + (event.clientX - initialX) + "px";
                bubble.style.top = initialBubbleY + (event.clientY - initialY) + "px";
                });

                // Add an event listener to the document to stop moving the bubble when the mouse is released
                document.addEventListener("mouseup", function() {
                document.removeEventListener("mousemove", function() {});
                });
                });

                // Add the div to the page
                document.body.appendChild(bubble);

              }
              
            }
          }
        }

        if (sendtype = "send"){
          // Use GPT-3 API to generate response
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "https://api.openai.com/v1/completions");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + keytest);
          xhr.send(JSON.stringify({
            "prompt": "Answer the statement: " + selectedText,
            "model": 'text-davinci-002',
            "max_tokens": 256, // Make sure this is a number
            "temperature": 0.5, // Make sure this is a number
          }));
      
          // Handle response from API
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              var response = JSON.parse(xhr.responseText);
      
              // Make sure response.choices is defined and has at least one element
              if (response.choices && response.choices.length > 0) {
                console.log("OpenAI response: ", response.choices[0].text);
                var text = response.choices[0].text


                // Create a new div element to hold the text
                var bubble = document.createElement("div");

                // Add the text to the div
                bubble.innerHTML = text;

                // Set the CSS styles for the div to make it look like a bubble
                bubble.style.color = "#035956";
                bubble.style.position = "fixed";
                bubble.style.top = "50%";
                bubble.style.left = "50%";
                bubble.style.transform = "translate(-50%, -50%)";
                bubble.style.padding = "20px";
                bubble.style.backgroundColor = "#FBE6C4";
                bubble.style.borderRadius = "5px";

                // Create the "x" button and add it to the top right of the bubble
                var closeButton = document.createElement("button");
                closeButton.innerHTML = "x";
                closeButton.style.position = "absolute";
                closeButton.style.top = "0";
                closeButton.style.right = "0";
                closeButton.style.padding = "5px";
                closeButton.style.border = "none";
                closeButton.style.backgroundColor = "#00917C";
                closeButton.style.color = "white";
                closeButton.style.borderRadius = "4px";
                bubble.appendChild(closeButton);

                // Add an event listener to the close button to remove the bubble when clicked
                closeButton.addEventListener("click", function() {
                document.body.removeChild(bubble);
                });

                // Add an event listener to the bubble to allow it to be moved with the mouse
                bubble.addEventListener("mousedown", function(event) {
                var initialX = event.clientX;
                var initialY = event.clientY;
                var initialBubbleX = bubble.offsetLeft;
                var initialBubbleY = bubble.offsetTop;

                document.addEventListener("mousemove", function(event) {
                bubble.style.left = initialBubbleX + (event.clientX - initialX) + "px";
                bubble.style.top = initialBubbleY + (event.clientY - initialY) + "px";
                });

                // Add an event listener to the document to stop moving the bubble when the mouse is released
                document.addEventListener("mouseup", function() {
                document.removeEventListener("mousemove", function() {});
                });
                });

                // Add the div to the page
                document.body.appendChild(bubble);

              }
              
            }
          }
        }
      }
    });

});
