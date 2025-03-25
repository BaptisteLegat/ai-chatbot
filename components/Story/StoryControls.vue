<script setup>
    defineProps({
        isDarkMode: Boolean,
    });

    defineEmits(['export-story', 'new-story']);
</script>
<template>
    <div class="mb-4 flex items-center justify-between">
        <h2 :class="['text-xl font-bold', isDarkMode ? 'text-white' : 'text-gray-800']">Mode Histoire</h2>
        <div class="flex gap-2">
            <button
                @click="$emit('export-story')"
                :class="[
                    'rounded-lg px-3 py-1 text-sm font-medium',
                    isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
            >
                📥 Exporter
            </button>
            <button
                @click="$emit('new-story')"
                :class="[
                    'rounded-lg px-3 py-1 text-sm font-medium',
                    isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
            >
                🔄 Nouvelle histoire
            </button>
        </div>
    </div>
</template>
