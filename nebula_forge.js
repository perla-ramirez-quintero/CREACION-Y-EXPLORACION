// --- MOTOR DE FÍSICA Y GRÁFICOS: NEBULA FORGE ---

// Configuración del canvas
const canvas = document.getElementById('nebula-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resize);
resize();

// Estado del juego
let energy = 100;
let totalMass = 0;
let activeElement = 'H'; // 'H' o 'He'
let atoms = [];
let particles = []; // Partículas de explosión visual
let isGameOver = false;

// Variables de interacción del mouse/lanzador
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
const maxLaunchForce = 15;

// Variables de sonido (Web Audio API)
let audioCtx = null;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(freq, type = 'sine', duration = 0.4) {
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') return;
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Rampa de volumen para suavidad
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// Configuración física
const physics = {
    G: 0.15,               // Constante de gravedad modificada para jugabilidad
    coreMass: 2500,       // Masa del reactor cuántico central
    friction: 0.998,      // Resistencia al avance mínima en el espacio
    fusionDistance: 22    // Distancia a la que se atraen e integran
};

// Datos de los elementos
const ELEMENT_DATA = {
    'H':  { mass: 1,  radius: 8,  color: '#00ffff', glow: 'rgba(0, 255, 255, 0.8)', name: 'Hidrógeno' },
    'He': { mass: 4,  radius: 12, color: '#ff7675', glow: 'rgba(255, 118, 117, 0.8)', name: 'Helio' },
    'C':  { mass: 12, radius: 16, color: '#a29bfe', glow: 'rgba(162, 155, 254, 0.8)', name: 'Carbono' },
    'O':  { mass: 16, radius: 20, color: '#fd79a8', glow: 'rgba(253, 121, 168, 0.8)', name: 'Oxígeno' },
    'Fe': { mass: 56, radius: 26, color: '#ffeaa7', glow: 'rgba(255, 234, 167, 0.8)', name: 'Hierro' }
};

// Reactor central (El Núcleo Cuántico)
const core = {
    x: 0,
    y: 0,
    radius: 40,
    pulse: 0,
    update() {
        this.x = width / 2;
        this.y = height / 2;
        this.pulse += 0.05;
        this.radius = 40 + Math.sin(this.pulse) * 4;
    },
    draw() {
        // Resplandor exterior
        const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius * 2);
        grad.addColorStop(0, '#8a2be2');
        grad.addColorStop(0.3, 'rgba(138, 43, 226, 0.4)');
        grad.addColorStop(1, 'rgba(11, 9, 20, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo físico
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
    }
};

// Clase para los Átomos
class Atom {
    constructor(x, y, vx, vy, type) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;
        this.mass = ELEMENT_DATA[type].mass;
        this.radius = ELEMENT_DATA[type].radius;
        this.color = ELEMENT_DATA[type].color;
        this.glow = ELEMENT_DATA[type].glow;
        this.history = []; // Para estelas visuales
        this.maxHistory = 15;
    }

    update() {
        // Guardar posición en la estela
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        // Fuerza de gravedad hacia el núcleo central
        const dx = core.x - this.x;
        const dy = core.y - this.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist > 30) {
            // F = G * m1 * m2 / r^2 -> Aceleración = G * M_core / r^2
            const force = (physics.G * physics.coreMass) / distSq;
            const ax = (dx / dist) * force;
            const ay = (dy / dist) * force;

            this.vx += ax;
            this.vy += ay;
        }

        // Aplicar fricción espacial y actualizar posición
        this.vx *= physics.friction;
        this.vy *= physics.friction;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        // Dibujar estela luminosa
        if (this.history.length > 1) {
            ctx.beginPath();
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for (let i = 1; i < this.history.length; i++) {
                ctx.lineTo(this.history[i].x, this.history[i].y);
            }
            ctx.strokeStyle = this.glow;
            ctx.lineWidth = this.radius * 0.3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
        }

        // Círculo del átomo
        ctx.save();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Texto interno del símbolo químico
        ctx.fillStyle = '#0b0914';
        ctx.font = `bold ${this.radius * 0.9}px Outfit`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.type, this.x, this.y);
    }
}

