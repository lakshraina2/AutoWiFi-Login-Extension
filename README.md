# AutoWifi Login Extension 🚀

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![Chrome](https://img.shields.io/badge/Chrome-Extension-google) ![License](https://img.shields.io/badge/license-MIT-green)

A lightweight Chrome Extension that automates the login process for captive portal Wi-Fi networks (hostels, university campuses, airports). 

Stop typing your username and password every time you reconnect. AutoWifi detects the login page, injects your credentials, and keeps your session alive.

## 🎥 Demo
*(Add a screenshot or a GIF of the extension in action here)*

## ✨ Features
* **⚡ Instant Auto-Login:** Automatically detects captive portal redirects (optimized for `172.16.x.x` gateways) and signs you in.
* **🔒 Secure Local Storage:** Credentials are encrypted and stored locally in the browser (`chrome.storage.local`). No data is ever sent to external servers.
* **👋 One-Click Logout:** Includes a custom Logout button that captures the session token and ends the session instantly.
* **🔋 Background Keep-Alive:** Handles network "keep-alive" pages seamlessly without cluttering your tabs.
* **💻 Manifest V3:** Built using the latest Chrome Extension standards for better performance and security.

## 🛠️ Installation

### Option 1: Chrome Web Store (Recommended)
*Current Status: Pending Review*
[Link coming soon]

### Option 2: Developer Mode (Manual Install)
If you want to use the extension right now or modify the code:

1.  Clone this repository or download the ZIP.
2.  Open Chrome and go to `chrome://extensions`.
3.  Enable **Developer Mode** (toggle in the top right).
4.  Click **Load unpacked**.
5.  Select the folder containing the manifest file.

## ⚙️ How it Works (Technical)
This extension leverages the Chrome Extension API to interact with network events:
1.  **Background Service Worker (`background.js`):** Monitors `chrome.tabs.onUpdated` to detect when the browser hits the specific router IP.
2.  **Content Script (`content.js`):** Injects into the login DOM to fill the form fields programmatically.
3.  **Session Management:** Captures the unique session token from the URL parameters to enable the specific "Logout" API call (`http://172.16.2.1:1000/logout?token=...`).

## 🔒 Privacy Policy
We take privacy seriously.
* **No Tracking:** We do not track your browsing history.
* **Local Only:** Your username and password never leave your device.
* **Permissions:** We only request permissions strictly necessary for the login automation (`tabs`, `storage`, `scripting`).

## 🤝 Contributing
Pull requests are welcome! If you want to adapt this for your own college's Wi-Fi system:
1.  Fork the repo.
2.  Update the target URL in `manifest.json` and `background.js`.
3.  Submit a PR.

## ☕ Support
If this project saved you time, consider buying me a coffee!
[Buy Me a Coffee](https://www.buymeacoffee.com/lakshraina2)

---
*Built with ❤️ by Lakshay Raina*
