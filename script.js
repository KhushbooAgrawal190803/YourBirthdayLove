// Birthday date - January 16, 2026 at midnight IST
// IST is UTC+5:30
const birthdayDate = new Date('2026-01-16T00:00:00+05:30').getTime();

// ============================================
// LIGHT SWITCH ENTRY - SIMPLE FLOW
// ============================================
function flipSwitch() {
    const lightSwitch = document.getElementById('lightSwitch');
    lightSwitch.classList.add('on');
    
    // Disable further clicks
    lightSwitch.style.pointerEvents = 'none';
    
    // Wait for switch animation, then go straight to cake
    setTimeout(() => {
        // Remove dark screen
        const darkScreen = document.getElementById('dark-entry-screen');
        if (darkScreen) {
            darkScreen.remove();
        }
        
        // Start birthday music
        const music = document.getElementById('birthday-music');
        if (music) {
            music.volume = 0.7;
            music.play().catch(() => {
                // If autoplay blocked, play on first interaction
                document.body.addEventListener('click', () => music.play(), { once: true });
            });
        }
        
        // Show confetti
        launchMassiveConfetti();
        
        // Show cake screen immediately
        setTimeout(() => {
            showCakeScreen();
        }, 500);
    }, 800);
}

// Massive confetti blast from top/sides
function launchMassiveConfetti() {
    const colors = ['#ff6b9d', '#ffd93d', '#4ecdc4', '#a8e6cf', '#ff9a76', '#c7b3ff', '#ff1493', '#ffd700'];
    
    // Create 300 confetti pieces from top!
    for (let i = 0; i < 300; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '12px';
            confetti.style.height = '12px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random position across top
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-30px'; // Start from top
            
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animation = `fall ${Math.random() * 2 + 3}s linear forwards`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.zIndex = '100000';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 8);
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

// (Removed - Not needed for simple flow)

// (Removed - Not needed for simple flow)

// ============================================
// CAKE WITH CANDLES SCREEN
// ============================================

let blownCandles = 0;
let totalCandles = 7; // 7 candles for age 27
let audioContext;
let microphone;

function showCakeScreen() {
    try {
        // Remove any existing cake screen first
        const existingCake = document.getElementById('blow-cake-screen');
        if (existingCake) {
            existingCake.remove();
        }
        
        // Create cake screen
        const cakeScreen = document.createElement('div');
        cakeScreen.id = 'blow-cake-screen';
        cakeScreen.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: #0a0a0a !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 999999 !important;
            pointer-events: auto !important;
            visibility: visible !important;
            opacity: 1 !important;
        `;
        
        cakeScreen.innerHTML = `
            <h1 style="color: #fff; font-size: 3rem; margin-bottom: 2rem; text-shadow: 0 0 20px rgba(255,107,157,0.8); font-family: 'Comic Sans MS', cursive;">
                Happy 27th Birthday Adi! 🎂
            </h1>
            <p style="color: #fff; font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.8;">
                Make a wish and blow out the candles! 🕯️✨
            </p>
            <div id="interactive-cake" style="background: transparent;"></div>
            <p id="blow-instruction" style="color: #ffd93d; font-size: 1.2rem; margin-top: 2rem; animation: pulse 2s ease-in-out infinite; transition: all 0.2s ease;">
                🎤 Blow into your microphone to blow out the candles! 💨
            </p>
        `;
        
        document.body.appendChild(cakeScreen);
        
        // Make absolutely sure it stays visible
        setTimeout(() => {
            const cake = document.getElementById('blow-cake-screen');
            if (cake) {
                cake.style.display = 'flex';
                cake.style.visibility = 'visible';
                cake.style.opacity = '1';
            }
        }, 100);
        
        // Create cake with candles
        setTimeout(() => {
            createInteractiveCake();
        }, 150);
        
        // Setup microphone
        setTimeout(() => {
            setupMicrophone();
        }, 200);
        
    } catch (error) {
        console.error('Error showing cake screen:', error);
        alert('Error loading birthday surprise! Please refresh the page.');
    }
}

function createInteractiveCake() {
    const cakeContainer = document.getElementById('interactive-cake');
    
    if (!cakeContainer) {
        console.error('❌ Cake container not found!');
        return;
    }
    
    let cakeHTML = `
        <div style="position: relative; width: 400px; height: 350px; display: flex; align-items: center; justify-content: center;">
            
            <!-- Simple Cute Cake with integrated candles -->
            <div style="position: relative; width: 300px; height: 250px;">
                
                <!-- Top Layer with Candles -->
                <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 220px; height: 70px; background: linear-gradient(to bottom, #ffb6c1, #ff69b4); border-radius: 10px 10px 0 0; box-shadow: 0 2px 10px rgba(0,0,0,0.3); border: 3px solid #ff1493;">
                    <!-- Candles directly on this layer -->
                    <div style="position: absolute; top: -50px; left: 0; right: 0; display: flex; justify-content: space-evenly; padding: 0 20px;">
    `;
    
    // Create 7 candles
    for (let i = 0; i < 7; i++) {
        cakeHTML += `
            <div class="blow-candle lit" data-candle="${i}" data-blow-count="0" style="position: relative; display: inline-block;">
                <div class="candle-flame" style="position: absolute; top: -28px; left: 50%; transform: translateX(-50%); width: 20px; height: 28px; background: radial-gradient(ellipse at center, #ffff00 0%, #ff6600 60%, transparent 70%); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; animation: flicker 0.3s infinite alternate; filter: drop-shadow(0 0 10px rgba(255, 200, 0, 0.8));"></div>
                <div class="candle-stick" style="width: 12px; height: 50px; background: linear-gradient(to right, #ffe4b5, #ffd700); border-radius: 3px; border: 2px solid #ff69b4; box-shadow: inset 0 1px 2px rgba(255,255,255,0.5); display: block;"></div>
            </div>
        `;
    }
    
    cakeHTML += `
                    </div>
                    <!-- Frosting decorations -->
                    <div style="position: absolute; bottom: 10px; left: 25px; width: 12px; height: 12px; background: white; border-radius: 50%; box-shadow: 30px 0 0 white, 60px 0 0 white, 90px 0 0 white, 120px 0 0 white, 150px 0 0 white;"></div>
                </div>
                
                <!-- Middle Layer -->
                <div style="position: absolute; top: 70px; left: 50%; transform: translateX(-50%); width: 240px; height: 70px; background: linear-gradient(to bottom, #ffe4b5, #ffd700); box-shadow: 0 2px 10px rgba(0,0,0,0.2); border-left: 3px solid #ffb700; border-right: 3px solid #ffb700;">
                    <!-- Colorful sprinkles -->
                    <div style="position: absolute; top: 20px; left: 30px; width: 8px; height: 8px; background: #ff1493; border-radius: 50%; box-shadow: 30px 5px 0 #4ecdc4, 60px -2px 0 #9370db, 90px 8px 0 #ff6347, 120px 3px 0 #32cd32, 150px 6px 0 #ff69b4;"></div>
                </div>
                
                <!-- Bottom Layer -->
                <div style="position: absolute; top: 140px; left: 50%; transform: translateX(-50%); width: 260px; height: 70px; background: linear-gradient(to bottom, #b0e0e6, #87ceeb); border-radius: 0 0 10px 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border: 3px solid #4682b4; border-top: none;">
                    <!-- Hearts decoration -->
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));">💕</div>
                </div>
                
                <!-- Simple Plate -->
                <div style="position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); width: 300px; height: 10px; background: #e0e0e0; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 2px solid #c0c0c0;"></div>
            </div>
        </div>
    `;
    
    cakeContainer.innerHTML = cakeHTML;
}

function setupMicrophone() {
    const instruction = document.getElementById('blow-instruction');
    if (!instruction) {
        console.error('❌ Blow instruction element not found!');
        return;
    }
    
    let lastBlowTime = 0;
    const blowCooldown = 350; // 350ms between blows
    
    // Request microphone access immediately
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context if suspended (browser security)
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            microphone = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 512; // More detailed frequency analysis
            analyser.smoothingTimeConstant = 0.6; // Better response for blowing
            microphone.connect(analyser);
            
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            let consecutiveHighReadings = 0;
            
            // Update instruction to show mic is active
            document.getElementById('blow-instruction').textContent = '🎤 Microphone active! Blow to put out the candles! 💨';
            document.getElementById('blow-instruction').style.color = '#4ecdc4';
            
            // Check for blowing sound - balanced sensitivity
            function checkBlowing() {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                
                // Balanced threshold - not too sensitive, not too hard
                if (average > 40) { // Good balance for blowing detection
                    consecutiveHighReadings++;
                    
                    // Need 2 consecutive high readings
                    if (consecutiveHighReadings >= 2) {
                        const currentTime = Date.now();
                        
                        // Only register blow if enough time has passed
                        if (currentTime - lastBlowTime > blowCooldown) {
                            registerBlow();
                            lastBlowTime = currentTime;
                        }
                        
                        consecutiveHighReadings = 0;
                    }
                } else {
                    consecutiveHighReadings = 0;
                }
                
                if (blownCandles < totalCandles) {
                    requestAnimationFrame(checkBlowing);
                }
            }
            
            checkBlowing();
        })
        .catch(err => {
            console.error('Microphone access denied:', err);
            document.getElementById('blow-instruction').innerHTML = '⚠️ Please <strong>allow microphone access</strong> to blow out the candles!<br>Refresh the page and click "Allow" when prompted.';
            document.getElementById('blow-instruction').style.color = '#ff6b9d';
            document.getElementById('blow-instruction').style.fontSize = '1.1rem';
            
            // Enable click as fallback only if mic fails
            setTimeout(() => enableClickToBlow(), 100);
        });
}

function enableClickToBlow() {
    // Fallback: click to blow - ONLY enabled if microphone fails
    const candles = document.querySelectorAll('.blow-candle');
    console.log(`⚠️ Microphone unavailable. Enabling click fallback for ${candles.length} candles`);
    
    candles.forEach((candle, index) => {
        candle.style.cursor = 'pointer';
        candle.addEventListener('click', function() {
            if (this.classList.contains('lit')) {
                // Click requires 3 clicks too for consistency
                let currentBlows = parseInt(this.getAttribute('data-blow-count') || 0);
                currentBlows++;
                this.setAttribute('data-blow-count', currentBlows);
                
                // Shake effect to show blow registered
                this.style.animation = 'shake 0.2s';
                setTimeout(() => this.style.animation = '', 200);
                
                console.log(`Candle ${index + 1} clicked ${currentBlows}/3 times`);
                
                if (currentBlows >= 3) {
                    console.log(`Candle ${index + 1} extinguished!`);
                    blowOutCandle(this);
                }
            }
        });
    });
}

// Register a single blow - find a lit candle and increment its blow count
function registerBlow() {
    const litCandles = document.querySelectorAll('.blow-candle.lit');
    if (litCandles.length > 0) {
        // Pick the first lit candle (blow them out in order)
        const targetCandle = litCandles[0];
        let currentBlows = parseInt(targetCandle.getAttribute('data-blow-count') || 0);
        currentBlows++;
        targetCandle.setAttribute('data-blow-count', currentBlows);
        
        console.log(`🌬️ Blow detected! Candle has been blown ${currentBlows}/3 times`);
        
        // Visual feedback - shake the candle
        targetCandle.style.animation = 'shake 0.3s';
        setTimeout(() => targetCandle.style.animation = '', 300);
        
        // Flash the instruction text
        const instruction = document.getElementById('blow-instruction');
        if (instruction) {
            instruction.style.transform = 'scale(1.1)';
            setTimeout(() => instruction.style.transform = 'scale(1)', 200);
        }
        
        // If this candle has been blown 3 times, extinguish it
        if (currentBlows >= 3) {
            console.log(`🎉 Candle extinguished! ${litCandles.length - 1} candles remaining`);
            blowOutCandle(targetCandle);
        }
    }
}

// Removed blowOutRandomCandle - now using registerBlow with 3-blow requirement

function blowOutCandle(candleElement) {
    candleElement.classList.remove('lit');
    const flame = candleElement.querySelector('.candle-flame');
    if (flame) {
        flame.style.display = 'none';
    }
    
    blownCandles++;
    
    // Update instruction with progress
    const instruction = document.getElementById('blow-instruction');
    const remaining = totalCandles - blownCandles;
    if (remaining > 0) {
        instruction.textContent = `🎉 Great! ${remaining} candle${remaining > 1 ? 's' : ''} left to blow out! 💨`;
    }
    
    // Check if all candles are blown
    if (blownCandles >= totalCandles) {
        setTimeout(() => {
            allCandlesBlown();
        }, 500);
    }
}

function allCandlesBlown() {
    // Stop microphone
    if (microphone) {
        microphone.disconnect();
    }
    if (audioContext) {
        audioContext.close();
    }
    
    // HUGE CONFETTI BLAST
    launchMassiveConfetti();
    
    // Update instruction
    document.getElementById('blow-instruction').textContent = '🎉 All candles blown! Happy Birthday! 🎉';
    document.getElementById('blow-instruction').style.fontSize = '2rem';
    document.getElementById('blow-instruction').style.color = '#ffd93d';
    
    // Remove cake screen and show letter
    setTimeout(() => {
        const cakeScreen = document.getElementById('blow-cake-screen');
        if (cakeScreen) {
            cakeScreen.remove();
        }
        
        // Make sure countdown is gone
        const countdownSection = document.getElementById('countdown-section');
        if (countdownSection) {
            countdownSection.style.display = 'none';
            countdownSection.classList.remove('active');
        }
        
        // Show letter and photos
        const birthdaySection = document.getElementById('birthday-section');
        birthdaySection.classList.add('active');
        birthdaySection.style.display = 'block';
        
        // Enable scrolling
        document.body.classList.add('allow-scroll');
        document.body.style.overflowY = 'auto';
        
        // Scroll to top to see letter
        window.scrollTo(0, 0);
    }, 3000);
}

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

// Surprises removed per user request

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

