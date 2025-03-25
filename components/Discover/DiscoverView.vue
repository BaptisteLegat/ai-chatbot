<script setup>
    import TagFilter from './TagFilter.vue';
    import PromptLibrary from './PromptLibrary.vue';

    defineProps({
        promptLibrary: Array,
        selectedTags: Array,
        availableTags: Array,
        isDarkMode: Boolean,
    });

    defineEmits(['use-prompt', 'toggle-tag', 'like-prompt']);
</script>
<template>
    <div class="p-4">
        <h2 :class="['mb-4 text-xl font-bold', isDarkMode ? 'text-white' : 'text-gray-800']">Bibliothèque de Prompts</h2>

        <TagFilter :selectedTags="selectedTags" :availableTags="availableTags" :isDarkMode="isDarkMode" @toggle-tag="$emit('toggle-tag', $event)" />

        <PromptLibrary
            :promptLibrary="promptLibrary"
            :selectedTags="selectedTags"
            :isDarkMode="isDarkMode"
            @use-prompt="$emit('use-prompt', $event)"
            @like-prompt="$emit('like-prompt', $event)"
        />
    </div>
</template>
