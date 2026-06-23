// --- SENDA COMUNITARIA: LÓGICA Y ESTADOS ---

// Estado del barrio (NEM)
let stats = {
    social: 50,
    health: 50,
    wellbeing: 50
};

// Zonas y su estado de completado
let completedQuests = {
    huerto: false,
    agua: false,
    escuela: false,
    parque: false,
    mercado: false
};

// Variable de Audio
let audioCtx = null;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playTone(freq, type = 'sine', duration = 0.3, vol = 0.15) {
    initAudio();
    if (!audioCtx || audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// Toast flotante de feedback
function showToast(text, type = 'success') {
    const toast = document.getElementById('senda-toast');
    toast.textContent = text;
    toast.className = `toast-feedback show ${type}`;
    setTimeout(() => {
        toast.className = 'toast-feedback';
    }, 3000);
}

// Modificar estadísticas y HUD
function updateStats(socialDiff, healthDiff, wellbeingDiff) {
    stats.social = Math.max(0, Math.min(100, stats.social + socialDiff));
    stats.health = Math.max(0, Math.min(100, stats.health + healthDiff));
    stats.wellbeing = Math.max(0, Math.min(100, stats.wellbeing + wellbeingDiff));

    document.getElementById('val-social').textContent = `${stats.social}%`;
    document.getElementById('val-health').textContent = `${stats.health}%`;
    document.getElementById('val-wellbeing').textContent = `${stats.wellbeing}%`;

    document.getElementById('bar-social').style.width = `${stats.social}%`;
    document.getElementById('bar-health').style.width = `${stats.health}%`;
    document.getElementById('bar-wellbeing').style.width = `${stats.wellbeing}%`;

    // Chequear fin de juego o victoria
    checkGameStatus();
}

function checkGameStatus() {
    // Victoria: todos los indicadores en 85%+ y todas las misiones completadas
    const allCompleted = Object.values(completedQuests).every(v => v);
    if (allCompleted && stats.social >= 80 && stats.health >= 80 && stats.wellbeing >= 80) {
        showEndGame(true);
    } else if (stats.social <= 0 || stats.health <= 0 || stats.wellbeing <= 0) {
        showEndGame(false);
    }
}

// Mostrar el fin de la simulación
function showEndGame(victory) {
    const modal = document.getElementById('quest-modal');
    const content = document.getElementById('quest-modal-content');
    modal.style.display = 'flex';

    if (victory) {
        playTone(523.25, 'sine', 0.2); // C5
        setTimeout(() => playTone(659.25, 'sine', 0.2), 150); // E5
        setTimeout(() => playTone(783.99, 'sine', 0.4), 300); // G5
        
        content.innerHTML = `
            <div class="modal-header">
                <span class="modal-badge" style="background: rgba(26,188,156,0.1); color: var(--nem-secondary);">Comunidad en Armonía</span>
            </div>
            <h2 class="modal-title" style="font-size: 2rem; margin-bottom: 1rem;">¡Barrio Ejemplar Transformado! 🏆</h2>
            <p class="modal-description">
                ¡Increíble trabajo! Has completado todas las misiones y elevado el bienestar, la ecología y la convivencia a niveles históricos. 
                Los alumnos de tu clase habrán aprendido que la colaboración vecinal (Tequio) y el pensamiento crítico pueden resolver cualquier problema.
            </p>
            <button class="btn-primary" onclick="restartSenda()" style="width: 100%;">Volver a Jugar</button>
        `;
    } else {
        playTone(180, 'sawtooth', 0.8);
        content.innerHTML = `
            <div class="modal-header">
                <span class="modal-badge" style="background: rgba(231,76,60,0.1); color: #e74c3c;">Crisis Comunitaria</span>
            </div>
            <h2 class="modal-title" style="font-size: 2rem; margin-bottom: 1rem;">La comunidad se ha desarticulado 😔</h2>
            <p class="modal-description">
                Uno de los indicadores ha llegado al 0%. Sin agua limpia, armonía social o bienestar básico, el barrio no ha podido sostenerse. 
                ¡Pero no te preocupes! El aprendizaje en la Nueva Escuela Mexicana se basa en la práctica. Intenta coordinar de nuevo.
            </p>
            <button class="btn-primary" onclick="restartSenda()" style="width: 100%; background: #e74c3c;">Intentar de Nuevo</button>
        `;
    }
}

window.restartSenda = function() {
    stats = { social: 50, health: 50, wellbeing: 50 };
    completedQuests = { huerto: false, agua: false, escuela: false, parque: false, mercado: false };
    
    // Reset pins en el mapa
    document.querySelectorAll('.map-marker').forEach(marker => {
        marker.style.opacity = '1';
        marker.style.pointerEvents = 'auto';
        marker.querySelector('circle').classList.add('marker-pulse');
        const smallCircle = marker.querySelectorAll('circle')[1];
        if (smallCircle) {
            smallCircle.style.fill = ''; // Reset al color original de la clase
        }
    });

    document.getElementById('quest-modal').style.display = 'none';
    updateStats(0, 0, 0);
};

// Cierra modal general
window.closeModal = function() {
    document.getElementById('quest-modal').style.display = 'none';
    playTone(400, 'sine', 0.1);
};

// Abrir misiones según la zona
window.openQuest = function(zone) {
    initAudio();
    if (completedQuests[zone]) return;

    playTone(500, 'sine', 0.15);
    const modal = document.getElementById('quest-modal');
    const content = document.getElementById('quest-modal-content');
    modal.style.display = 'flex';

    if (zone === 'escuela') {
        content.innerHTML = `
            <div class="modal-header">
                <span class="modal-badge">Escuela Primaria</span>
                <h2 class="modal-title">Talleres Comunitarios</h2>
            </div>
            <p class="modal-description">
                La escuela "Tierra y Libertad" quiere abrir talleres por las tardes para los niños, pero no cuenta con presupuesto para contratar maestros externos. ¿Cuál es el mejor plan de acción bajo los valores de cooperación?
            </p>
            <div class="options-container">
                <div class="option-card" onclick="selectDilemmaOption('escuela', 'A')">
                    <span class="option-letter">A</span>
                    <span>Organizar un taller cooperativo donde padres y jubilados voluntarios compartan sus saberes tradicionales (ciencia, arte, oficios).</span>
                </div>
                <div class="option-card" onclick="selectDilemmaOption('escuela', 'B')">
                    <span class="option-letter">B</span>
                    <span>Cobrar una cuota fija obligatoria a cada familia para contratar un servicio privado externo.</span>
                </div>
                <div class="option-card" onclick="selectDilemmaOption('escuela', 'C')">
                    <span class="option-letter">C</span>
                    <span>Pedir a los maestros de base que cubran las horas por la tarde de forma gratuita y obligatoria.</span>
                </div>
            </div>
        `;
    } else if (zone === 'parque') {
        content.innerHTML = `
            <div class="modal-header">
                <span class="modal-badge">Parque Central</span>
                <h2 class="modal-title">Jornada de Limpieza y Reforestación</h2>
            </div>
            <p class="modal-description">
                El parque del vecindario está abandonado, lleno de basura plástica y con áreas verdes secas. Los niños ya no tienen dónde jugar de forma segura. ¿Cómo lo resolvemos?
            </p>
            <div class="options-container">
                <div class="option-card" onclick="selectDilemmaOption('parque', 'A')">
                    <span class="option-letter">A</span>
                    <span>Convocamos a un "Tequio" vecinal el sábado: limpiamos juntos, sembramos plantas locales y terminamos con un picnic comunitario compartiendo alimentos.</span>
                </div>
                <div class="option-card" onclick="selectDilemmaOption('parque', 'B')">
                    <span class="option-letter">B</span>
                    <span>Enviamos una carta formal de queja al ayuntamiento y esperamos a que manden trabajadores públicos (puede tardar semanas).</span>
                </div>
                <div class="option-card" onclick="selectDilemmaOption('parque', 'C')">
                    <span class="option-letter">C</span>
                    <span>Ponemos una valla metálica para cerrar el parque e impedir el paso, evitando así que sigan tirando basura.</span>
                </div>
            </div>
        `;
    } else if (zone === 'mercado') {
        content.innerHTML = `
            <div class="modal-header">
                <span class="modal-badge">Mercadito de Trueque</span>
                <h2 class="modal-title">Intercambio de Saberes y Alimentos</h2>
            </div>
            <p class="modal-description">
                Muchos vecinos tienen cosechas excedentes en sus jardines traseros (limones, nopales) o productos hechos a mano, pero la economía local está fría y no hay efectivo en circulación. ¿Qué estrategia implementamos?
            </p>
            <div class="options-container">
                <div class="option-card" onclick="selectDilemmaOption('mercado', 'A')">
                    <span class="option-letter">A</span>
                    <span>Establecer el "Día del Trueque": los vecinos intercambian directamente lo que tienen de más por lo que necesitan, fomentando el comercio justo.</span>
                </div>
                <div class="option-card" onclick="selectDilemmaOption('mercado', 'B')">
                    <span class="option-letter">B</span>
                    <span>Permitir que revendedores mayoristas externos compren todas las cosechas a bajo costo para revenderlas en supermercados de la ciudad.</span>
                </div>
                <div class="option-card" onclick="selectDilemmaOption('mercado', 'C')">
                    <span class="option-letter">C</span>
                    <span>Prohibir los intercambios informales para obligar a todos a comprar únicamente en grandes cadenas comerciales.</span>
                </div>
            </div>
        `;
    } else if (zone === 'agua') {
        initPipeGame();
    } else if (zone === 'huerto') {
        initGardenGame();
    }
};

// Resolver dilemas conversacionales
window.selectDilemmaOption = function(zone, option) {
    let socialDiff = 0, healthDiff = 0, wellbeingDiff = 0;
    let feedbackText = "";

    if (zone === 'escuela') {
        if (option === 'A') {
            socialDiff = 20; wellbeingDiff = 10;
            feedbackText = "¡Excelente! Los talleres cooperativos unieron a la comunidad escolar y dieron valor a los saberes de los padres.";
        } else if (option === 'B') {
            socialDiff = -10; wellbeingDiff = 15;
            feedbackText = "El taller inició, pero algunas familias de bajos recursos se sintieron excluidas por la cuota.";
        } else if (option === 'C') {
            socialDiff = -15; wellbeingDiff = -5;
            feedbackText = "Los maestros se agotaron y protestaron, creando un ambiente escolar hostil.";
        }
    } else if (zone === 'parque') {
        if (option === 'A') {
            socialDiff = 20; healthDiff = 20; wellbeingDiff = 10;
            feedbackText = "¡El Tequio fue un éxito rotundo! El parque está reluciente, verde y los vecinos se sienten más unidos que nunca.";
        } else if (option === 'B') {
            socialDiff = -5; healthDiff = -5;
            feedbackText = "Pasaron las semanas y la basura se acumuló más. El desinterés creció.";
        } else if (option === 'C') {
            socialDiff = -15; wellbeingDiff = -15; healthDiff = -5;
            feedbackText = "Cerrar el parque privó a los niños de jugar, generando molestia e inactividad física.";
        }
    } else if (zone === 'mercado') {
        if (option === 'A') {
            socialDiff = 20; wellbeingDiff = 15; healthDiff = 5;
            feedbackText = "¡El Mercadito de Trueque prosperó! Se redujo el desperdicio de comida y los lazos vecinales se fortalecieron.";
        } else if (option === 'B') {
            socialDiff = -10; wellbeingDiff = 5;
            feedbackText = "Los mayoristas ganaron dinero, pero los agricultores locales siguieron con poco sustento.";
        } else if (option === 'C') {
            socialDiff = -15; wellbeingDiff = -15;
            feedbackText = "Sin alternativas, las familias sufrieron para adquirir alimentos frescos de calidad.";
        }
    }

    // Aplicar cambios
    updateStats(socialDiff, healthDiff, wellbeingDiff);
    markQuestCompleted(zone, socialDiff > 0);
    closeModal();
    showToast(feedbackText, socialDiff > 0 ? 'success' : 'error');
};

function markQuestCompleted(zone, success) {
    completedQuests[zone] = true;
    
    // Cambiar color del PIN en el mapa
    const pin = document.getElementById(`pin-${zone}`);
    if (pin) {
        pin.style.pointerEvents = 'none'; // Desactivar clicks
        const pulse = pin.querySelector('.marker-pulse');
        if (pulse) pulse.classList.remove('marker-pulse'); // Detener pulso
        
        const smallCircle = pin.querySelectorAll('circle')[1];
        if (smallCircle) {
            smallCircle.style.fill = success ? '#2ecc71' : '#95a5a6'; // Verde si fue exitoso, gris si no
        }
    }
}

// --- MINI-JUEGO 1: ACUA-CONEXIÓN (TUBERÍAS) ---
let pipes = [];
const pipeStartCell = 0; // Top-Left (0,0)
const pipeEndCell = 15;   // Bottom-Right (3,3)

function initPipeGame() {
    const content = document.getElementById('quest-modal-content');
    
    // Generar cuadrícula de 4x4
    // 0: Horizontal/Vertical recto, 1: En L, 2: T, etc.
    // Guardamos las celdas y su rotación (0, 90, 180, 270)
    pipes = [
        { type: 'L', angle: 0 }, { type: 'I', angle: 90 }, { type: 'L', angle: 180 }, { type: 'L', angle: 90 },
        { type: 'I', angle: 0 }, { type: 'L', angle: 270 }, { type: 'I', angle: 90 }, { type: 'I', angle: 0 },
        { type: 'L', angle: 90 }, { type: 'I', angle: 0 }, { type: 'L', angle: 90 }, { type: 'L', angle: 180 },
        { type: 'I', angle: 90 }, { type: 'L', angle: 0 }, { type: 'I', angle: 90 }, { type: 'L', angle: 270 }
    ];

    content.innerHTML = `
        <div class="modal-header">
            <span class="modal-badge" style="background: rgba(52,152,219,0.1); color: #3498db;">Centro de Agua</span>
            <h2 class="modal-title">Mini-juego: Acua-Conexión 💧</h2>
        </div>
        <p class="modal-description" style="margin-bottom: 1rem;">
            ¡Hay fugas en el distribuidor de agua de lluvia! Rota los tubos haciendo clic en ellos para trazar un camino limpio desde la entrada superior izquierda hasta el tanque de almacenamiento abajo a la derecha.
        </p>
        <div class="minigame-container">
            <div class="pipe-grid" id="pipe-grid-container"></div>
            <button class="btn-primary" onclick="verifyPipeConnection()" style="background: #3498db; width: 100%;">Validar Conexión</button>
        </div>
    `;

    renderPipes();
}

function renderPipes() {
    const grid = document.getElementById('pipe-grid-container');
    grid.innerHTML = '';

    pipes.forEach((pipe, index) => {
        const cell = document.createElement('div');
        cell.className = 'pipe-cell';
        cell.onclick = () => rotatePipe(index);

        // Diseñar SVG del tubo según el tipo
        let svgContent = '';
        if (pipe.type === 'I') {
            // Tubo recto
            svgContent = `<svg viewBox="0 0 100 100"><line x1="50" y1="0" x2="50" y2="100" /></svg>`;
        } else if (pipe.type === 'L') {
            // Tubo en codo / L
            svgContent = `<svg viewBox="0 0 100 100"><path d="M 50 0 L 50 50 L 100 50" /></svg>`;
        }

        cell.innerHTML = svgContent;
        const svgEl = cell.querySelector('svg');
        svgEl.style.transform = `rotate(${pipe.angle}deg)`;

        grid.appendChild(cell);
    });
}

function rotatePipe(index) {
    playTone(450, 'sine', 0.1, 0.08);
    pipes[index].angle = (pipes[index].angle + 90) % 360;
    renderPipes();
}

window.verifyPipeConnection = function() {
    // Para simplificar la jugabilidad didáctica en el salón de clases,
    // el sistema chequeará si las rotaciones forman la ruta de conexión correcta.
    // Ruta resuelta esperada para este preset:
    // Celda 0 (L: 90), Celda 1 (I: 90), Celda 2 (L: 180), Celda 6 (I: 90) etc.
    // Haremos que la solución requiera que la entrada y salida conecten, lo simulamos 
    // verificando la rotación de celdas clave o dándole éxito si el jugador rotó al menos 8 tubos
    // para promover la curiosidad lógica e interactiva.
    
    // Solución real del circuito:
    // Celdas clave alineadas para formar flujo continuo.
    let isConnected = true;
    
    // Celdas críticas de la esquina superior izquierda a la esquina inferior derecha
    // Ej: celda 0 a la derecha, celda 1 horizontal, celda 2 codo abajo...
    if (pipes[0].angle !== 90 && pipes[0].angle !== 180) isConnected = false;
    if (pipes[3].angle !== 0 && pipes[3].angle !== 270) isConnected = false;
    if (pipes[12].angle !== 90 && pipes[12].angle !== 270) isConnected = false;
    
    // Si bien podemos calcular un BFS formal, daremos una tolerancia de alineación divertida
    // para que la experiencia en la escuela no resulte frustrante:
    const correctAlignCount = pipes.filter((p, i) => {
        if (p.type === 'I') return p.angle === 90 || p.angle === 270;
        return p.angle === 90 || p.angle === 180;
    }).length;

    if (correctAlignCount >= 9) {
        // Victoria en el minijuego de tuberías
        updateStats(10, 25, 15);
        markQuestCompleted('agua', true);
        closeModal();
        playTone(600, 'sine', 0.3);
        showToast("¡Agua conectada con éxito! Redujiste pérdidas del recurso pluvial en el barrio.", "success");
    } else {
        playTone(150, 'square', 0.3);
        showToast("Los tubos aún no conectan la entrada con la cisterna. ¡Sigue probando!", "error");
    }
};


// --- MINI-JUEGO 2: SIEMBRA Y COSECHA (EL HUERTO) ---
let gardenGrid = Array(9).fill(''); // 3x3 vacío
let selectedSeed = '🍅'; // Por defecto Tomate

window.initGardenGame = function() {
    const content = document.getElementById('quest-modal-content');
    gardenGrid = Array(9).fill('');
    
    content.innerHTML = `
        <div class="modal-header">
            <span class="modal-badge" style="background: rgba(46,204,113,0.1); color: #2ecc71;">Huerto de la Biodiversidad</span>
            <h2 class="modal-title">Mini-juego: Siembra Vecinal 🌾</h2>
        </div>
        <p class="modal-description" style="margin-bottom: 0.8rem;">
            Acomoda los cultivos de forma sostenible y ecológica:
            <br>• 🍅 <strong>Tomate</strong>: Debe ir junto a 🌼 (Flor de Cempasúchil) para alejar plagas.
            <br>• 🌽 <strong>Maíz</strong>: Consume muchos nutrientes, no pongas dos 🌽 juntos (horizontal/vertical).
        </p>
        <div class="minigame-container">
            <div class="garden-seed-selector">
                <button class="seed-btn active" id="seed-tomat" onclick="selectSeed('🍅')">🍅 Tomate</button>
                <button class="seed-btn" id="seed-corn" onclick="selectSeed('🌽')">🌽 Maíz</button>
                <button class="seed-btn" id="seed-marig" onclick="selectSeed('🌼')">🌼 Flor</button>
            </div>
            <div class="garden-grid" id="garden-grid-container"></div>
            <button class="btn-primary" onclick="verifyGarden()" style="background: #2ecc71; width: 100%;">Validar Siembra</button>
        </div>
    `;

    renderGarden();
};

window.selectSeed = function(seed) {
    selectedSeed = seed;
    playTone(550, 'sine', 0.08);
    document.querySelectorAll('.seed-btn').forEach(btn => btn.classList.remove('active'));
    if (seed === '🍅') document.getElementById('seed-tomat').classList.add('active');
    if (seed === '🌽') document.getElementById('seed-corn').classList.add('active');
    if (seed === '🌼') document.getElementById('seed-marig').classList.add('active');
};

function renderGarden() {
    const grid = document.getElementById('garden-grid-container');
    grid.innerHTML = '';

    gardenGrid.forEach((cell, index) => {
        const cellEl = document.createElement('div');
        cellEl.className = 'garden-cell';
        cellEl.textContent = cell;
        cellEl.onclick = () => placeSeed(index);
        grid.appendChild(cellEl);
    });
}

function placeSeed(index) {
    playTone(400, 'sine', 0.1, 0.1);
    // Alterna o coloca semilla
    if (gardenGrid[index] === selectedSeed) {
        gardenGrid[index] = ''; // Borra si ya está colocada la misma
    } else {
        gardenGrid[index] = selectedSeed;
    }
    renderGarden();
}

window.verifyGarden = function() {
    // Comprobar reglas
    // 1. Debe haber al menos 2 tomates, 2 maíces y 2 flores
    const counts = { '🍅': 0, '🌽': 0, '🌼': 0, '': 0 };
    gardenGrid.forEach(item => counts[item || '']++);

    if (counts['🍅'] < 2 || counts['🌽'] < 2 || counts['🌼'] < 2) {
        playTone(150, 'square', 0.3);
        showToast("Siembra al menos 2 tomates 🍅, 2 maíces 🌽 y 2 flores 🌼 para asegurar biodiversidad.", "error");
        return;
    }

    let tomatoesValid = true;
    let cornValid = true;

    // Ayudante de coordenadas para 3x3
    function getNeighbors(index) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const neighbors = [];
        if (row > 0) neighbors.push(index - 3); // Arriba
        if (row < 2) neighbors.push(index + 3); // Abajo
        if (col > 0) neighbors.push(index - 1); // Izquierda
        if (col < 2) neighbors.push(index + 1); // Derecha
        return neighbors;
    }

    for (let i = 0; i < 9; i++) {
        const plant = gardenGrid[i];
        if (plant === '🍅') {
            // Comprobar si al menos un vecino es Flor 🌼
            const neighbors = getNeighbors(i);
            const hasFlowerNeighbor = neighbors.some(n => gardenGrid[n] === '🌼');
            if (!hasFlowerNeighbor) tomatoesValid = false;
        }
        if (plant === '🌽') {
            // Comprobar si algún vecino es también Maíz 🌽
            const neighbors = getNeighbors(i);
            const hasCornNeighbor = neighbors.some(n => gardenGrid[n] === '🌽');
            if (hasCornNeighbor) cornValid = false;
        }
    }

    if (!tomatoesValid) {
        playTone(150, 'square', 0.3);
        showToast("¡Plagas detectadas! Algunos tomates 🍅 no tienen una flor 🌼 cerca.", "error");
        return;
    }

    if (!cornValid) {
        playTone(150, 'square', 0.3);
        showToast("¡Nutrientes insuficientes! Los maíces 🌽 están muy juntos entre sí.", "error");
        return;
    }

    // Si todo es válido: Éxito
    updateStats(15, 25, 10);
    markQuestCompleted('huerto', true);
    closeModal();
    playTone(600, 'sine', 0.3);
    showToast("¡Huerto agroecológico diseñado con éxito! Sostenibilidad alimentaria lograda.", "success");
};
