const alphabetDict = {
    'A': { word: 'Abeja', icon: '🐝' }, 'B': { word: 'Búho', icon: '🦉' },
    'C': { word: 'Conejo', icon: '🐰' }, 'D': { word: 'Delfín', icon: '🐬' },
    'E': { word: 'Elefante', icon: '🐘' }, 'F': { word: 'Foca', icon: '🦭' },
    'G': { word: 'Gato', icon: '🐱' }, 'H': { word: 'Helado', icon: '🍦' },
    'I': { word: 'Iguana', icon: '🦎' }, 'J': { word: 'Jirafa', icon: '🦒' },
    'K': { word: 'Koala', icon: '🐨' }, 'L': { word: 'León', icon: '🦁' },
    'M': { word: 'Manzana', icon: '🍎' }, 'N': { word: 'Nube', icon: '☁️' },
    'Ñ': { word: 'Ñandú', icon: '🐦' }, 'O': { word: 'Oso', icon: '🐻' },
    'P': { word: 'Perro', icon: '🐶' }, 'Q': { word: 'Queso', icon: '🧀' },
    'R': { word: 'Ratón', icon: '🐭' }, 'S': { word: 'Sol', icon: '☀️' },
    'T': { word: 'Tren', icon: '🚂' }, 'U': { word: 'Uvas', icon: '🍇' },
    'V': { word: 'Vaca', icon: '🐮' }, 'W': { word: 'Waffle', icon: '🧇' },
    'X': { word: 'Xilófono', icon: '🎹' }, 'Y': { word: 'Yoyo', icon: '🪀' },
    'Z': { word: 'Zanahoria', icon: '🥕' }
};

const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split('');
let playerName = "";
let currentWagonIndex = 0;

const keyboardContainer = document.getElementById('keyboard');
const nameDisplay = document.getElementById('name-display');
const btnStart = document.getElementById('btn-start');

// Configuración de Voz
let synth = window.speechSynthesis;
let voice = null;
function initVoices() {
    let voices = synth.getVoices();
    voice = voices.find(v => v.lang.startsWith('es')) || voices[0];
}
synth.onvoiceschanged = initVoices;
initVoices();

function speak(text) {
    if (synth.speaking) synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);
    if (voice) utterThis.voice = voice;
    utterThis.pitch = 1.3; 
    utterThis.rate = 0.9;
    synth.speak(utterThis);
}

// Inicializar Teclado
function initKeyboard() {
    letters.forEach(l => {
        let btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.innerText = l;
        btn.onclick = () => addLetter(l);
        keyboardContainer.appendChild(btn);
    });
}

function addLetter(l) {
    if (playerName.length < 10) {
        playerName += l;
        updateNameDisplay();
        speak(l);
    }
}

function clearName() {
    playerName = "";
    updateNameDisplay();
}

function updateNameDisplay() {
    nameDisplay.innerText = playerName || "_";
    btnStart.style.display = playerName.length > 0 ? 'inline-block' : 'none';
}

function startTrain() {
    if (!playerName) return;
    speak(`¡Hola ${playerName}! Vamos a cargar tu tren.`);
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    buildTrain();
    loadNextWagonTask();
}

function buildTrain() {
    const track = document.getElementById('train-track');
    track.innerHTML = '<div class="train-engine"></div>';
    
    for (let i = 0; i < playerName.length; i++) {
        let w = document.createElement('div');
        w.className = 'wagon';
        w.id = `wagon-${i}`;
        w.innerText = "?"; // Oculto inicialmente
        track.appendChild(w);
    }
}

function loadNextWagonTask() {
    if (currentWagonIndex >= playerName.length) {
        // Victoria
        speak(`¡Felicidades ${playerName}! Tu tren está completo.`);
        document.getElementById('victory-modal').style.display = 'flex';
        return;
    }

    const targetLetter = playerName[currentWagonIndex];
    document.getElementById('instruction-text').innerText = `Busca algo que empiece con la letra ${targetLetter}...`;
    speak(`Busca algo que empiece con ${targetLetter}`);

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Generar opciones: 1 correcta, 2 incorrectas
    let correctItem = alphabetDict[targetLetter] || { word: 'Objeto', icon: '❓' };
    
    let distractors = letters.filter(l => l !== targetLetter);
    distractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    let options = [
        { letter: targetLetter, item: correctItem, isCorrect: true },
        { letter: distractors[0], item: alphabetDict[distractors[0]], isCorrect: false },
        { letter: distractors[1], item: alphabetDict[distractors[1]], isCorrect: false }
    ];

    options.sort(() => 0.5 - Math.random()); // Mezclar

    options.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'key-btn';
        btn.style.width = '120px';
        btn.style.height = '120px';
        btn.style.fontSize = '4rem';
        btn.innerText = opt.item.icon;
        
        btn.onclick = () => {
            if (opt.isCorrect) {
                speak(`¡Muy bien! ${targetLetter} de ${opt.item.word}`);
                document.getElementById(`wagon-${currentWagonIndex}`).innerText = targetLetter;
                currentWagonIndex++;
                setTimeout(loadNextWagonTask, 2000);
            } else {
                speak(`Oops, eso es un ${opt.item.word}. Intenta de nuevo.`);
                btn.style.opacity = '0.5';
                btn.style.pointerEvents = 'none';
            }
        };
        optionsContainer.appendChild(btn);
    });
}

initKeyboard();
