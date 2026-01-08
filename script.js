// Birthday date - January 16, 2026 at midnight IST
// IST is UTC+5:30
const birthdayDate = new Date('2026-01-16T00:00:00+05:30').getTime();

// ============================================
// LIGHT SWITCH ENTRY
// ============================================
function flipSwitch() {
    const lightSwitch = document.getElementById('lightSwitch');
    lightSwitch.classList.add('on');
    
    // Disable further clicks
    lightSwitch.style.pointerEvents = 'none';
    
    // Wait for switch animation
    setTimeout(() => {
        // Show HUGE confetti blast
        launchMassiveConfetti();
        
        // Show "It's almost your birthday" message
        setTimeout(() => {
            showBirthdayMessage();
        }, 500);
        
        // After message, show next section
        setTimeout(() => {
            // REMOVE dark entry screen completely
            const darkScreen = document.getElementById('dark-entry-screen');
            if (darkScreen) {
                darkScreen.remove();
            }
            
            // Don't enable scrolling yet - countdown should be locked
            
            if (checkIfBirthday()) {
                // It's the birthday! Show the intro with "Let's Celebrate"
                document.getElementById('birthday-section').classList.add('active');
            } else {
                // Before birthday - show countdown
                document.getElementById('countdown-section').classList.add('active');
            }
        }, 4500);
        
    }, 800);
}

// Massive confetti blast for entry
function launchMassiveConfetti() {
    const colors = ['#ff6b9d', '#ffd93d', '#4ecdc4', '#a8e6cf', '#ff9a76', '#c7b3ff', '#ff1493', '#ffd700'];
    
    // Create 500 confetti pieces!
    for (let i = 0; i < 500; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '15px';
            confetti.style.height = '15px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = `fall ${Math.random() * 2 + 3}s linear forwards`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.zIndex = '100000';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 5);
    }
}

