document.addEventListener('DOMContentLoaded', async () => {
  const userIn = document.getElementById('username');
  const passIn = document.getElementById('password');
  const saveBtn = document.getElementById('saveBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const statusDiv = document.getElementById('status');

  // 1. Load saved data
  const data = await chrome.storage.local.get(['savedUser', 'savedPass', 'logoutUrl']);
  
  if (data.savedUser) userIn.value = data.savedUser;
  if (data.savedPass) passIn.value = data.savedPass;
  
  // Show logout button if session exists
  if (data.logoutUrl) {
      logoutBtn.style.display = 'block';
      statusDiv.innerText = "Session Active";
      statusDiv.style.color = "green";
  }

  // 2. Save Button Logic
  saveBtn.addEventListener('click', () => {
    const user = userIn.value;
    const pass = passIn.value;
    
    if(!user || !pass) {
        statusDiv.innerText = "Please fill both fields.";
        return;
    }

    chrome.storage.local.set({ savedUser: user, savedPass: pass }, () => {
      statusDiv.innerText = "Credentials Saved!";
      statusDiv.style.color = "#e65100";
      chrome.runtime.sendMessage({ action: "tryLoginNow" });
    });
  });

  // 3. Logout Button Logic
  logoutBtn.addEventListener('click', () => {
      statusDiv.innerText = "Logging out...";
      
      chrome.runtime.sendMessage({ action: "logout" }, (response) => {
          if (response && response.success) {
              logoutBtn.style.display = 'none'; 
              statusDiv.innerText = "Logged Out.";
              statusDiv.style.color = "#333";
          } else {
              statusDiv.innerText = "Logout Failed.";
              statusDiv.style.color = "red";
          }
      });
  });
});