// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  //CASE 1: Content script needs password to inject
  if (request.action === "getCredentials") {
    chrome.storage.local.get(['savedUser', 'savedPass'], (data) => {
      sendResponse({ user: data.savedUser, pass: data.savedPass });
    });
    return true; // Keep channel open for async response
  }

  //CASE 2: Popup "Save" button clicked
  if (request.action === "tryLoginNow") {
      chrome.tabs.create({ url: "http://neverssl.com", active: false }, (tab) => {
         // Close dummy trigger tab after 10s
         setTimeout(() => {
             chrome.tabs.get(tab.id, (t) => {
                 if (t) chrome.tabs.remove(tab.id);
             });
         }, 10000);
      });
  }

  //CASE 3: Logout requested
  if (request.action === "logout") {
      chrome.storage.local.get('logoutUrl', async (data) => {
          if (data.logoutUrl) {
              try {
                  console.log("AutoWifi: Logging out via " + data.logoutUrl);
                  await fetch(data.logoutUrl, { mode: 'no-cors' }); 
                  await chrome.storage.local.remove('logoutUrl');
                  sendResponse({ success: true });
              } catch (e) {
                  console.error("Logout failed", e);
                  sendResponse({ success: false });
              }
          } else {
              sendResponse({ success: false });
          }
      });
      return true; // Keep channel open for async response
  }
});

// Monitor URLs to capture the Logout Token AND Redirect to Success Page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const urlString = tab.url;
    
    // Check if this is the "Keep Alive" page (172.16.2.1)
    if (urlString.includes("172.16.2.1")) {
      
      if (urlString.includes("keepalive") || urlString.includes("status") || urlString.includes("fgtauth")) {
        
        console.log("AutoWifi: Keep Alive page detected.");

        // 1. Capture the Token
        try {
          if (urlString.includes("?")) {
              const url = new URL(urlString);
              const capturedToken = url.search; 
              
              if (capturedToken && capturedToken.length > 2) {
                 const newLogoutUrl = `http://172.16.2.1:1000/logout${capturedToken}`;
                 chrome.storage.local.set({ logoutUrl: newLogoutUrl });
                 console.log("AutoWifi: Token captured.");
              }
          }
        } catch (e) { console.error(e); }

        
        setTimeout(() => {
            const mySuccessPage = "https://lakshraina2.github.io/autowifi-success/";
            
            console.log("AutoWifi: Redirecting to Success Page...");
            
            // Check if tab still exists before updating
            chrome.tabs.get(tabId, (t) => {
                if (t) {
                    chrome.tabs.update(tabId, { url: mySuccessPage });
                }
            });
            
        }, 3000); 
      }
    }
  }
});