// Show birthday message
function showBirthdayMessage() {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = '#fff';
    message.style.border = '8px solid #ff6b9d';
    message.style.borderRadius = '40px';
    message.style.padding = '4rem';
    message.style.zIndex = '1000001';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 0 100px rgba(255, 107, 157, 0.8), 15px 15px 0px #ffd93d';
    message.style.animation = 'notificationPop 4s ease-out forwards';
    message.style.fontFamily = 'Comic Sans MS, cursive';
    message.innerHTML = `
        <h1 style="font-size: 4rem; color: #ff1493; margin: 0; text-shadow: 3px 3px 0px #ffd93d;">🎉</h1>
        <h2 style="font-size: 3rem; color: #ff1493; margin: 1rem 0; text-shadow: 2px 2px 0px #ffd93d;">It's Almost Your Birthday!</h2>
        <h1 style="font-size: 4rem; color: #ff1493; margin: 0;">🎂</h1>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 4000);
}

// Check if it's the birthday
function checkIfBirthday() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;
    return distance <= 0;
}

// Countdown Timer
function updateCountdown() {
    // Get current time in IST
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // If birthday has arrived or passed
    if (distance <= 0) {
        const countdownSection = document.getElementById('countdown-section');
        countdownSection.classList.remove('active');
        countdownSection.style.display = 'none';
        
        document.getElementById('birthday-section').classList.add('active');
        document.body.classList.add('allow-scroll');
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Start countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// SPECIAL PHOTO PRIZES ON COUNTDOWN SCREEN
// ============================================

// Argument Pass Prize
function showArgumentPass() {
    const popup = document.createElement('div');
    popup.classList.add('prize-popup');
    popup.innerHTML = `
        <span class="big-emoji">🎟️</span>
        <h2>Special Prize Unlocked! 🎉</h2>
        <p style="font-size: 1.4rem; font-weight: bold; color: #ff1493;">
            In this week leading up to your birthday you get to win 
            <span style="font-size: 1.6rem; color: #ffd93d; text-shadow: 2px 2px 0px #ff1493;">3 ARGUMENTS</span> 
            no questions asked!
        </p>
        <span class="big-emoji">😎</span>
        <button onclick="this.parentElement.remove()">Awesome! 🎊</button>
    `;
    
    document.body.appendChild(popup);
}

// Coupon Prize
function showCoupon() {
    const popup = document.createElement('div');
    popup.classList.add('prize-popup', 'coupon-style');
    popup.innerHTML = `
        <span class="big-emoji">🎫</span>
        <h2>Exclusive Coupon! 💝</h2>
        <div class="coupon-code">GET TWO</div>
        <p style="font-size: 1.3rem; color: #ff1493; font-style: italic;">
            ...ahem... pics 📸
        </p>
        <span class="big-emoji">😏</span>
        <p style="font-size: 1rem; color: #666; margin-top: 1rem;">
            Valid immediately. No expiration. 😉
        </p>
        <button onclick="this.parentElement.remove()">Redeem Later! 💕</button>
    `;
    
    document.body.appendChild(popup);
}

// Dark surprise removed - now using light switch entry instead

// Generate animated hearts for countdown
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.animation = `float-up ${Math.random() * 3 + 5}s ease-in forwards`;
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    
    document.querySelector('.hearts-animation').appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
}

// Create hearts periodically
setInterval(createHeart, 1000);

// Start Celebration
function startCelebration() {
    document.querySelector('.intro-screen').classList.remove('active-screen');
    document.querySelector('.celebration-screen').classList.add('active-screen');
    
    // Initialize doodles
    initializeDoodles();
    
    // Start scroll animations
    observeMessageCards();
    
    // Welcome surprise!
    setTimeout(() => {
        createSurprise();
    }, 1000);
    
    // Create burst of emojis
    const emojis = ['🎉', '🎊', '🎈', '🎁', '💝', '⭐', '✨'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            createFloatingEmoji(emoji);
        }, i * 100);
    }
}

// Lights are always on in celebration mode (removed toggle)

// Music Control
let musicPlaying = false;
function toggleMusic() {
    const music = document.getElementById('birthday-music');
    const btn = document.getElementById('music-btn');
    
    if (musicPlaying) {
        music.pause();
        btn.querySelector('.btn-text').textContent = 'Play Music';
        musicPlaying = false;
    } else {
        music.play().catch(e => {
            console.log('Music autoplay prevented:', e);
            alert('Click again to play music!');
        });
        btn.querySelector('.btn-text').textContent = 'Pause Music';
        musicPlaying = true;
    }
}

// Confetti
function launchConfetti() {
    const section = document.querySelector('.celebration-screen.active-screen');
    if (!section) return;
    
    const container = section.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#ffd93d', '#4ecdc4', '#a8e6cf', '#ff9a76', '#c7b3ff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Blow out candles
function blowCandle(candle) {
    candle.classList.add('blown-out');
    
    // Check if all candles are blown
    const allCandles = document.querySelectorAll('.candle');
    const blownCandles = document.querySelectorAll('.candle.blown-out');
    
    if (allCandles.length === blownCandles.length) {
        setTimeout(() => {
            launchConfetti();
            alert('🎉 All candles blown! Make a wish! 🎂');
        }, 500);
    }
}

// Scroll-triggered animations for message cards
function observeMessageCards() {
    const cards = document.querySelectorAll('.message-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    cards.forEach(card => observer.observe(card));
}

// Initialize when birthday section is active
if (document.getElementById('birthday-section').classList.contains('active')) {
    observeMessageCards();
}

// Create floating balloons for intro screen
function createFloatingBalloon() {
    const container = document.querySelector('.balloons-container');
    if (!container) return;
    
    const balloon = document.createElement('div');
    const colors = ['#ff6b9d', '#4ecdc4', '#ffd93d', '#a8e6cf', '#ff9a76'];
    
    balloon.style.position = 'absolute';
    balloon.style.width = Math.random() * 30 + 40 + 'px';
    balloon.style.height = Math.random() * 35 + 50 + 'px';
    balloon.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 100 + '%';
    balloon.style.bottom = '-100px';
    balloon.style.animation = `float-up ${Math.random() * 5 + 8}s ease-in forwards`;
    balloon.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    
    container.appendChild(balloon);
    
    setTimeout(() => balloon.remove(), 13000);
}

// Create balloons periodically
setInterval(createFloatingBalloon, 2000);

// Photo Gallery - Add photos dynamically with Polaroid style
function addPhotosToGallery(photos) {
    const grid = document.getElementById('photo-grid');
    grid.innerHTML = ''; // Clear placeholders
    
    photos.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.setAttribute('data-caption', photo.caption || '❤️');
        photoDiv.style.transition = 'transform 0.3s ease';
        photoDiv.style.cursor = 'pointer';
        photoDiv.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        photoDiv.style.opacity = '0';
        photoDiv.style.transform = index % 2 === 0 ? 'rotate(-3deg)' : 'rotate(2deg)';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption || 'Our memory';
        img.classList.add('photo-item');
        img.style.width = '100%';
        img.style.height = '300px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '5px';
        
        photoDiv.appendChild(img);
        grid.appendChild(photoDiv);
        
        // Hover effects
        photoDiv.addEventListener('mouseenter', () => {
            photoDiv.style.transform = 'scale(1.1) rotate(0deg)';
            photoDiv.style.boxShadow = '10px 10px 0px #4ecdc4';
            photoDiv.style.zIndex = '100';
        });
        
        photoDiv.addEventListener('mouseleave', () => {
            photoDiv.style.transform = index % 2 === 0 ? 'rotate(-3deg)' : 'rotate(2deg)';
            photoDiv.style.boxShadow = '5px 5px 0px #ffd93d';
            photoDiv.style.zIndex = '1';
        });
        
        // Click to enlarge
        photoDiv.addEventListener('click', () => {
            createPhotoModal(photo.src, photo.caption);
        });
    });
}

// Create photo modal for enlarged view
function createPhotoModal(src, caption) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.9)';
    modal.style.zIndex = '10000';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.cursor = 'pointer';
    
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.border = '10px solid #fff';
    img.style.borderRadius = '10px';
    img.style.boxShadow = '0 0 50px rgba(255, 255, 255, 0.3)';
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', () => {
        modal.remove();
    });
}

// Your photos are now loaded in the gallery! 📸 (6 photos in 2 rows)
// Photos 7 and 8 are on the countdown screen
addPhotosToGallery([
    { src: 'unnamed (1).jpg', caption: 'Our beautiful moments ❤️' },
    { src: 'unnamed (2).jpg', caption: 'Adventures together 🌍' },
    { src: 'unnamed (3).jpg', caption: 'Making memories 📸' },
    { src: 'unnamed (4).jpg', caption: 'Laughter and joy 😊' },
    { src: 'unnamed (5).jpg', caption: 'Forever and always 💕' },
    { src: 'unnamed (6).jpg', caption: 'The greatest love of my life 💖' }
]);

// Add video support
function addVideosToGallery(videos) {
    const grid = document.getElementById('photo-grid');
    
    videos.forEach((video, index) => {
        const videoDiv = document.createElement('div');
        videoDiv.style.position = 'relative';
        videoDiv.style.overflow = 'hidden';
        videoDiv.style.borderRadius = '20px';
        videoDiv.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
        videoDiv.style.opacity = '0';
        
        const videoElement = document.createElement('video');
        videoElement.src = video.src;
        videoElement.controls = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.borderRadius = '20px';
        
        videoDiv.appendChild(videoElement);
        grid.appendChild(videoDiv);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        toggleMusic();
    } else if (e.key === 'c' || e.key === 'C') {
        launchConfetti();
    } else if (e.key === 's' || e.key === 'S') {
        createSurprise();
    }
});

// TEST MODE ENABLED - Skip countdown to see celebration section
// Comment out these lines to show countdown again before Jan 16th
document.getElementById('countdown-section').classList.remove('active');
document.getElementById('birthday-section').classList.add('active');

console.log('🎉 Birthday website loaded! Keyboard shortcuts: M - music, C - confetti, S - surprise');

// ============================================
// SURPRISE POP-UPS! 🎁
// ============================================

const surprises = [
    { emoji: '💐', message: 'A bouquet for you!', title: 'Surprise!' },
    { emoji: '🎁', message: 'A special gift!', title: 'Oh!' },
    { emoji: '💝', message: 'Sending you love!', title: 'Aww!' },
    { emoji: '🌹', message: 'Roses are red...', title: 'For You!' },
    { emoji: '🎈', message: 'Balloons of joy!', title: 'Yay!' },
    { emoji: '⭐', message: 'You\'re a star!', title: 'Shine!' },
    { emoji: '🦋', message: 'Beautiful like a butterfly!', title: 'Flutter!' },
    { emoji: '🌈', message: 'You brighten my days!', title: 'Rainbow!' },
    { emoji: '✨', message: 'Magical moments!', title: 'Sparkle!' },
    { emoji: '💫', message: 'You\'re amazing!', title: 'Wow!' },
    { emoji: '🎵', message: 'Music to my ears!', title: 'Sweet!' },
    { emoji: '☀️', message: 'My sunshine!', title: 'Bright!' },
    { emoji: '🌸', message: 'Bloom beautifully!', title: 'Blossom!' },
    { emoji: '💖', message: 'Love you so much!', title: 'Heart!' }
];

// Random surprise pop-up
function createSurprise() {
    const section = document.querySelector('.celebration-screen.active-screen');
    if (!section) return;
    
    const surprise = surprises[Math.floor(Math.random() * surprises.length)];
    
    // Create notification box - append to body for proper centering
    const notification = document.createElement('div');
    notification.classList.add('surprise-notification');
    notification.innerHTML = `
        <h3>${surprise.title}</h3>
        <span class="emoji">${surprise.emoji}</span>
        <p>${surprise.message}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 4000);
    
    // Add floating emojis around the screen
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingEmoji(surprise.emoji);
        }, i * 200);
    }
}

