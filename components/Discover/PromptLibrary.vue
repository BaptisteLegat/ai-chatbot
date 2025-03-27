<script setup>
    defineProps({
        promptLibrary: Array,
        selectedTags: Array,
        isDarkMode: Boolean,
    });

    defineEmits(['use-prompt', 'like-prompt']);
</script>
<template>
    <div class="grid gap-4 sm:grid-cols-2">
        <div
            v-for="prompt in promptLibrary"
            v-show="selectedTags.length === 0 || selectedTags.every((tag) => prompt.tags.includes(tag))"
            :class="['rounded-lg p-4 transition-all hover:shadow-md', isDarkMode ? 'bg-gray-700' : 'bg-gray-50']"
        >
            <div class="mb-1 flex items-center justify-between">
                <h3 :class="['font-medium', isDarkMode ? 'text-white' : 'text-gray-900']">{{ prompt.title }}</h3>
                <div class="flex items-center gap-1">
                    <button
                        @click="$emit('like-prompt', prompt.id)"
                        :class="['text-sm', isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700']"
                    >
                        👍 {{ prompt.likes }}
                    </button>
                </div>
            </div>
            <p :class="['mb-2 text-sm', isDarkMode ? 'text-gray-300' : 'text-gray-600']">{{ prompt.prompt }}</p>
            <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-1">
                    <span
                        v-for="tag in prompt.tags"
                        :class="['rounded-full px-2 py-0.5 text-xs', isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600']"
                    >
                        {{ tag }}
                    </span>
                </div>
                <button
                    @click="$emit('use-prompt', prompt.prompt)"
                    :class="[
                        'rounded-lg px-3 py-1 text-xs font-medium',
                        isDarkMode ? 'bg-blue-700 text-white hover:bg-blue-600' : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
                    ]"
                >
                    Utiliser
                </button>
            </div>
            <div :class="['mt-2 text-right text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">Par {{ prompt.author }}</div>
        </div>
    </div>
</template>
