# Plan de Implementación y Justificación Técnica

Este documento presenta la propuesta técnica e innovadora detrás del desarrollo de **Aventura NEM: El Domo del Aprendizaje Mágico** para el jurado de la evaluación del curso.

## 🎯 Objetivo del Proyecto
Crear una herramienta didáctica e interactiva autónoma (Single Page Application) que sirva como apoyo docente en el aula de preescolar multigrado (de 3 a 5 años). El juego está alineado a la Nueva Escuela Mexicana (NEM) e incorpora accesibilidad auditiva nativa.

---

## 🌟 Justificación del Factor Innovador ("Wow Factor")

### 1. Interfaz de Voz Activa con Loti el Ajolote
*   **Problema:** Los niños de preescolar (3 a 5 años) se encuentran en etapa prelectora. Los juegos educativos tradicionales basados en texto requieren la constante intervención del docente o tutor.
*   **Solución Wow:** Implementación del narrador interactivo mediante la API `SpeechSynthesis` de JavaScript. La mascota interactiva "Loti" (el Ajolote mexicano) lee las instrucciones en español con una velocidad modulada del 90% para mejor retención auditiva infantil.

### 2. Sintetizador de Audio por Código
*   **Problema:** Los archivos de sonido externos (.mp3 o .wav) hacen lento el tiempo de carga del juego, pueden fallar si hay baja conexión a internet y requieren gestión de archivos externos.
*   **Solución Wow:** Uso de `AudioContext` de la **Web Audio API** para sintetizar dinámicamente efectos de sonido (ondas senoidales, triangulares y de diente de sierra) en tiempo real para sonidos de click, aciertos, fallos y burbujas.

### 3. Física de Celebración en Canvas
*   **Problema:** Las retroalimentaciones aburridas disminuyen el interés del alumno.
*   **Solución Wow:** Renderizado de una simulación de confeti mediante la ecuación de movimiento ondulatorio en un elemento HTML5 Canvas, brindando estímulos visuales sumamente gratificantes ante los aciertos.

### 4. Arquitectura Multigrado
*   **Problema:** Un aula multigrado atiende diferentes niveles cognitivos simultáneamente.
*   **Solución Wow:** Adaptación instantánea de dificultad en la misma interfaz de juego:
    *   **Nivel 3 Años (Preescolar 1):** Actividades de emparejamiento directo, rangos de conteo cortos (1 al 3), interfaz ultra-simplificada.
    *   **Nivel 4 Años (Preescolar 2):** Conteo intermedio (1 al 6), 3 categorías de reciclaje y emociones básicas.
    *   **Nivel 5 Años (Preescolar 3):** Conteo extendido (1 al 10), correspondencia de vocabulario y clasificación ecológica detallada en 3 contenedores.
