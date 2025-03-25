<script setup>
    defineProps({
        currentView: String,
        isDarkMode: Boolean,
    });

    defineEmits(['change-view']);
</script>
<template>
    <div class="mb-6 flex gap-3 overflow-x-auto border-b border-gray-200 pb-2" :class="isDarkMode ? 'border-gray-700' : ''">
        <button
            v-for="view in [
                { id: 'chat', label: '💬 Chat' },
                { id: 'discover', label: '🔍 Découvrir les prompts' },
                { id: 'story', label: '📖 Mode Histoire' },
            ]"
            @click="$emit('change-view', view.id)"
            class="flex-shrink-0 rounded-t-lg px-4 py-2 text-sm font-medium transition-all"
            :class="[
                currentView === view.id
                    ? isDarkMode
                        ? 'border-b-2 border-purple-500 bg-gray-800'
                        : 'border-b-2 border-blue-500 bg-white'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-600 hover:text-gray-800',
            ]"
        >
            {{ view.label }}
        </button>
    </div>
</template>
