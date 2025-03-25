<script setup>
    defineProps({
        storyTitle: String,
        storyContent: String,
        isDarkMode: Boolean,
    });

    defineEmits(['update:story-title', 'update:story-content']);
</script>
<template>
    <div :class="['mb-4 rounded-lg p-4', isDarkMode ? 'bg-gray-700' : 'bg-gray-50']">
        <div class="mb-2">
            <label :class="['block text-sm font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Titre de l'histoire</label>
            <input
                :value="storyTitle"
                @input="$emit('update:story-title', $event.target.value)"
                type="text"
                :class="[
                    'mt-1 w-full rounded-lg border px-3 py-2 text-sm',
                    isDarkMode
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                ]"
                placeholder="Donnez un titre à votre histoire..."
            />
        </div>
        <div>
            <textarea
                :value="storyContent"
                @input="$emit('update:story-content', $event.target.value)"
                :class="[
                    'mt-1 h-64 w-full rounded-lg border px-3 py-2 text-sm',
                    isDarkMode
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                ]"
                placeholder="Il était une fois..."
            ></textarea>
        </div>
    </div>
</template>
