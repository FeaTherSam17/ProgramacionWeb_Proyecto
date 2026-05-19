INSERT INTO mensajes_contacto (nombre, correo, asunto, mensaje) VALUES
('Carlos Méndez', 'xinal46762@hacknapp.com', 'Frecuencia de contenido',
'¿Cada cuánto tiempo sueles subir nuevos videos o canciones?'),

('Diego Herrera', 'diego.herrera@email.com', 'Constancia de contenido',
'Hola, ¿tienes un calendario fijo para subir contenido?'),

('Andrés Ruiz', 'andres.ruiz@email.com', 'Publicación en plataformas',
'¿Publicas tus canciones en todas las plataformas al mismo tiempo o sigues alguna estrategia diferente?'),

('Laura Gómez', 'laura.gmz.music@gmail.com', 'Herramientas de producción',
'¿Qué software o herramientas utilizas para producir y editar tus canciones y videos?'),

('Belén Gil', 'belengil@gmail.com', 'Proceso creativo',
'Hola, me encanta tu música. ¿Cómo es tu proceso creativo al momento de componer nuevas canciones?');

INSERT INTO mensajes_contacto (nombre, correo, asunto, mensaje) VALUES
('Belén Gil', 'belengil@gmail.com', 'Proceso creativo',
'Hola,¿Qué herramientas usas para la edición?');




/*
========================================================
INSERTS: publicaciones_blog
Orden invertido:
- El título 4 será el primero
- El título 1 será el último
========================================================
*/

INSERT INTO publicaciones_blog
(
    titulo,
    slug,
    resumen,
    contenido,
    imagen_portada,
    estado,
    publicado_en
)
VALUES
(
    'Frecuencias : Lanzamiento y Diseño Sonoro',
    'frecuencias-lanzamiento-y-diseno-sonoro',
    'Un lanzamiento que explora capas de ruido, textura y silencio, enfocado en el desarrollo de atmósferas controladas y la profundidad sonora.',
$$
## El gesto inicial

Este lanzamiento nace como un **proceso conceptual**: un paso lento, profundo y deliberado.  
No hay prisa; hay textura, respiración y espacios que se abren en la mezcla.

### Lo que vas a encontrar
* **Capas de ruido orgánico:** Microtexturas y grabaciones ambientales procesadas.
* **Pads densos con respiración lenta:** Atmósferas sintéticas que evolucionan con calma.
* **Un pulso industrial:** Una base rítmica sutil que aparece y desaparece.

> No es un track convencional, es un umbral sonoro.

Si te atraen las frecuencias bajas, usa audífonos y deja que el paisaje sonoro te envuelva.

---

## El Setup del Espacio: Anatomía del flujo

Detrás de este sonido no hay una acumulación de máquinas, sino un diseño de ruteo específico. El carácter de este lanzamiento proviene de las **pequeñas decisiones** en la cadena de efectos y el tratamiento de la señal.

### 1. Las Fuentes (Sintetizadores y Textura)
El núcleo de este flujo de trabajo se divide en dos pilares:
* **Síntesis base:** Ondas puras y formas de onda simples filtradas para obtener un tono cálido y opaco.
* **Elementos analógicos:** Capturas de ruido de fondo, estática controlada y texturas ambientales que añaden realismo al entorno digital.

### 2. El Ruteo (Efectos y Procesamiento)
La señal se transforma a través de una cadena de bloques interactivos:
* **Reverbs en cadena:** El uso de reverberaciones largas para transformar sonidos cortos en atmósferas continuas.
* **Saturación sutil:** Procesamiento de cinta para enriquecer los armónicos sin perder la dinámica ni el control del pulso.

---

### Ficha rápida

* **BPM:** 85
* **Estado:** *En desarrollo*
* **Sensación:** Clásico / Profundo / Suspendido

---

### Notas de Bitácora
* **El tempo:** Ajustar el proyecto a 85 BPM permitió que los silencios y el espacio entre notas tuvieran el mismo peso que el ritmo.
* **Modulación:** Automatizar el comportamiento de los pads con osciladores de baja frecuencia (LFO) desincronizados para que el sonido evolucione de forma natural.
$$,
    'https://files.soniccdn.com/files/2026/02/19/FL%20Studio%2012.9%20macOS-860x483.png',
    'publicado',
    CURRENT_TIMESTAMP
),

