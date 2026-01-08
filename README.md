# 🎉 Adi's 27th Birthday Website

A beautiful, interactive birthday website with countdown timer and amazing celebrations!

## Features

### 🕐 Countdown Timer
- Shows days, hours, minutes, and seconds until January 16, 2026
- Beautiful animated background with stars and floating hearts
- Automatically switches to celebration mode on the birthday

### 🎊 Interactive Celebration
- **Toggle Lights**: Colorful blinking lights across the top
- **Music Player**: Play/pause birthday music
- **Confetti Cannon**: Launch confetti across the screen
- **Floating Balloons**: Animated balloons rising up
- **Interactive Cake**: Click candles to blow them out!
- **Photo/Video Gallery**: Display your cherished memories
- **Scroll-triggered Messages**: Beautiful messages appear as you scroll

### ⌨️ Keyboard Shortcuts
- `L` - Toggle lights
- `M` - Toggle music
- `C` - Launch confetti

## Setup Instructions

### 1. Add Photos and Videos

Place your photos in the project folder and update the JavaScript:

```javascript
// In script.js, find and uncomment this section, then add your photos:
addPhotosToGallery([
    { src: 'photo1.jpg', caption: 'Our first date' },
    { src: 'photo2.jpg', caption: 'Adventure time' },
    { src: 'photo3.jpg', caption: 'Silly moments' },
    { src: 'photo4.jpg', caption: 'Love' }
]);
```

### 2. Add Birthday Music

1. Find a birthday song (MP3 format)
2. Name it `birthday-music.mp3`
3. Place it in the project folder

### 3. Customize Messages

Edit the messages in `index.html` to personalize them:
- Find the `.message-card` sections
- Change the text to your own sweet messages

### 4. Test Before Birthday

To test the celebration section before January 16th:

In `script.js`, uncomment these lines at the bottom:
```javascript
document.getElementById('countdown-section').classList.remove('active');
document.getElementById('birthday-section').classList.add('active');
```

**Remember to comment them back before the actual birthday!**

## How to Run

### Option 1: Simple Local Server
1. Open terminal in the project folder
2. Run: `python -m http.server 8000`
3. Open browser to: `http://localhost:8000`

### Option 2: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

### Option 3: Direct File
Simply double-click `index.html` (music might not work)

## Customization Ideas

### Change Colors
Edit the CSS gradient colors in `style.css`:
```css
background: linear-gradient(135deg, #yourcolor1 0%, #yourcolor2 100%);
```

### Add More Photos
The gallery automatically adjusts to any number of photos!

### Add More Messages
Copy any `.message-section` in the HTML and add your own text.

## Mobile Responsive
The website automatically adapts to mobile devices!

## Browser Compatibility
Works best on:
- Chrome
- Firefox
- Safari
- Edge

## Tips
1. Use high-quality photos (but not too large, under 2MB each)
2. Pick a fun, upbeat birthday song
3. Test on mobile before the big day
4. Share the link or host it on GitHub Pages!

## Hosting on GitHub Pages (Optional)

1. Create a new GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select main branch
5. Your site will be live at: `https://yourusername.github.io/repository-name/`

---

Made with ❤️ for Adi's 27th Birthday!

