<script setup lang="ts">
import { marked } from 'marked'

export type PostEditorData = {
  titulo: string
  slug: string
  resumen: string
  contenido: string
  imagenPortada: string
  estado: 'borrador' | 'publicado' | 'archivado'
  etiquetasInput: string
}

const props = defineProps<{
  modelValue: PostEditorData
  submitLabel?: string
  loading?: boolean
  errors?: Partial<Record<keyof PostEditorData, string>>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: PostEditorData]
  submit: []
}>()

const updateField = <K extends keyof PostEditorData>(key: K, value: PostEditorData[K]) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}

const onSubmit = () => {
  emit('submit')
}

const countWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length

const resumenWords = computed(() => countWords(props.modelValue.resumen))
const contenidoWords = computed(() => countWords(props.modelValue.contenido))
const previewHtml = computed(() => {
  if (!props.modelValue.contenido.trim()) {
    return '<p class="text-muted">Escribe el contenido en Markdown para ver el preview en vivo.</p>'
  }

  return marked.parse(props.modelValue.contenido, {
    gfm: true,
    breaks: true
  }) as string
})

const previewImage = computed(() => {
  const value = props.modelValue.imagenPortada.trim()
  if (!value) {
    return ''
  }

  return /^https?:\/\//i.test(value) ? value : ''
})

const previewTags = computed(() => {
  return props.modelValue.etiquetasInput
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
})
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <div class="space-y-6">
      <div class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="flex flex-col gap-1 text-sm">
            <span class="font-medium">Titulo</span>
            <input
              :value="modelValue.titulo"
              class="rounded-lg border bg-white/80 dark:bg-black/25 px-3 py-2"
              :class="errors?.titulo ? 'border-red-400' : 'border-default'"
              required
              @input="updateField('titulo', ($event.target as HTMLInputElement).value)"
            >
            <span v-if="errors?.titulo" class="text-xs text-red-600 dark:text-red-300">{{ errors.titulo }}</span>
          </label>

          <label class="flex flex-col gap-1 text-sm">
            <span class="font-medium">Slug</span>
            <input
              :value="modelValue.slug"
              class="rounded-lg border bg-white/80 dark:bg-black/25 px-3 py-2"
              :class="errors?.slug ? 'border-red-400' : 'border-default'"
              placeholder="se-genera-si-lo-dejas-vacio"
              @input="updateField('slug', ($event.target as HTMLInputElement).value)"
            >
            <span v-if="errors?.slug" class="text-xs text-red-600 dark:text-red-300">{{ errors.slug }}</span>
          </label>
        </div>

        <label class="flex flex-col gap-1 text-sm">
          <span class="font-medium">Resumen</span>
          <textarea
            :value="modelValue.resumen"
            class="rounded-lg border bg-white/80 dark:bg-black/25 px-3 py-2 min-h-24"
            :class="errors?.resumen ? 'border-red-400' : 'border-default'"
            @input="updateField('resumen', ($event.target as HTMLTextAreaElement).value)"
          />
          <div class="flex items-center justify-between text-xs">
            <span v-if="errors?.resumen" class="text-red-600 dark:text-red-300">{{ errors.resumen }}</span>
            <span class="text-muted ml-auto">{{ resumenWords }} / 10 palabras minimo</span>
          </div>
        </label>

        <label class="flex flex-col gap-1 text-sm">
          <span class="font-medium">Contenido (Markdown)</span>
          <textarea
            :value="modelValue.contenido"
            class="rounded-lg border bg-white/80 dark:bg-black/25 px-3 py-2 min-h-72 font-mono text-[13px] leading-6"
            :class="errors?.contenido ? 'border-red-400' : 'border-default'"
            required
            @input="updateField('contenido', ($event.target as HTMLTextAreaElement).value)"
          />
          <div class="flex items-center justify-between text-xs">
            <span v-if="errors?.contenido" class="text-red-600 dark:text-red-300">{{ errors.contenido }}</span>
            <span class="text-muted ml-auto">{{ contenidoWords }} / 20 palabras minimo</span>
          </div>
        </label>

        <div class="grid gap-4 md:grid-cols-3">
          <label class="flex flex-col gap-1 text-sm md:col-span-2">
            <span class="font-medium">Imagen portada (URL)</span>
            <input
              :value="modelValue.imagenPortada"
              class="rounded-lg border bg-white/80 dark:bg-black/25 px-3 py-2"
              :class="errors?.imagenPortada ? 'border-red-400' : 'border-default'"
              @input="updateField('imagenPortada', ($event.target as HTMLInputElement).value)"
            >
            <span v-if="errors?.imagenPortada" class="text-xs text-red-600 dark:text-red-300">{{ errors.imagenPortada }}</span>
          </label>

          <label class="flex flex-col gap-1 text-sm">
            <span class="font-medium">Estado</span>
            <select
              :value="modelValue.estado"
              class="rounded-lg border border-default bg-white/80 dark:bg-black/25 px-3 py-2"
              @change="updateField('estado', ($event.target as HTMLSelectElement).value as PostEditorData['estado'])"
            >
              <option value="borrador">Borrador</option>
              <option value="publicado">Publicado</option>
              <option value="archivado">Archivado</option>
            </select>
          </label>
        </div>

        <label class="flex flex-col gap-1 text-sm">
          <span class="font-medium">Etiquetas (separadas por coma)</span>
          <input
            :value="modelValue.etiquetasInput"
            class="rounded-lg border border-default bg-white/80 dark:bg-black/25 px-3 py-2"
            placeholder="musica, produccion, backstage"
            @input="updateField('etiquetasInput', ($event.target as HTMLInputElement).value)"
          >
        </label>
      </div>

      <aside class="rounded-2xl border border-default bg-white/70 dark:bg-black/20 p-5 shadow-sm">
        <div class="flex items-center justify-between gap-3 mb-4">
          <div>
            <p class="text-xs uppercase tracking-[0.2em] text-muted">Preview en vivo</p>
            <h3 class="text-lg font-semibold">Como se vera el post</h3>
          </div>
          <UBadge color="neutral" variant="subtle" size="xs">
            {{ modelValue.estado }}
          </UBadge>
        </div>

        <div class="space-y-4">
          <img
            v-if="previewImage"
            :src="previewImage"
            :alt="modelValue.titulo || 'Preview de portada'"
            class="h-44 w-full rounded-xl object-cover object-center border border-default"
          >

          <div class="space-y-2">
            <h4 class="text-2xl font-semibold leading-tight text-foreground break-words">
              {{ modelValue.titulo || 'Titulo de la publicacion' }}
            </h4>
            <p class="text-sm text-muted leading-6 break-words">
              {{ modelValue.resumen || 'Aqui se mostrara el resumen del post.' }}
            </p>
          </div>

          <div v-if="previewTags.length" class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in previewTags"
              :key="tag"
              color="neutral"
              variant="subtle"
              size="xs"
            >
              {{ tag }}
            </UBadge>
          </div>

          <div class="prose-preview markdown-body max-h-[480px] overflow-auto pr-1" v-html="previewHtml" />
        </div>
      </aside>
    </div>

    <div class="flex justify-end">
      <UButton type="submit" :loading="loading">
        {{ submitLabel || 'Guardar publicacion' }}
      </UButton>
    </div>
  </form>