// Create floating emoji
function createFloatingEmoji(emoji) {
    const section = document.querySelector('.celebration-screen.active-screen') || document.querySelector('.section.active');
    if (!section) return;
    
    const element = document.createElement('div');
    element.classList.add('random-float');
    element.textContent = emoji;
    element.style.left = Math.random() * 90 + 5 + '%';
    element.style.top = Math.random() * 50 + 50 + '%';
    
    section.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 5000);
}

// Create simple surprise emoji pop
function createSimpleSurprise() {
    const section = document.querySelector('.celebration-screen.active-screen');
    if (!section) return;
    
    const emojis = ['💝', '🎁', '💐', '🌹', '🎈', '⭐', '✨', '💖', '🌸', '🦋'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const element = document.createElement('div');
    element.classList.add('surprise-popup');
    element.textContent = emoji;
    element.style.left = Math.random() * 80 + 10 + '%';
    element.style.top = Math.random() * 80 + 10 + '%';
    
    section.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 3000);
}

// Trigger surprises randomly when in celebration mode
function startSurprises() {
    // Big surprise notification every 15-25 seconds
    setInterval(() => {
        if (document.querySelector('.celebration-screen').classList.contains('active-screen')) {
            createSurprise();
        }
    }, Math.random() * 10000 + 15000);
    
    // Small pop-ups more frequently (every 5-10 seconds)
    setInterval(() => {
        if (document.querySelector('.celebration-screen').classList.contains('active-screen')) {
            createSimpleSurprise();
        }
    }, Math.random() * 5000 + 5000);
}

