# MakerWorld User Blocker

A Chrome extension that allows you to block 3D models from specific users on makerworld.com.

## Features

- Block models from specific users from appearing in your feed
- Easy-to-use interface for managing your block list
- Works with infinite scrolling on makerworld.com
- Provides visual indicators when content is blocked
- Persists blocked users across browsing sessions

## Installation

### Developer Mode Installation

1. **Download or clone this repository** to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable "Developer mode"** by toggling the switch in the top-right corner
4. **Click "Load unpacked"** and select the extension folder
5. The extension icon should appear in your Chrome toolbar

## Usage

### Blocking Users

1. Click the extension icon in your Chrome toolbar
2. Enter the username of the person whose content you want to block
3. Click "Block" or press Enter
4. The username will be added to your blocked list

### Managing Blocked Users

- Open the extension popup to see all currently blocked users
- Click "Remove" next to any username to unblock that user

### How It Works

Once a user is blocked:
- Their 3D models will be hidden when you browse makerworld.com
- A subtle "Content from blocked user hidden" message will appear in place of the content
- The filtering happens automatically as you browse the site

## Files Overview

- `manifest.json` - Extension configuration
- `popup.html` - User interface for the extension
- `popup.js` - Logic for the popup interface
- `content.js` - Script that runs on makerworld.com to filter content

## Troubleshooting

If models from blocked users still appear:
- Refresh the page
- Make sure you've entered the exact username
- Check the extension is enabled in chrome://extensions/

## Privacy

This extension:
- Operates entirely in your browser
- Does not collect any data
- Does not communicate with any external servers
- Does not modify your makerworld.com account settings