(
    'Tutorial Breve: Crear un Dron Profundo en 5 Pasos',
    'tutorial-breve-crear-un-dron-profundo-en-5-pasos',
    'Un mini tutorial para construir un dron oscuro con capas, filtros y movimiento sutil que no pierde foco.',
$$
## 5 pasos para un dron profundo

Crear un dron con cuerpo y movimiento requiere estructurar capas que interactúen entre sí sin saturar el espectro. Este es el método que utilizo para construir una base sólida en el diseño sonoro:

1. **Fuente base:** Un oscilador con una onda senoidal pura en **C2** para establecer el fundamento de las frecuencias bajas.
2. **Capa textural:** Inserción de ruido blanco o rosa filtrado en *banda estrecha* para añadir textura y grano superficial.
3. **Movimiento:** Configuración de un **LFO muy lento** (aproximadamente a 0.08 Hz) direccionado al corte del filtro.
4. **Espacio:** Uso de un reverb largo con tiempo de decaimiento de **8 segundos** y un *mix* sutil al 20%.
5. **Control:** Aplicación de **compresión paralela** para añadir consistencia y mantener la presencia en la mezcla general.

#### Ajuste recomendado
> **Nota técnica:** Mantener la resonancia del filtro en niveles moderados. Esto evita acumulaciones no deseadas de frecuencias y silbidos molestos en los rangos medios-altos.

*Un dron no es estático; respira.* Si quieres que el sonido mantenga el interés a lo largo del tiempo, dibuja automatizaciones con cambios mínimos en la apertura del filtro cada 4 compases.

---

## Modulación Avanzada: El factor evolutivo

### 1. Desfase de Fase e Interacción
* **Osciladores sutiles:** Duplicar la fuente base y desintonizar el segundo oscilador apenas unos pocos *cents* genera un batido acústico natural.
* **Filtros en serie:** Colocar un segundo filtro moviéndose a un ritmo distinto complementa el diseño.

### 2. Saturación Armónica Controlada
* **Excitación de armónicos:** Añadir saturación de cinta antes del bloque espacial.
* **Control de rango:** Un ecualizador dinámico al final de la cadena controla los picos.

---

### Notas de Bitácora
* **El balance:** La relación entre la fuente limpia y la capa procesada define la claridad.
* **Resultado esperado:** Una base envolvente y estable para atmósferas profundas.
$$,
    'https://static.vecteezy.com/system/resources/previews/014/416/537/non_2x/sound-wave-icons-free-vector.jpg',
    'publicado',
    CURRENT_TIMESTAMP
),

(
    'Journal de Herramientas: Setup',
    'journal-de-herramientas-setup',
    'Un vistazo al flujo de trabajo: sintetizadores, efectos, ruteo y decisiones pequenas que definen el caracter del sonido.',
$$
## Herramientas que sostienen el pulso

Este diario no es una lista de equipo o gear; es una declaración de intención.

### Cadena base de procesamiento

1. **Sintetizador granular**
2. **Distorción suave**
3. **Reverb larga**
4. **Compresión lenta**

---

## Desarrollo del Flujo de Trabajo

### Detalles de la Mezcla y Automatización

* Saturación en el bus principal.
* Apertura progresiva del espectro.
* Limpieza de sub-graves.

> Menos es más, pero lo poco que se queda debe tener peso dentro de la mezcla.

#### Recomendación Práctica
Enfócate en la densidad de capas y el diseño de texturas antes de buscar volumen excesivo.

---

### Notas de Bitácora

* Mantener la cadena base fija ayuda a concentrarse en la automatización.
* El sintetizador granular combinado con pre-delay corto mantiene claridad.
$$,
    'https://files.soniccdn.com/files/2026/02/19/FL%20Studio%20Instrumentos%20y%20Efectos-860x272.jpg',
    'publicado',
    CURRENT_TIMESTAMP
),

(
    'Ajustes y Calibraciones: Afinar',
    'ajustes-y-calibraciones-afinar',
    'Ajustes finos de mezcla y master para que las frecuencias no se vuelvan ruido.',
$$
## Micro ajustes que cambian todo

La mezcla oscura exige un espacio controlado.

### Checklist rápido

| Ajuste | Acción / Propósito |
| :--- | :--- |
| High-pass suave en pads | Limpieza del rango grave |
| Sidechain delicado | Espacio para el sub-bajo |
| Frecuencias en mono | Centro firme |
| Limitador con margen | Evitar distorsión |

#### Detalle clave
Reducir las reflexiones tempranas mantiene limpio el transitorio.

> Si todo es denso, nada destaca.

---

## El Ruteo del Espacio

### 1. Gestión de Frecuencias
* Limpieza de canales.
* Ecualización dinámica entre bajo y bombo.

### 2. Automatización y Movimiento
* Ganancia manual.
* Filtros dinámicos.

---

### Notas de Bitácora
* El espacio entre sonidos define la profundidad.
* Limpiar sub-graves ayuda al limitador final.
$$,
    'https://hybridart.net/wp-content/uploads/2020/03/spacecraft-sintesis-granular.png',
    'publicado',
    CURRENT_TIMESTAMP
);



/*
========================================================
INSERTS: etiquetas
========================================================
*/

INSERT INTO etiquetas (nombre)
VALUES
('lanzamiento'),
('vi feather'),
('dark ambient'),
('estreno'),
('tutorial'),
('sound design'),
('dron'),
('produccion'),
('journal'),
('herramientas'),
('workflow'),
('mezcla'),
('master'),
('calibracion'),
('sonido')
ON CONFLICT (nombre) DO NOTHING;



/*
========================================================
RELACIONES: publicaciones_etiquetas
========================================================
*/

-- Publicación 1
INSERT INTO publicaciones_etiquetas (publicacion_id, etiqueta_id)
SELECT 1, id FROM etiquetas
WHERE nombre IN ('lanzamiento','vi feather','dark ambient','estreno');

-- Publicación 2
INSERT INTO publicaciones_etiquetas (publicacion_id, etiqueta_id)
SELECT 2, id FROM etiquetas
WHERE nombre IN ('tutorial','sound design','dron','produccion');

-- Publicación 3
INSERT INTO publicaciones_etiquetas (publicacion_id, etiqueta_id)
SELECT 3, id FROM etiquetas
WHERE nombre IN ('journal','herramientas','workflow','produccion');

-- Publicación 4
INSERT INTO publicaciones_etiquetas (publicacion_id, etiqueta_id)
SELECT 4, id FROM etiquetas
WHERE nombre IN ('mezcla','master','calibracion','sonido');

