<script setup lang="ts">
useSeoMeta({
  title: 'Inicio',
  ogTitle: 'Inicio',
  description: 'ViFeather - Sitio Oficial. Frecuencias nacidas en la penumbra.',
  ogDescription: 'ViFeather - Sitio Oficial. Frecuencias nacidas en la penumbra.'
})

// El array Lore ahora funciona puramente para la sección conceptual de abajo
const conceptualLore = [
  {
    title: 'La Esencia',
    description: 'ViFeather habita en el espectro entre lo etéreo y lo industrial. Un ente que se manifiesta en la colisión de texturas melódicas y sombras profundas, definiendo un espacio donde la melancolía encuentra su propia frecuencia.'
  },
  {
    title: 'Manifiesto Sonoro',
    description: 'Una búsqueda constante por traducir el vacío a través de sintetizadores pesados y atmósferas envolventes. La música no solo se escucha; es un paisaje táctil diseñado para perderse en la oscuridad.'
  },
  {
    title: 'Legado en la Sombra',
    description: 'El proyecto rescata visiones que quedaron suspendidas en el tiempo. Es la continuación de una narrativa que se niega a desaparecer, transformando el silencio y los ecos del pasado en nuevas formas de energía.'
  }
]
</script>

<template>
  <div class="home-page px-4 md:px-8 max-w-[1400px] mx-auto">
    
    <section class="hero-shell">
      <div class="hero-bg-glow" />

      <UContainer class="hero-grid items-center">
        <Motion
          class="hero-copy"
          :initial="{ opacity: 0, y: 28 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.55 }"
        >
          <NuxtImg
            src="/brand/vf-logo.png"
            alt="VF Logo"
            width="120"
            height="120"
            class="brand-logo brand-logo--hero"
          />

          <p class="hero-kicker">
            Biografía | ViFeather
          </p>
          
          <h1 class="hero-title">
            Biografía
          </h1>
          
          <p class="hero-description text-justify">
            Detrás de ViFeather habitan casi cinco años de exploración entre el colour bass y el dark ambient. La identidad de este sonido nació de un lazo creativo y una visión compartida con ERAVFT. Aunque el tiempo ha transformado los caminos y hoy no existen rastros públicos de aquella alianza, el impacto de ese diálogo inicial define la base del proyecto. ViFeather continúa hoy su viaje en solitario desde la penumbra, rescatando las visiones suspendidas en el pasado para transformarlas en nuevas corrientes de energía.
          </p>

          <div class="hero-actions">
            <UButton
              size="xl"
              to="/music"
              label="Escuchar Música"
              class="hero-primary-btn"
            />
            <UButton
              size="xl"
              variant="outline"
              to="/youtube"
              label="Ver Canal de YouTube"
              class="hero-secondary-btn"
            />
          </div>
        </Motion>

        <Motion
          class="hero-panel"
          :initial="{ opacity: 0, y: 30, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.55, delay: 0.12 }"
        >
          <p class="panel-overline">
            Ecos del Trayecto
          </p>
          <h2 class="panel-title">
            Dimensiones del Proyecto
          </h2>

          <ul class="panel-list">
            <li>
              <span class="panel-dot" />
              <strong>Simbiosis Creativa:</strong> Cimientos artísticos construidos sobre una historia compartida.
            </li>
            <li>
              <span class="panel-dot" />
              <strong>Identidad Sonora:</strong> Contraste entre texturas melódicas profundas y rítmicas industriales.
            </li>
            <li>
              <span class="panel-dot" />
              <strong>Narrativa Abierta:</strong> Un canal para resguardar las historias que el tiempo dejó en pausa.
            </li>
          </ul>
        </Motion>
      </UContainer>
    </section>

    <section class="py-16 border-t border-white/5">
      <UContainer class="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        
        <div class="space-y-2 md:sticky md:top-8">
          <p class="section-label">El Universo</p>
          <h2 class="text-3xl md:text-4xl font-serif tracking-tight uppercase leading-tight">Más allá de la superficie</h2>
        </div>

        <div class="md:col-span-2 space-y-10">
          <div 
            v-for="(item, index) in conceptualLore" 
            :key="item.title"
            class="space-y-3"
          >
            <Motion
              :initial="{ opacity: 0, x: 30 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.5, delay: 0.08 * index }"
            >
              <h3 class="text-xl font-serif text-purple-400 font-medium tracking-wide">{{ item.title }}</h3>
              <p class="text-white/80 leading-relaxed text-base md:text-lg font-light">{{ item.description }}</p>
            </Motion>
          </div>
        </div>

      </UContainer>
    </section>

    <section class="py-16 border-t border-white/5">
      <UContainer class="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        
        <div class="md:col-span-2 space-y-6">
          <div>
            <p class="section-label">Estética y Visión</p>
            <h2 class="text-3xl font-serif uppercase tracking-tight mt-2">Atmósfera Visual</h2>
          </div>
          
          <div class="space-y-4">
            <p class="text-white/80 leading-relaxed text-base">
              La identidad visual se sumerge en una propuesta poética y oscura. Una paleta dominada por tonalidades púrpuras, azules y magentas envuelve el misterio que rodea a cada producción.
            </p>
            <p class="text-white/80 leading-relaxed text-base">
              Más allá de lo sonoro, cada elemento existe para dar forma y textura a las frecuencias, consolidando un entorno donde la melancolía encuentra su propia expresión visual.
            </p>
          </div>
        </div>

        <div class="md:col-span-3 w-full">
          <Motion
            :initial="{ opacity: 0, scale: 0.98 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.6 }"
            class="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/30 shadow-2xl border border-white/10"
          >
            <NuxtImg 
              src="/brand/character-visual.png" 
              alt="Visual Aesthetic Display of ViFeather" 
              class="w-full h-full object-cover grayscale-[10%] contrast-[105%]"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          </Motion>
        </div>

      </UContainer>
    </section>

  </div>
</template>

<style scoped>
/* Sin CSS duro para mantener intactos tus gradientes y variables globales de Kigen */
</style>