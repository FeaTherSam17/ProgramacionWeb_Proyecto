<script setup lang="ts">
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
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
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
        class="rounded-lg border bg-white/80 dark:bg-black/25 px-3 py-2 min-h-72"
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

    <div class="flex justify-end">
      <UButton type="submit" :loading="loading">
        {{ submitLabel || 'Guardar publicacion' }}
      </UButton>
    </div>
  </form>
</template>