</template>

<style scoped>
.markdown-body {
  color: rgb(var(--ui-text-highlighted));
  font-size: 0.93rem;
  line-height: 1.65;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  color: rgb(var(--ui-text-highlighted));
  font-weight: 700;
  margin: 1rem 0 0.5rem;
  line-height: 1.25;
}

.markdown-body :deep(h1) { font-size: 1.6rem; }
.markdown-body :deep(h2) { font-size: 1.35rem; }
.markdown-body :deep(h3) { font-size: 1.15rem; }
.markdown-body :deep(h4) { font-size: 1.05rem; }

.markdown-body :deep(p) {
  margin: 0.55rem 0;
}

.markdown-body :deep(a) {
  color: rgb(var(--ui-primary));
  text-decoration: underline;
}

.markdown-body :deep(strong) {
  font-weight: 700;
}

.markdown-body :deep(em) {
  font-style: italic;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 0.6rem 0 0.6rem 1.25rem;
  padding-left: 0.4rem;
}

.markdown-body :deep(li) {
  margin: 0.25rem 0;
}

.markdown-body :deep(pre) {
  background: rgba(0, 0, 0, 0.35);
  color: inherit;
  padding: 0.9rem;
  border-radius: 0.75rem;
  overflow: auto;
  margin: 0.8rem 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.markdown-body :deep(code) {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.12rem 0.35rem;
  border-radius: 0.35rem;
  font-size: 0.88em;
}

.markdown-body :deep(blockquote) {
  margin: 0.8rem 0;
  padding: 0.2rem 0 0.2rem 0.9rem;
  border-left: 3px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.78);
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.9rem 0;
  font-size: 0.9rem;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.45rem 0.55rem;
  text-align: left;
}

.markdown-body :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 0.85rem 0;
}
</style>
