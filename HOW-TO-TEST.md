# 🧪 How to Test the Birthday Website

## Option 1: Test the Full Flow (Recommended)

### Step 1: Start the Server
```bash
python -m http.server 8000
```

### Step 2: Open Browser
Go to: `http://localhost:8000`

### Step 3: Test Each Section

**You'll see:**
1. ✅ Black screen with light switch
2. ✅ Click switch → Confetti + "It's Almost Your Birthday"
3. ✅ Countdown screen with 2 photos
4. ✅ Click photos to see the surprise prizes!

---

## Option 2: Skip to Birthday Celebration (For Testing)

To test the BIRTHDAY experience without waiting until Jan 16:

### Method 1: Change the Date Temporarily

1. **Open `script.js`**
2. **Find line 1:**
   ```javascript
   const birthdayDate = new Date('2026-01-16T00:00:00+05:30').getTime();
   ```
3. **Change to:**
   ```javascript
   const birthdayDate = new Date('2026-01-08T19:30:00+05:30').getTime(); // Current time
   ```
4. **Save and refresh browser**

Now the countdown will hit zero immediately and trigger the birthday!

**⚠️ DON'T FORGET TO CHANGE IT BACK!**

---

### Method 2: Use Browser Console

1. **Open the website**
2. **Press F12** (opens Developer Tools)
3. **Go to Console tab**
4. **Type this and press Enter:**
   ```javascript
   startBirthdayCelebration()
   ```

This will immediately:
- Launch confetti
- Start music (if you added it)
- Show the cake with candles
- Let you test blowing them out!

---

## Testing the Candle Blowing

When you see the cake screen:

### Option A: Use Microphone
1. **Allow microphone access** when prompted
2. **Blow into your microphone** or make loud sounds
3. Candles will blow out randomly!

### Option B: Click to Blow (Fallback)
If microphone doesn't work:
- **Just click on each candle** to blow it out

### What Happens:
- After all 9 candles are blown (2+7 for "27")
- More confetti!
- Your letter appears
- Scroll down to see photos

---

## Testing Checklist

- [ ] Light switch works
- [ ] Confetti appears
- [ ] "It's Almost Your Birthday" message
- [ ] Countdown timer shows correct time
- [ ] Left photo → Argument pass prize
- [ ] Right photo → Coupon prize
- [ ] Birthday celebration triggers
- [ ] Music plays (if added)
- [ ] Cake appears with 9 candles
- [ ] Candles blow out (mic or click)
- [ ] All candles blown → confetti
- [ ] Your letter displays correctly
- [ ] Photo gallery shows all 6 photos
- [ ] Photos enlarge on click

---

## Troubleshooting

### Music not playing?
- Make sure `birthday-music.mp3` is in the same folder as `index.html`
- Try clicking anywhere on the page first (browsers block autoplay)

### Microphone not working?
- Check browser permissions
- Use Chrome (works best)
- Fallback: just click the candles

### Countdown not working?
- Make sure date is set to: `2026-01-16T00:00:00+05:30`
- Check your computer clock is set correctly

---

## After Testing

**IMPORTANT:** If you changed the date in script.js, **CHANGE IT BACK** to:
```javascript
const birthdayDate = new Date('2026-01-16T00:00:00+05:30').getTime();
```

Then commit and push to GitHub!

---

**Happy Testing! 🎉**