// Partículas visuales tras fusión
class Spark {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.radius = Math.random() * 4 + 1;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.03 + 0.01;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Selector de elemento activo
window.selectElement = function(el) {
    initAudio();
    activeElement = el;
    document.querySelectorAll('.element-btn').forEach(btn => btn.classList.remove('active'));
    if (el === 'H') {
        document.querySelector('.h-btn').classList.add('active');
        playSound(600, 'sine', 0.1);
    } else {
        document.querySelector('.he-btn').classList.add('active');
        playSound(450, 'sine', 0.1);
    }
};

// Generar una explosión visual
function createExplosion(x, y, color) {
    for (let i = 0; i < 25; i++) {
        particles.push(new Spark(x, y, color));
    }
}

// Toast flotante de notificaciones
function showToast(text, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = text;
    toast.className = `toast-feedback show ${type}`;
    setTimeout(() => {
        toast.className = 'toast-feedback';
    }, 2500);
}

// Lógica de fusión de partículas
function checkFusions() {
    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            const a1 = atoms[i];
            const a2 = atoms[j];

            const dx = a2.x - a1.x;
            const dy = a2.y - a1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Si están lo suficientemente cerca, chequear fusión
            if (dist < (a1.radius + a2.radius) * 1.2) {
                let nextType = null;
                
                // Reglas de fusión
                if (a1.type === 'H' && a2.type === 'H') nextType = 'He';
                else if (a1.type === 'He' && a2.type === 'He') nextType = 'C';
                else if ((a1.type === 'C' && a2.type === 'He') || (a1.type === 'He' && a2.type === 'C')) nextType = 'O';
                else if ((a1.type === 'O' && a2.type === 'C') || (a1.type === 'C' && a2.type === 'O')) nextType = 'Fe';

                if (nextType) {
                    const midX = (a1.x + a2.x) / 2;
                    const midY = (a1.y + a2.y) / 2;
                    
                    // Velocidades conservadas (impulso)
                    const vx = (a1.vx * a1.mass + a2.vx * a2.mass) / (a1.mass + a2.mass);
                    const vy = (a1.vy * a1.mass + a2.vy * a2.mass) / (a1.mass + a2.mass);

                    // Eliminar reactores
                    atoms.splice(j, 1);
                    atoms.splice(i, 1);

                    // Añadir nuevo átomo fusionado
                    atoms.push(new Atom(midX, midY, vx, vy, nextType));

                    // Efectos visuales y de sonido
                    createExplosion(midX, midY, ELEMENT_DATA[nextType].color);
                    
                    // Sonido según el elemento fusionado (más grave conforme se hace más pesado)
                    const frequencies = { 'He': 350, 'C': 260, 'O': 180, 'Fe': 110 };
                    playSound(frequencies[nextType] || 200, 'triangle', 0.6);

                    // Actualizar masa total y energía
                    const addedMass = ELEMENT_DATA[nextType].mass * 2;
                    totalMass += addedMass;
                    energy = Math.min(100, energy + 15);
                    
                    showToast(`¡Fusión lograda! Creaste ${ELEMENT_DATA[nextType].name} (+${addedMass} Masa)`);
                    updateHUD();

                    return; // Detener bucle de este cuadro para evitar desbordamientos
                }
            }
        }
    }
}

// Colisiones contra el núcleo (absorción masiva)
function checkCoreCollisions() {
    for (let i = atoms.length - 1; i >= 0; i--) {
        const atom = atoms[i];
        const dx = core.x - atom.x;
        const dy = core.y - atom.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < core.radius + atom.radius * 0.5) {
            // El núcleo absorbe la partícula
            totalMass += atom.mass;
            createExplosion(atom.x, atom.y, atom.color);
            playSound(150, 'sawtooth', 0.2);
            atoms.splice(i, 1);
            showToast(`Átomo absorbido por el reactor (+${atom.mass} Masa)`, 'success');
            updateHUD();
        }
    }
}

// Actualizar textos e interfaces HUD
const CELESTIAL_STAGES = [
    { limit: 20, name: "Polvo Cósmico" },
    { limit: 50, name: "Protoestrella Creciente" },
    { limit: 120, name: "Enana Marrón" },
    { limit: 280, name: "Enana Roja Brillante" },
    { limit: 500, name: "Estrella de Secuencia Principal" },
    { limit: 800, name: "Gigante Azul Masiva" },
    { limit: Infinity, name: "Supernova / Agujero Negro" }
];

function getCelestialName(mass) {
    for (let stage of CELESTIAL_STAGES) {
        if (mass <= stage.limit) return stage.name;
    }
    return "Singularidad Cuántica";
}

function updateHUD() {
    document.getElementById('celestial-name').textContent = getCelestialName(totalMass);
    document.getElementById('energy-bar').style.width = `${energy}%`;
    
    // Barra de masa porcentual al siguiente nivel
    let currentLimit = 0;
    let nextLimit = CELESTIAL_STAGES[0].limit;
    for (let i = 0; i < CELESTIAL_STAGES.length; i++) {
        if (totalMass > CELESTIAL_STAGES[i].limit) {
            currentLimit = CELESTIAL_STAGES[i].limit;
            nextLimit = CELESTIAL_STAGES[i+1].limit;
        } else {
            break;
        }
    }
    
    const percentage = nextLimit === Infinity ? 100 : ((totalMass - currentLimit) / (nextLimit - currentLimit)) * 100;
    document.getElementById('mass-bar').style.width = `${percentage}%`;

    // Checar victoria
    if (totalMass >= 800 && !isGameOver) {
        endGame(true);
    }
}

