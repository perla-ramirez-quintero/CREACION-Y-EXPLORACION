# PORTAFOLIO DE EVIDENCIAS DIGITALES: INNOVACIÓN Y DESARROLLO DE APLICACIONES INTERACTIVAS
**Licenciatura en Educación Preescolar** **Curso:** Tecnologías Digitales en la Práctica Educativa  
**Alumna (Docente en Formación):** Perla Ramírez Quintero  

---

## 1. Datos de Identificación y Acceso al Proyecto

* **Nombre de la Autora:** Perla Ramírez Quintero
* **Perfil de GitHub Central:** [https://github.com/perla-ramirez-quintero](https://github.com/perla-ramirez-quintero)
* **Marco Curricular de Referencia:** Nueva Escuela Mexicana (NEM), Fase 2 (Educación Preescolar, aula multigrado 3-5 años).

---

## 2. Directorio Técnico de los Recursos Didácticos (El Abecedario Mágico)

* **Portal de Acceso General:** `index.html` (respaldado por la hoja de estilos unificada `style.css`)
* **Módulo de Exploración ("El Bosque de las Letras"):** `bosque_letras.html`
* **Módulo de Identificación y Seriación ("El Tren de los Sonidos"):** `tren_sonidos.html` y `tren_sonidos.js`

---

## 3. Bitácora de Desarrollo, Ajustes Técnicos e Iteración de Interfaz

El proceso de construcción, depuración y refinamiento de las aplicaciones web para el reconocimiento del abecedario contempló las siguientes fases de desarrollo:

1. **Definición de Proyectos Multimodales:**
   * Se plantearon tres enfoques gamificados bajo los PDA de la Fase 2 (Lenguajes), seleccionando de manera conjunta la integración del Bosque de Letras y el Tren de los Nombres.
2. **Depuración de Ambientes Gráficos y Enlaces (CSS / HTML):**
   * *Incidencia:* Los elementos decorativos y de fondo (árboles, colinas, cielo) del Bosque de las Letras no se renderizaban correctamente. Asimismo, existía un fallo de ruteo debido a la duplicación y aislamiento de la hoja de estilos (`style.css`) en subcarpetas.
   * *Solución:* Se reubicó `style.css` en el directorio raíz unificando la interfaz, y se estructuró el entorno visual del bosque con un cielo degradado, colinas, sol animado y pinos/árboles de fondo en CSS, permitiendo que las letras floten en primer plano.
3. **Optimización del Módulo "El Tren de los Sonidos":**
   * *Estímulos Sonoros (Web Audio API):* Síntesis programática de silbatos a vapor ("Choo Choo"), ruido secuencial de avance ("Chug-Chug"), zumbidos de error y fanfarrias de arpegio, sin necesidad de dependencias externas.
   * *Locomotora y Vagones Interactivos:* Vagones con cambio de color pastel dinámico al acertar, acompañados de animación de caída y rebote de los objetos. Locomotora con cabina rosa, maquinista (osito 🐻) y animación de humo en CSS.
   * *Adaptación Semántica de Vocabulario Infantil:*
     * *Incidencia:* El uso del fonema/grafema "Ñ" asociado a la palabra "Ñandú" generaba desconcierto pedagógico, al ser un animal ajeno al contexto sociocultural inmediato de los niños de preescolar.
     * *Solución:* Se ajustó el catálogo de referencias semánticas del juego para emplear vocablos de amplio reconocimiento y cotidianidad en la primera infancia (ej. *Piñata, Nieve, Niño*), garantizando un aprendizaje verdaderamente significativo y situado bajo los principios de la Nueva Escuela Mexicana.

---

## 4. Sustento Pedagógico (Alineación NEM - Fase 2)

* **Campo Formativo:** Lenguajes.
* **Procesos de Desarrollo de Aprendizaje (PDA):** Identificación de su nombre propio y otras palabras cotidianas, asociando grafías con sus respectivos sonidos (fonemas). Reconocimiento paulatino del abecedario.
* **Ejes Articuladores:**
  * *Apropiación de las culturas a través de la lectura y la escritura:* Al vincular directamente la letra inicial con objetos familiares y el nombre del propio estudiante.
  * *Inclusión:* Interfaz basada en estímulos multisensoriales (auditivos, visuales, motricidad tolerante) que apoya a los menores en sus diferentes ritmos de maduración.
* **Metodología:** Aprendizaje Situado y Gamificación. Las herramientas se concibieron para operar de manera independiente, maximizando la autonomía y el sentido de logro en el aula multigrado.

---

## 5. Anexo Técnico: Transcripción Íntegra de la Conversación (Raw Logs)

**11:09, 19/6/2026 - Usuario (Docente en Formación):**
> el dia de hoy quiero diseñar un proyecto que favorezca el reconocimiento de letras del abecedario en niños de 3-5 años, ya sabes que debes usar el programa sintetico fase 2. 
> Qué me sugieres crear? 

**11:09, 19/6/2026 - IA (Asistente Técnico):**
> Para favorecer el reconocimiento de letras del abecedario en niños de 3 a 5 años (que corresponde a la Fase 2 de Educación Preescolar en el Plan de Estudios de la Nueva Escuela Mexicana - NEM), el diseño debe basarse en el aprendizaje lúdico, multisensorial (colores vibrantes, sonidos claros, retroalimentación positiva) y significativo, relacionándolo con su entorno y su propia identidad (como su nombre).
> Bajo el Campo Formativo de Lenguajes y los Procesos de Desarrollo de Aprendizaje (PDA) de Fase 2 (relacionados con la Representación gráfica de ideas y descubrimientos al explorar textos y el Reconocimiento de letras y el nombre propio), te sugiero tres opciones de proyectos de gamificación web con alto impacto visual y auditivo:
> Opción 1: 🌳 "El Bosque Mágico de las Letras" (Exploración y Asociación)
> Un juego de exploración y búsqueda donde el niño explora un escenario interactivo en busca de letras escondidas.
> ¿Cómo funciona?
> Se presenta un escenario ilustrado en pantalla (un bosque, un jardín o un aula escolar).
> El niño debe buscar y dar clic/toque a las letras ocultas de manera interactiva.
> Al tocar una letra (por ejemplo, la A), esta se agranda, realiza una animación divertida y se reproduce un audio claro con su sonido y una asociación de su entorno: "¡Es la A! ¡A de Abeja!" acompañado de la aparición de una abejita animada.
> Enfoque Pedagógico (NEM - Fase 2):
> PDA (3 y 4 años): Fomenta la curiosidad, exploración visual, discriminación de formas gráficas frente a otros dibujos y la asociación fonema-grafema básica (sonido-letra).
> Diseño Web: Ilustraciones en SVG limpio, sonidos sintetizados con la Web Audio API (para evitar cargas pesadas) y animaciones fluidas al pasar el cursor o hacer clic.
> Opción 2: 🚂 "El Tren de los Nombres y los Sonidos" (Identificación del Nombre Propio)
> Un juego interactivo centrado en la letra inicial y el nombre propio del alumno, uno de los aprendizajes clave más significativos en preescolar.
> ¿Cómo funciona?
> Paso 1: Con un teclado visual interactivo de letras muy grandes, el niño (o el docente/ padre) escribe el nombre del niño (ej. "SOFÍA").
> Paso 2: El juego genera un tren personalizado. El vagón principal muestra la letra inicial (la S).
> Paso 3 (Minijuego): El tren necesita "combustible". El niño debe arrastrar hacia el vagón los objetos o animales que comiencen con la misma letra (ej. un Sol, un Sapo) de entre varias opciones.
> Al completar el tren, este avanza haciendo un sonido divertido y deletreando el nombre con sonidos alegres.
> Enfoque Pedagógico (NEM - Fase 2):
> PDA (5 años): "Reconoce su nombre escrito y otras palabras cotidianas, e identifica similitudes asociadas a los sonidos y grafías."
> Diseño Web: Uso de mecánicas de arrastrar y soltar (drag-and-drop) adaptadas a motricidad preescolar (zonas de soltado grandes y tolerantes), con colores muy llamativos y sonidos de tren.
> Opción 3: 🧁 "La Pastelería de las Letras" (Trazado y Motricidad Fina)
> Un espacio de juego creativo y sensorial donde los niños "hornean" y decoran letras mientras escuchan su pronunciación.
> ¿Cómo funciona?
> El niño elige una letra molde de una bandeja.
> Trazado guiado interactivo: Con el dedo o el mouse, el niño debe seguir un camino de chispas de chocolate o fresas para rellenar la letra (fomentando el sentido del trazo de arriba a abajo / izquierda a derecha).
> Una vez rellena, la letra se "hornea" y cobra vida: baila en la pantalla y se pronuncia su sonido fonético de forma clara.
> El niño puede guardarla en su "vitrina de galletas-letras" acumulando todo el abecedario.
> Enfoque Pedagógico (NEM - Fase 2):
> PDA (4 y 5 años): Desarrollo de la motricidad fina, control del trazo y uso de marcas gráficas convencionales para representar letras mediante el juego y la expresión artística.
> Diseño Web: Efectos visuales de partículas (chispas, dulces) que siguen el cursor, físicas de pintura/relleno en un lienzo HTML5 Canvas, y sonidos gratificantes.
> ❓ ¿Cuál te gustaría desarrollar?
> Podemos adaptar cualquiera de estas opciones o hacer una combinación. Una vez que selecciones la que más te guste, diseñaré la Planeación Didáctica oficial alineada a la NEM y el Plan de Implementación técnico para construir el juego interactivo.
> ¿Cuál de las tres opciones te llama más la atención para empezar?

**11:13, 19/6/2026 - Usuario (Docente en Formación):**
> me llaman demasiado la atencion las dos primeras

**11:13, 19/6/2026 - IA (Asistente Técnico):**
> He creado el plan de implementación detallado para el proyecto "Aventura del Alfabeto", el cual combina los dos modos de juego que elegiste y se integra con el portal que ya tienes.
> Puedes revisar los detalles del diseño, los archivos a modificar y el plan de verificación en el documento adjunto: PLANEACION_ALFABETO / implementation_plan.md.
> Por favor, revisa el plan y presiona el botón Proceed (o indícame si deseas realizar algún ajuste) para que pueda comenzar con el desarrollo del juego, su planeación didáctica y su manual de instrucciones.
> Implementation Plan

**11:15, 19/6/2026 - Usuario (Docente en Formación):**
> me gustaria que diseñes cada juego por separado, si haras eso?

**11:15, 19/6/2026 - IA (Asistente Técnico):**
> ¡Entendido! He modificado el plan de implementación para que cada uno de los juegos sea completamente independiente, con sus propios archivos HTML, JS, planeaciones didácticas y manuales de instrucciones independientes.
> Puedes revisar los detalles actualizados del diseño modular en el documento de planificación: PLANEACION_ALFABETO / implementation_plan.md.
> Por favor, presiona el botón Proceed para comenzar a programar ambos juegos por separado.
> Implementation Plan

**11:16, 19/6/2026 - Usuario (Docente en Formación):**
> proceed

**11:16, 19/6/2026 - IA (Asistente Técnico):**
> ¡Todo listo! He diseñado e implementado ambos juegos por separado tal como lo pediste. Ahora tu portal cuenta con dos nuevas tarjetas de colores vibrantes y divertidas, listas para los más pequeños.
> Aquí tienes el resumen completo de todos los archivos creados, incluyendo las planeaciones didácticas individuales alineadas a la Nueva Escuela Mexicana: walkthrough.md
> Para probar los juegos en acción, simplemente abre el archivo index.html en tu navegador web. ¡Asegúrate de encender el audio de tu computadora para que puedas escuchar a los personajes hablando y pronunciando los nombres y las letras!
> ¿Te gustaría agregar algún detalle extra o ajustar algo en particular de los juegos?
> TaskWalkthrough

**11:37, 19/6/2026 - Usuario (Docente en Formación):**
> en la actividad del bosque, no le veo sentido que menciones un bosque si no hay ni un arbol, puedes mejorar ese diseño?

**11:37, 19/6/2026 - IA (Asistente Técnico):**
> ¡Tienes toda la razón! Un bosque sin árboles no es un bosque.
> Acabo de actualizar el diseño. He añadido un hermoso fondo a bosque_letras.html y a style.css que ahora incluye:
> Un cielo degradado con nubes animadas flotando lentamente.
> Una colina de pasto verde en la base (forest-ground).
> Varios pinos y árboles (🌲 y 🌳) ubicados estratégicamente al fondo como decoración para darle la verdadera ambientación de un bosque, mientras las letras flotan libremente por delante de ellos.
> Puedes abrir bosque_letras.html nuevamente o actualizar tu navegador para ver los cambios.
> ¡Espero que ahora el diseño sea mucho más mágico e inmersivo para los niños! ¿Te parece bien esta ambientación?

**11:42, 19/6/2026 - Usuario (Docente en Formación):**
> no se refleja el diseño en el html, estas seguro que loo hiciste?

**11:42, 19/6/2026 - IA (Asistente Técnico):**
> *(Transmisión en blanco / Espera de depuración técnica)*

**11:43, 19/6/2026 - Usuario (Docente en Formación):**
> no se refleja el diseño en el html, estas seguro que loo hiciste?

**11:43, 19/6/2026 - IA (Asistente Técnico):**
> *(Transmisión en blanco / Espera de depuración técnica)*

**11:34, 23/6/2026 - IA (Asistente Técnico):**
> Remove duplicate style.css finished
> ¡Hola! He solucionado el problema del diseño y he añadido todas las mejoras que pediste para la actividad del tren.
> 🔍 ¿Por qué no se reflejaba el diseño?
> El archivo de estilos style.css (que contenía todo el diseño, colores y tipografía del portal y de los juegos) estaba ubicado dentro de la subcarpeta APRENDIENDO LETRAS, por lo que las páginas del directorio raíz (index.html, nebula_forge.html y senda_comunitaria.html) no podían cargarlo y se veían en texto plano sin estilos.
> ¿Cómo lo solucioné?
> Moví la hoja de estilos global a la carpeta raíz: style.css.
> Corregí los enlaces en index.html para que llamen correctamente a los juegos dentro de la subcarpeta.
> Actualicé los archivos bosque_letras.html y tren_sonidos.html para que apunten al archivo de estilos raíz (../style.css) y sus botones de regresar funcionen de forma impecable (../index.html).
> 🚂 Nuevas Mejoras para "El Tren de los Sonidos"
> He enriquecido por completo la experiencia del tren en tren_sonidos.js y tren_sonidos.html con los siguientes detalles visuales y sonoros:
> Efectos de Sonido Reales (Web Audio API):
> Silbato a vapor ("¡Choo Choo!"): Un pitido armónico de tren real que suena al presionar "¡Subir al tren!", al acertar una opción y al completar el nombre.
> Avance rítmico ("Chug-Chug"): Un sonido de motor a vapor que suena de fondo en secuencia cuando el tren avanza.
> Buzzer amistoso: Un suave sonido descendente para cuando el niño comete un error.
> Fanfarria de victoria: Una melodía de arpegio alegre cuando se completa el tren entero. (Nota: Al ser sintetizados directamente por código, no requieren archivos de audio externos y funcionan al 100% sin internet).
> La Vía del Tren (Vías):
> Se diseñó una vía continua de ferrocarril con rieles metálicos y durmientes de madera en la parte inferior del contenedor.
> Soporta nombres largos de forma interactiva (se desplaza horizontalmente con un scrollbar personalizado y suave).
> Locomotora y Vagones Premium:
> Locomotora: Añadimos una cabina rosa con un maquinista osito (🐻), una chimenea que expulsa vapor de forma animada (emojis de humo 💨 que flotan hacia arriba), un faro brillante con luz y ruedas que giran físicamente cuando el tren avanza.
> Vagones de colores pasteles: Los vagones inician bloqueados (color gris con un signo ❓). Cuando el niño acierta la opción correcta, el vagón se tiñe de un color pastel vibrante diferente (rojo, menta, amarillo, lila, rosa, etc.), se le dibuja su respectiva letra y el emoji del objeto cae dentro del vagón con una animación de rebote interactiva.
> Tarjetas de Opción más atractivas:
> Las opciones ahora son tarjetas en 3D con un borde brillante que reaccionan al pasar el mouse (efecto hover). Si el niño se equivocan, la tarjeta vibra, se atenúa en color rojo (.incorrect) y se desactiva temporariamente para motivarlo a intentar de nuevo.
> Paisaje de Fondo:
> Agregamos un hermoso cielo en degradé celeste con un sol animado que flota y nubes decorativas que se mueven sobre colinas verdes suaves para darle el ambiente de un viaje campestre.
> 📂 Archivos modificados y listos:
> Estilos unificados: style.css (eliminamos el duplicado anterior para mayor limpieza).
> Portal Principal: index.html.
> Tren de los Sonidos: tren_sonidos.html y tren_sonidos.js.
> Bosque de las Letras: bosque_letras.html.
> Puedes abrir el archivo index.html directamente en tu navegador y verás los fabulosos cambios. ¡Espero que a tus alumnos les encante!
> Walkthrough

**11:39, 23/6/2026 - Usuario (Docente en Formación):**
> me gusta, gracias

**11:39, 23/6/2026 - IA (Asistente Técnico):**
> ¡Me alegra muchísimo que te haya gustado! Fue un verdadero placer ayudarte a diseñar y refinar estas actividades educativas para tus alumnos.
> Ahora tienes un portal completamente funcional, interactivo, colorido y con sonidos que harán el aprendizaje de las letras una aventura mágica para los niños de preescolar.
> Si en el futuro necesitas ajustar algún detalle, crear una nueva actividad, o expandir los juegos existentes, recuerda que aquí estaré listo para ayudarte. ¡Mucho éxito en tus clases y que los niños se divertan un montón! 🚂🌲✨

**Actual, 29/6/2026 - Usuario (Docente en Formación):**
> En el juego del tren, me encanta visualmente pero me gustaria que al final lea el nombre y use palabras que los niños SI CONOZCAN porque en la Ñ esos seguramente ellos no conocen un ñandu

**Actual, 29/6/2026 - IA (Asistente Técnico):**
> Valida la pertinencia sociocultural del vocabulario en la primera infancia. Actualiza las referencias y base de datos del sistema para sustituir conceptos complejos o alejados del contexto de los niños (como el ñandú en la letra Ñ) por elementos sumamente cotidianos y familiares (como Piñata, Nieve, etc.), garantizando un aprendizaje plenamente significativo en el aula multigrado.
