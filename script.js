let currentPage = 0;
const pages = document.querySelectorAll('.page');

// Navigasi Pindah Halaman
function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.remove('active');
        if (i === index) {
            page.classList.add('active');
        }
    });
    currentPage = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

function goToPage(index) {
    showPage(index);
}

// Fitur Tombol Ganti Mode (HP / Komputer)
const modeToggleBtn = document.getElementById('modeToggle');
const bodyElement = document.body;

if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('desktop-mode')) {
            bodyElement.classList.remove('desktop-mode');
            bodyElement.classList.add('mobile-mode');
            modeToggleBtn.innerText = "💻 Mode Komputer";
        } else {
            bodyElement.classList.remove('mobile-mode');
            bodyElement.classList.add('desktop-mode');
            modeToggleBtn.innerText = "📱 Mode HP";
        }
    });
}

// Fitur Tiup Lilin Meriah & Konfeti
const blowBtn = document.getElementById('blowBtn');
const flame = document.getElementById('flame');
const surpriseText = document.getElementById('blowSurprise');

if (blowBtn) {
    blowBtn.addEventListener('click', () => {
        flame.classList.add('off');
        blowBtn.innerText = "✨ Lilin Berhasil Ditiup! ✨";
        blowBtn.style.background = "#2ed573";
        blowBtn.disabled = true;
        
        if (surpriseText) {
            surpriseText.classList.remove('hidden');
        }
        
        launchConfetti();
    });
}

// Fitur 1: Love Meter Test (Menghitung cepat sampai 1000%)
function calculateLove() {
    const fill = document.getElementById('loveFill');
    const score = document.getElementById('loveScore');
    const result = document.getElementById('loveResult');
    const calcBtn = document.getElementById('calcLoveBtn');

    calcBtn.disabled = true;
    let currentScore = 0;

    const interval = setInterval(() => {
        currentScore += Math.floor(Math.random() * 25) + 10;
        
        if (currentScore >= 1000) {
            currentScore = 1000;
            clearInterval(interval);
            fill.style.width = '100%';
            score.innerText = '1000% (INFINITY! ❤️)';
            result.innerText = '💥 ERROR: Rasa sayang aku melebihi kapasitas bumi!';
            result.classList.remove('hidden');
            
            // Efek Gemetar Layar
            document.querySelector('.content-box').classList.add('shake');
            launchConfetti();
            
            setTimeout(() => {
                document.querySelector('.content-box').classList.remove('shake');
            }, 500);
        } else {
            fill.style.width = (currentScore / 10) + '%';
            score.innerText = currentScore + '%';
        }
    }, 40);
}

// Fitur 2: Tombol "Gak" berlari melompat saat ditunjuk/disentuh
const noBtn = document.getElementById('noBtn');

if (noBtn) {
    const moveBtn = (e) => {
        e.preventDefault();
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 150;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };

    noBtn.addEventListener('mouseover', moveBtn);
    noBtn.addEventListener('touchstart', moveBtn);
    noBtn.addEventListener('click', moveBtn);
}

function sayYes() {
    const yesResult = document.getElementById('yesResult');
    if (yesResult) {
        yesResult.classList.remove('hidden');
        launchConfetti();
    }
}

// Sistem Efek Konfeti Canvas
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#3742fa', '#ed4245'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.7) * 10,
            size: Math.random() * 7 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            gravity: 0.15,
            opacity: 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeParticles = 0;

        particles.forEach(p => {
            if (p.opacity > 0) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.opacity -= 0.01;

                ctx.save();
                ctx.globalAlpha = Math.max(p.opacity, 0);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                activeParticles++;
            }
        });

        if (activeParticles > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// Efek Partikel Hati Melayang
function createHeart() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 12 + 10 + 'px';
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 500);

// Pemutar Musik MP3
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicBtn.innerText = "⏸️ Matikan Musik";
            }).catch(error => {
                console.log("Gagal memutar audio:", error);
                alert("Pastikan file 'lagu-kita.mp3' sudah ada di dalam folder yang sama!");
            });
        } else {
            bgMusic.pause();
            isPlaying = false;
            musicBtn.innerText = "🎵 Putar Musik";
        }
    });
}