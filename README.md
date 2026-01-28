# YouTube Thumbnail Tester - Chrome Extension

A lightweight Chrome extension that lets you test your YouTube video titles and thumbnails directly on the YouTube homepage before publishing. Perfect for content creators who want to see how their content stands out in a real feed.

## Features

- **Visual A/B Testing**: See your thumbnail and title in context with other YouTube videos
- **Neumorphic UI**: Beautiful, modern soft-UI design for the popup interface
- **Right-Click Integration**: Simple context menu to apply your test thumbnail to any video
- **Real-time Preview**: Instantly visualize your changes on the YouTube homepage
- **Persistent Storage**: Your test data is saved between sessions

## Installation

### From Source (Manual Installation)

1. **Download the Extension**
   ```bash
   git clone git@github.com:helenep21/YoutubeThumbnailTest.git
   cd youtube-thumbnail-tester
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer Mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the extension folder

3. **Verify Installation**
   - You should see "YouTube Thumbnail Tester" in your extensions list
   - The extension icon will appear in your toolbar

## How to Use

### Step 1: Prepare Your Test Content

1. Click the extension icon in your Chrome toolbar
2. Enter your video title in the text field
3. Click **"Select Image"** and upload your thumbnail
4. Click **"SAVE & APPLY"**

### Step 2: Test on YouTube

1. Navigate to [YouTube.com](https://www.youtube.com)
2. **Right-click** on any video thumbnail in the feed
3. Select **"Test My Thumbnail Here"** from the context menu
4. Your thumbnail and title will instantly replace that video

### Step 3: Evaluate & Iterate

- See how your thumbnail stands out (or doesn't) among real content
- Compare visual hierarchy, text readability, and color contrast
- Adjust and test again until you're satisfied

## File Structure

```
youtube-thumbnail-tester/
├── manifest.json       # Extension configuration
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic
├── content.js          # YouTube page manipulation
├── background.js       # Context menu handler
├── icon.png            # Extension icon (optional)
└── README.md           # This file
```

## Requirements

- Chrome Browser version 88+
- Manifest V3 support

## Troubleshooting

### "Nothing happens when I right-click"
- Make sure you're on `youtube.com` (not YouTube Studio or other subdomains)
- Refresh the YouTube page after installing/updating the extension
- Check that you've saved a title and image in the popup first

### "The thumbnail doesn't change"
- Ensure you right-clicked directly on the thumbnail image or title
- YouTube's DOM structure can vary; try refreshing the page
- Check the browser console (F12) for error messages

### "File input not working"
- Click the "Reset All Data" button in the popup
- Reload the extension from `chrome://extensions`
- Try a different image format (PNG or JPG recommended)

## Privacy

This extension:
- ✅ Works entirely client-side (no data sent to external servers)
- ✅ Only activates on YouTube.com domains
- ✅ Stores data locally using Chrome's storage API
- ❌ Does not track your browsing
- ❌ Does not collect analytics

## Development

### Local Development
```bash
# Make changes to the code
# Then reload the extension:
# 1. Go to chrome://extensions
# 2. Click the refresh icon on the extension card
# 3. Refresh any open YouTube tabs
```

## Known Limitations

- Only works on YouTube's homepage and search results (not Shorts feed or watch page sidebar yet)
- YouTube's dynamic DOM updates may occasionally require a page refresh
- Large image files (>2MB) may be slow to process

## Author

Built by Helene Peignard
Check out my Youtube channel [here](https://www.youtube.com/@kodomofilms)

## Acknowledgments

- Inspired by the need for better thumbnail testing tools
- Neumorphic UI design principles from [neumorphism.io](https://neumorphism.io)

---

**If this extension helps your content creation, consider giving it a ⭐ on GitHub!**