// Start surprises after a delay
setTimeout(startSurprises, 3000);

// ============================================
// SCRATCH-OFF COUNTDOWN EFFECT
// ============================================

// Add hover effect to "scratch off" countdown boxes
const timeUnits = document.querySelectorAll('.time-unit');
timeUnits.forEach(unit => {
    unit.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.5s ease';
        this.style.background = '#ffd93d';
        this.style.transform = 'rotate(0deg) scale(1.1)';
    });
    
    unit.addEventListener('mouseleave', function() {
        this.style.background = '#fff';
        this.style.transform = 'rotate(-3deg)';
    });
});

// ============================================
// INTERACTIVE DOODLES
// ============================================

// Make doodles interactive on click (after celebration starts)
function initializeDoodles() {
    const doodles = document.querySelectorAll('.celebration-screen .doodle');
    doodles.forEach(doodle => {
        doodle.style.cursor = 'pointer';
        doodle.style.pointerEvents = 'auto';
        
        doodle.addEventListener('click', function() {
            // Create burst effect
            for (let i = 0; i < 8; i++) {
                const burst = document.createElement('div');
                burst.textContent = this.textContent;
                burst.style.position = 'absolute';
                burst.style.left = this.offsetLeft + 'px';
                burst.style.top = this.offsetTop + 'px';
                burst.style.fontSize = '2rem';
                burst.style.pointerEvents = 'none';
                burst.style.zIndex = '9999';
                
                const angle = (i / 8) * Math.PI * 2;
                const distance = 100;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                burst.style.animation = 'none';
                document.querySelector('.celebration-screen').appendChild(burst);
                
                burst.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });
                
                setTimeout(() => burst.remove(), 800);
            }
            
            // Change doodle emoji
            const emojis = ['🌟', '💫', '✨', '🎨', '🌈', '💝', '🎁', '💐', '🎈', '⭐'];
            this.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        });
    });
}

