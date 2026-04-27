// Variables globales
let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;

// Elementos UI
const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnRead = document.getElementById('btn-read');
const indicator = document.getElementById('page-indicator');
const gameContainer = document.getElementById('game-container');
const particlesContainer = document.getElementById('particles-container');

// Audios y Partículas temporizadores
let particleInterval;
const synth = window.speechSynthesis;
let currentUtterance = null;

// Inicialización
function init() {
    updatePage();
    
    // Navegación
    btnStart.addEventListener('click', () => {
        playSound('woohoo');
        nextPage();
    });
    btnNext.addEventListener('click', () => {
        playSound('pop');
        nextPage();
    });
    btnPrev.addEventListener('click', () => {
        playSound('pop');
        prevPage();
    });
    
    // Botón de lectura global
    btnRead.addEventListener('click', readCurrentPageText);
    
    // Interacciones de los elementos
    setupInteractions();
    
    // Preparar voces de inmediato (necesario en algunos navegadores)
    if(speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => { console.log("Voces cargadas"); };
    }
}

// Navegar entre páginas
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updatePage();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
}

// Actualizar la interfaz y animaciones según la página actual
function updatePage() {
    // Detener cualquier lectura activa para que no se superpongan
    synth.cancel();
    
    // Ocultar todas las páginas excepto la actual
    pages.forEach((p, index) => {
        if (index !== currentPage) {
            p.classList.remove('active');
            setTimeout(() => p.classList.add('hidden'), 500); // Dar tiempo a la transicion
        }
    });
    
    // Mostrar la página actual
    const current = pages[currentPage];
    current.classList.remove('hidden');
    // Usamos timeout para dar el efecto fade-in fluido
    setTimeout(() => current.classList.add('active'), 50);

    // Cambiar fondo general leyendo el dataset
    const theme = current.getAttribute('data-theme');
    gameContainer.setAttribute('data-current-theme', theme);
    
    // Actualizar botones inferiores
    if (currentPage === 0) {
        btnPrev.classList.add('hidden');
        btnNext.classList.add('hidden');
        indicator.classList.add('hidden');
        btnRead.classList.add('hidden');
    } else {
        btnRead.classList.remove('hidden');
        indicator.classList.remove('hidden');
        
        // Determinar textos del indicador
        const pageNames = ["Portada", "Primavera", "Verano", "Otoño", "Invierno", "Final"];
        indicator.innerText = pageNames[currentPage];
        
        if (currentPage === totalPages - 1) {
            btnNext.classList.add('hidden');
            btnPrev.classList.remove('hidden');
        } else {
            btnNext.classList.remove('hidden');
            btnPrev.classList.remove('hidden');
        }
    }
    
    // Manejar efectos de partículas
    manageParticles(theme);
}

// Efectos de partículas dinámicos (Nieve y Viento)
function manageParticles(theme) {
    clearInterval(particleInterval);
    particlesContainer.innerHTML = ''; // Limpiar partículas previas
    
    if (theme === 'autumn' || theme === 'winter') {
        const isWinter = theme === 'winter';
        const character = isWinter ? '❄️' : '🍂';
        const speedMultiplier = isWinter ? 1 : 0.8;
        
        // Crear una nueva particula cada X milisegundos
        particleInterval = setInterval(() => {
            const p = document.createElement('div');
            p.className = 'particle';
            p.innerText = character;
            p.style.left = (Math.random() * 100) + 'vw';
            
            // Tamaños aleatorios y duracion de caida
            const size = Math.random() * 1.5 + 1; // 1 a 2.5 rem
            p.style.fontSize = size + 'rem';
            p.style.animationDuration = (Math.random() * 3 + 3) * speedMultiplier + 's'; // 3 a 6 segundos
            
            particlesContainer.appendChild(p);
            
            // Eliminar elemento despues de caer para no llenar el DOM
            setTimeout(() => { p.remove(); }, 6000);
            
        }, isWinter ? 300 : 500); // Mas nieve que hojitas
    }
}

// --- VOCES Y SONIDOS --- //

// Text to speech para lectura del cuento
function readCurrentPageText() {
    synth.cancel(); // Para inmediatamente si ya estaba leyendo
    
    const textToRead = pages[currentPage].getAttribute('data-text');
    if (!textToRead) return;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-MX'; // Español de México/Latino
    utterance.rate = 0.9; // Un poco más lento para los niños
    utterance.pitch = 1.1; // Un poco más agudo, más dulce
    
    // Intentar buscar una voz femenina en español si está disponible
    const voices = synth.getVoices();
    const femaleVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Female') || v.name.includes('Mujer') || v.name.includes('Sabina')));
    if(femaleVoice) utterance.voice = femaleVoice;
    
    synth.speak(utterance);
}

// Text to speech para interacciones divertidas (las figuras hablan)
function speakInteraction(text) {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 1.1; // Más rápido
    utterance.pitch = 1.8; // Muy agudo / Voz de "osito" o caricatura
    
    synth.speak(utterance);
}

// Soniditos simples usando Web Audio API para no requerir archivos .mp3 locales
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'pop') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'magic') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'woohoo') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.2);
        oscillator.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    }
}

// --- INTERACCIONES DE CLICS --- //

function setupInteractions() {
    const interactives = document.querySelectorAll('.interactive');
    
    interactives.forEach(el => {
        el.addEventListener('click', function() {
            // Sonido mágico básico al tocar
            playSound('magic');
            
            // Hacer que hable el personaje si tiene texto
            const speech = this.getAttribute('data-speech');
            if(speech) {
                speakInteraction(speech);
            }
            
            // Acciones especiales por data-action
            const action = this.getAttribute('data-action');
            if(action) {
                if (action === 'grow') {
                    // La semilla se convierte en flor girasol y crece
                    this.innerHTML = '🌻';
                    this.classList.add('grown');
                    this.style.pointerEvents = 'none'; // ya no se puede clickear
                } 
                else if (action === 'eat') {
                    // La manzana desaparece
                    this.classList.add('eaten');
                }
                else if (action === 'shake-drop') {
                    // El arbol tiembla y las hojas caen
                    this.classList.add('shake');
                    setTimeout(() => {
                        this.classList.remove('shake');
                        this.classList.add('dropped');
                        // Generar extra hojitas
                        manageParticles('autumn');
                    }, 500);
                }
                else if (action === 'spin') {
                    // El muñeco de nieve da una vuelta rápida
                    this.classList.remove('bounce');
                    this.classList.add('spin-action');
                    setTimeout(() => {
                        this.classList.remove('spin-action');
                        this.classList.add('bounce');
                    }, 1000);
                }
            } else {
                // Si no tiene animación específica, hacer que vibre o crezca un poquitito
                this.classList.add('shake');
                setTimeout(() => this.classList.remove('shake'), 500);
            }
        });
    });
}

// Iniciar
window.onload = init;