// Terminar el juego (Victoria o Derrota)
function endGame(victory) {
    isGameOver = true;
    const modal = document.getElementById('nebula-modal');
    const badge = document.getElementById('modal-badge-status');
    const title = document.getElementById('modal-title-text');
    const desc = document.getElementById('modal-desc-text');

    if (victory) {
        badge.textContent = "¡Victoria Cósmica!";
        badge.style.color = "var(--cosmic-secondary)";
        badge.style.background = "rgba(0, 255, 255, 0.1)";
        title.textContent = "¡Supernova Creada!";
        desc.textContent = `¡Felicidades! Lograste una masa de ${totalMass}. Has colapsado la estrella en una magnífica Supernova, dejando a toda tu clase asombrada.`;
        playSound(880, 'sine', 1);
    } else {
        badge.textContent = "Reactor apagado";
        badge.style.color = "var(--cosmic-accent)";
        badge.style.background = "rgba(255, 0, 127, 0.1)";
        title.textContent = "Sin Energía";
        desc.textContent = `Tu reactor espacial se ha quedado sin energía y no quedan átomos orbitando. Masa alcanzada: ${totalMass} (${getCelestialName(totalMass)}).`;
        playSound(100, 'sawtooth', 1.2);
    }

    modal.style.display = 'flex';
}

// Reiniciar la simulación
window.restartGame = function() {
    atoms = [];
    particles = [];
    energy = 100;
    totalMass = 0;
    isGameOver = false;
    document.getElementById('nebula-modal').style.display = 'none';
    updateHUD();
};

// Eventos de entrada táctil/mouse para lanzar átomos
canvas.addEventListener('mousedown', (e) => {
    if (isGameOver) return;
    initAudio();
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    
    // Solo permitir lanzar desde fuera del núcleo
    const dx = startX - core.x;
    const dy = startY - core.y;
    if (Math.sqrt(dx*dx + dy*dy) > core.radius + 10) {
        isDragging = true;
        currentX = startX;
        currentY = startY;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;
});

canvas.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;

    // Calcular vector de fuerza de lanzamiento (tirachinas)
    const dx = startX - currentX;
    const dy = startY - currentY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {
        // Reducir energía
        if (energy >= 10) {
            energy -= 10;
            
            // Escalar fuerza de lanzamiento
            const force = Math.min(maxLaunchForce, dist * 0.1);
            const angle = Math.atan2(dy, dx);
            const vx = Math.cos(angle) * force;
            const vy = Math.sin(angle) * force;

            // Lanzar átomo
            atoms.push(new Atom(startX, startY, vx, vy, activeElement));
            playSound(300 + force * 20, 'sine', 0.25);
            updateHUD();
        } else {
            showToast("¡Energía insuficiente para lanzar!", "error");
            playSound(120, 'square', 0.15);
        }
    }
});

// Bucle principal de simulación y renderizado
function gameLoop() {
    // Fondo espacial profundo semi-borrado para estelas
    ctx.fillStyle = 'rgba(11, 9, 20, 0.2)';
    ctx.fillRect(0, 0, width, height);

    // Actualizar y dibujar reactor central
    core.update();
    core.draw();

    // Actualizar y dibujar chispas de fusión
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
            particles.splice(i, 1);
        } else {
            p.draw();
        }
    }

    // Actualizar y dibujar átomos orbitales
    atoms.forEach(atom => {
        atom.update();
        atom.draw();
    });

    // Detectar colisiones y fusiones
    if (!isGameOver) {
        checkFusions();
        checkCoreCollisions();

        // Condición de derrota: sin energía y sin átomos en juego
        if (energy < 10 && atoms.length === 0) {
            endGame(false);
        }
    }

    // Dibujar guía del lanzador interactivo
    if (isDragging) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = ELEMENT_DATA[activeElement].color;
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Dibujar indicador de fuerza de salida
        ctx.beginPath();
        ctx.arc(startX, startY, 6, 0, Math.PI * 2);
        ctx.fillStyle = ELEMENT_DATA[activeElement].color;
        ctx.fill();
    }

    requestAnimationFrame(gameLoop);
}

// Auto-reabastecimiento pasivo de energía lento
setInterval(() => {
    if (!isGameOver && energy < 100) {
        energy = Math.min(100, energy + 2);
        updateHUD();
    }
}, 2000);

// Iniciar bucle
gameLoop();
updateHUD();
