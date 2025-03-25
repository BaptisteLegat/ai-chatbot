<script setup>
    defineProps({
        selectedTags: Array,
        availableTags: Array,
        isDarkMode: Boolean,
    });

    defineEmits(['toggle-tag']);
</script>
<template>
    <div class="mb-4 flex flex-wrap gap-2">
        <span
            v-for="tag in availableTags"
            @click="$emit('toggle-tag', tag)"
            :class="[
                'cursor-pointer rounded-full px-3 py-1 text-sm',
                selectedTags.includes(tag)
                    ? isDarkMode
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-100 text-blue-800'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600',
            ]"
        >
            {{ tag }}
        </span>
    </div>
</template>
