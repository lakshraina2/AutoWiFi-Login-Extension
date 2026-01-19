console.log("AutoWifi: Portal page detected.");

// Ask the background script for credentials
chrome.runtime.sendMessage({ action: "getCredentials" }, (response) => {
  if (response && response.user && response.pass) {
    console.log("AutoWifi: Injecting credentials...");
    const user = response.user;
    const pass = response.pass;

    var userField = document.querySelector('input[name="username"]') || document.getElementById('username');
    var passField = document.querySelector('input[name="password"]') || document.getElementById('password');
    var btn = document.querySelector('button[type="submit"]') || document.querySelector('input[type="submit"]');

    // Add a small delay to ensure page is ready
    setTimeout(function() {
        if (userField && passField) {
           userField.value = user;
           passField.value = pass;
           // Dispatch events for reactive web frameworks
           userField.dispatchEvent(new Event('input', { bubbles: true }));
           passField.dispatchEvent(new Event('input', { bubbles: true }));

           console.log("AutoWifi: Submitting form...");
           if (btn) btn.click();
           else document.forms[0].submit();
        } else {
             console.error("AutoWifi: Could not find login fields.");
        }
    }, 500);
  } else {
      console.log("AutoWifi: No credentials saved.");
  }
});

if (document.location.href.includes("keepwindow") || document.location.href.includes("policy")) {
     var btn = document.querySelector('button');
     if (btn) btn.click();
}