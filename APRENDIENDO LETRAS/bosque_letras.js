const alphabet = [
    { letter: 'A', word: 'Abeja', icon: '🐝', color: '#ff6b6b' },
    { letter: 'B', word: 'Búho', icon: '🦉', color: '#4ecdc4' },
    { letter: 'C', word: 'Conejo', icon: '🐰', color: '#ffe66d' },
    { letter: 'D', word: 'Delfín', icon: '🐬', color: '#c06c84' },
    { letter: 'E', word: 'Elefante', icon: '🐘', color: '#ff6b6b' },
    { letter: 'F', word: 'Foca', icon: '🦭', color: '#4ecdc4' },
    { letter: 'G', word: 'Gato', icon: '🐱', color: '#ffe66d' },
    { letter: 'H', word: 'Hormiga', icon: '🐜', color: '#c06c84' },
    { letter: 'I', word: 'Iguana', icon: '🦎', color: '#ff6b6b' },
    { letter: 'J', word: 'Jirafa', icon: '🦒', color: '#4ecdc4' },
    { letter: 'K', word: 'Koala', icon: '🐨', color: '#ffe66d' },
    { letter: 'L', word: 'León', icon: '🦁', color: '#c06c84' },
    { letter: 'M', word: 'Mariposa', icon: '🦋', color: '#ff6b6b' },
    { letter: 'N', word: 'Nube', icon: '☁️', color: '#4ecdc4' },
    { letter: 'O', word: 'Oso', icon: '🐻', color: '#ffe66d' },
    { letter: 'P', word: 'Perro', icon: '🐶', color: '#c06c84' },
    { letter: 'Q', word: 'Queso', icon: '🧀', color: '#ff6b6b' },
    { letter: 'R', word: 'Ratón', icon: '🐭', color: '#4ecdc4' },
    { letter: 'S', word: 'Sol', icon: '☀️', color: '#ffe66d' },
    { letter: 'T', word: 'Tigre', icon: '🐯', color: '#c06c84' },
    { letter: 'U', word: 'Uvas', icon: '🍇', color: '#ff6b6b' },
    { letter: 'V', word: 'Vaca', icon: '🐮', color: '#4ecdc4' },
    { letter: 'W', word: 'Waffle', icon: '🧇', color: '#ffe66d' },
    { letter: 'X', word: 'Xilófono', icon: '🎹', color: '#c06c84' },
    { letter: 'Y', word: 'Yoyo', icon: '🪀', color: '#ff6b6b' },
    { letter: 'Z', word: 'Zorro', icon: '🦊', color: '#4ecdc4' }
];

const container = document.getElementById('bosque-container');
const modal = document.getElementById('preschool-modal');
const modalLetter = document.getElementById('modal-letter');
const modalWord = document.getElementById('modal-word');
const modalIcon = document.getElementById('modal-icon');

// Configuración de la voz
let synth = window.speechSynthesis;
let voice = null;

// Inicializar voces
function initVoices() {
    let voices = synth.getVoices();
    // Intentar buscar una voz en español
    voice = voices.find(v => v.lang.startsWith('es-MX') || v.lang.startsWith('es-ES') || v.lang.startsWith('es')) || voices[0];
}

synth.onvoiceschanged = initVoices;
initVoices();

function speak(text) {
    if (synth.speaking) {
        synth.cancel();
    }
    const utterThis = new SpeechSynthesisUtterance(text);
    if (voice) {
        utterThis.voice = voice;
    }
    utterThis.pitch = 1.3; // Tono un poco más agudo e infantil
    utterThis.rate = 0.9;  // Velocidad pausada
    synth.speak(utterThis);
}

function initGame() {
    // Solo borrar las letras anteriores, no el fondo
    const existingLetters = container.querySelectorAll('.letter-item');
    existingLetters.forEach(el => el.remove());
    // Seleccionamos unas 8 letras aleatorias para no saturar la pantalla
    let shuffled = [...alphabet].sort(() => 0.5 - Math.random());
    let selectedLetters = shuffled.slice(0, 8);

    selectedLetters.forEach(item => {
        let el = document.createElement('div');
        el.className = 'letter-item';
        el.innerText = item.letter;
        el.style.color = item.color;
        
        // Posición aleatoria dentro del canvas
        let x = Math.random() * 80 + 10; // 10% a 90%
        let y = Math.random() * 80 + 10;
        
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;

        el.addEventListener('click', () => onLetterClick(item, el));
        container.appendChild(el);
    });
}

function onLetterClick(item, el) {
    el.classList.add('found');
    speak(`¡La letra ${item.letter}! ${item.letter} de ${item.word}`);
    
    // Mostrar modal
    modalLetter.innerText = item.letter;
    modalLetter.style.color = item.color;
    modalWord.innerText = `de ${item.word}`;
    modalIcon.innerText = item.icon;
    
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Iniciar juego
initGame();
