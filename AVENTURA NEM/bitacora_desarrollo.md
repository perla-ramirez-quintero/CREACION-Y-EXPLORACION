# Bitácora de Desarrollo: Aventura NEM - El Domo del Aprendizaje Mágico 📝

Este documento registra el proceso de co-creación y pair programming realizado para el desarrollo de la propuesta educativa del cierre de evaluación del curso.

---

## 👥 Datos Generales
*   **Diseño Pedagógico / Solicitante:** Perla (Docente de Educación Preescolar)
*   **Desarrollo Tecnológico:** Antigravity (Asistente de Programación de Google DeepMind)
*   **Fecha de Finalización:** 30 de junio de 2026
*   **Enfoque de Entrega:** Nueva Escuela Mexicana (NEM) - Preescolar Multigrado (3 a 5 años)

---

## 🛠️ Evolución del Proyecto y Conversación

### 1. Requerimiento Inicial
Se solicitó una propuesta de evaluación altamente innovadora, de gran impacto visual ("Factor WOW") dirigida a niños de preescolar multigrado (de 3 a 5 años) alineada a los lineamientos curriculares vigentes de la Nueva Escuela Mexicana (NEM).

### 2. Propuesta y Aprobación
Se propuso un portal de minijuegos unificados en una sola aplicación interactiva sin requerimientos de red o instalaciones complejas.
*   **Decisión Técnica Clave (Factor WOW):** Implementar síntesis de voz nativa del dispositivo (`SpeechSynthesis`) para guiar a los niños prelectores de manera autónoma, y audio sintetizado en tiempo real (`Web Audio API`) para los sonidos.
*   **Domo del Aprendizaje:** Cuatro mundos basados en los cuatro campos formativos del plan de estudios preescolar.

### 3. Fase de Corrección e Iteración (Feedback del Usuario)

#### Ajuste 1: Interacción Táctil y Drag-and-Drop
*   *Observación:* Los elementos de arrastre no funcionaban correctamente en todos los navegadores y el sistema del aula podía bloquear la API de Drag-and-Drop.
*   *Corrección:* Se rediseñó la mecánica a **Tap-to-Place** (Tocar para seleccionar y tocar para colocar). El niño selecciona un objeto (el cual parpadea con brillo dorado) y toca su destino. Es más accesible y adaptado a la motricidad fina de 3-5 años.

#### Ajuste 2: Claridad Visual en las Expresiones de Emociones
*   *Observación:* Las caras construidas con emojis no eran claras ni diferenciables para los usuarios.
*   *Corrección:* Se reemplazaron los emojis de caritas por un **diseño en vectores SVG dinámicos**. Se implementaron gráficos vectoriales nítidos para ojos y bocas de felicidad, tristeza (con lágrimas en movimiento) y sorpresa.

#### Ajuste 3: Noción de Conteo (Relación Número-Cantidad)
*   *Observación:* Al depositar frutas en el frasco mágico, solo eran visibles 2 de ellas, lo cual afectaba la noción de correspondencia uno-a-uno cuando se solicitaban conteos mayores (ej. 6 u 8 frutas).
*   *Corrección:* Se implementó un contenedor dinámico (`flex-wrap: wrap-reverse`) para que las frutas se apilen una al lado de la otra y de abajo hacia arriba. Se redujo levemente el tamaño visual a `2rem` para garantizar que hasta 10 frutas sean simultáneamente visibles, logrando consistencia entre el conteo auditivo y la cantidad real.

#### Ajuste 4: Instrucción por Voz Dinámica
*   *Observación:* El asistente de voz decía instrucciones genéricas de color sin mencionar el número específico de frutas.
*   *Corrección:* Se programó al ajolote Loti para que lea en voz alta el número generado al inicio de cada partida (ej. *"Por favor coloca 5 frutas Rojas..."*).

---

## 📦 Entregables en esta Carpeta

*   **[Aventura_NEM_Preescolar.html](file:///c:/Users/perla/OneDrive/Escritorio/MIS%20JUEGOS/Aventura_NEM_Preescolar.html):** Código fuente de la app interactiva.
*   **[README.md](file:///c:/Users/perla/OneDrive/Escritorio/MIS%20JUEGOS/README.md):** Manual general de uso.
*   **[plan_de_implementacion.md](file:///c:/Users/perla/OneDrive/Escritorio/MIS%20JUEGOS/plan_de_implementacion.md):** Justificación y fundamentos de la innovación.
*   **[planeacion_didactica.md](file:///c:/Users/perla/OneDrive/Escritorio/MIS%20JUEGOS/planeacion_didactica.md):** Planificación oficial de clases basada en el programa de estudios de la NEM.
*   **[bitacora_desarrollo.md](file:///c:/Users/perla/OneDrive/Escritorio/MIS%20JUEGOS/bitacora_desarrollo.md):** Este registro del proceso de co-diseño.
