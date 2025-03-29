<script setup>
    defineProps({
        isDarkMode: Boolean,
    });
</script>
<template>
    <div :class="['mt-6 rounded-lg p-4', isDarkMode ? 'bg-gray-700' : 'bg-blue-50']">
        <div class="flex items-center justify-between">
            <h3 :class="['text-sm font-medium', isDarkMode ? 'text-white' : 'text-blue-800']">🏆 Hall of Fame</h3>
        </div>
        <div class="mt-2 space-y-2">
            <div :class="['rounded-lg p-2', isDarkMode ? 'bg-gray-800' : 'bg-white']">
                <div class="flex items-center justify-between">
                    <span :class="['text-xs font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">L'aventure de Mistral</span>
                    <span :class="['text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">par Maria</span>
                </div>
                <p :class="['mt-1 line-clamp-2 text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                    Once upon a time there was a little cat named Mistral who loved to explore the magical garden...
                </p>
            </div>
            <div :class="['rounded-lg p-2', isDarkMode ? 'bg-gray-800' : 'bg-white']">
                <div class="flex items-center justify-between">
                    <span :class="['text-xs font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Le voyage interstellaire</span>
                    <span :class="['text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">par Thomas</span>
                </div>
                <p :class="['mt-1 line-clamp-2 text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                    In a distant future where humans traveled between stars as easily as we take the bus...
                </p>
            </div>
            <div :class="['rounded-lg p-2', isDarkMode ? 'bg-gray-800' : 'bg-white']">
                <div class="flex items-center justify-between">
                    <span :class="['text-xs font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">La forêt enchantée</span>
                    <span :class="['text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">par Sophie</span>
                </div>
                <p :class="['mt-1 line-clamp-2 text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                    Deep in the heart of an ancient forest, where magic still lingered in every leaf and stone...
                </p>
            </div>
            <div :class="['rounded-lg p-2', isDarkMode ? 'bg-gray-800' : 'bg-white']">
                <div class="flex items-center justify-between">
                    <span :class="['text-xs font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Le secret du dragon</span>
                    <span :class="['text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">par Lucas</span>
                </div>
                <p :class="['mt-1 line-clamp-2 text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                    High in the misty mountains, a young dragon keeper discovered an ancient scroll that would change everything...
                </p>
            </div>
        </div>
    </div>
</template>
