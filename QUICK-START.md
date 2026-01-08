# 🚀 Quick Start Guide

## Step-by-Step Setup (5 minutes!)

### 1️⃣ Add Your Photos
1. Copy your 8 photos into this folder (same folder as `index.html`)
2. They can be named anything like: `IMG_001.jpg`, `pic1.png`, etc.
3. Note down their exact filenames

### 2️⃣ Update the Code
Open `script.js` and find line ~165 (search for "ADD YOUR PHOTOS HERE")

Replace the commented code with your actual filenames:

```javascript
addPhotosToGallery([
    { src: 'YOUR_PHOTO_1.jpg', caption: 'Our beautiful moments ❤️' },
    { src: 'YOUR_PHOTO_2.jpg', caption: 'Adventures together 🌍' },
    { src: 'YOUR_PHOTO_3.jpg', caption: 'Making memories 📸' },
    { src: 'YOUR_PHOTO_4.jpg', caption: 'Laughter and joy 😊' },
    { src: 'YOUR_PHOTO_5.jpg', caption: 'Forever and always 💕' },
    { src: 'YOUR_PHOTO_6.jpg', caption: 'You and me 🥰' },
    { src: 'YOUR_PHOTO_7.jpg', caption: 'Best moments 🌟' },
    { src: 'YOUR_PHOTO_8.jpg', caption: 'Love you 💖' }
]);
```

### 3️⃣ Add Music (Optional)
1. Download a birthday song (see `MUSIC-GUIDE.md` for free options)
2. Rename it to: `birthday-music.mp3`
3. Place it in this folder

### 4️⃣ Test It!

**Windows:**
- Double-click `index.html` OR
- Run in terminal: `python -m http.server 8000`
- Open browser: `http://localhost:8000`

**Mac/Linux:**
- Double-click `index.html` OR
- Run in terminal: `python3 -m http.server 8000`

### 5️⃣ Test Celebration Early (Optional)

To see the celebration before Jan 16th:

In `script.js`, go to the very bottom and uncomment these lines:
```javascript
document.getElementById('countdown-section').classList.remove('active');
document.getElementById('birthday-section').classList.add('active');
```

**Don't forget to comment them back before the big day!**

---

## ⚡ Even Quicker Method

1. Just tell me your 8 photo filenames
2. I'll update the code for you automatically!
3. You just add the music file

Example: 
"The photos are named: IMG_001.jpg, IMG_002.jpg, ... IMG_008.jpg"

---

## 🌐 Sharing Options

### Option A: Send Files
- Zip the entire folder
- Send to Adi on his birthday
- He opens `index.html`

### Option B: Host Online (Free!)
- Create GitHub account
- Upload files to a new repository
- Enable GitHub Pages
- Share the link!

I can help with either option! 🎉

