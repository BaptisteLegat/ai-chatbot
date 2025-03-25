<script setup>
    defineProps({
        isDarkMode: Boolean,
    });
</script>
<template>
    <div :class="['mt-6 rounded-lg p-4', isDarkMode ? 'bg-gray-700' : 'bg-blue-50']">
        <div class="flex items-center justify-between">
            <h3 :class="['text-sm font-medium', isDarkMode ? 'text-white' : 'text-blue-800']">🏆 Hall of Fame</h3>
            <span :class="['text-xs', isDarkMode ? 'text-gray-400' : 'text-blue-600']">Voir tout</span>
        </div>
        <div class="mt-2 space-y-2">
            <div :class="['rounded-lg p-2', isDarkMode ? 'bg-gray-800' : 'bg-white']">
                <div class="flex items-center justify-between">
                    <span :class="['text-xs font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">L'aventure de Mistral</span>
                    <span :class="['text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">par Maria</span>
                </div>
                <p :class="['mt-1 line-clamp-2 text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                    Il était une fois un petit chat nommé Mistral qui adorait explorer le jardin magique...
                </p>
            </div>
            <div :class="['rounded-lg p-2', isDarkMode ? 'bg-gray-800' : 'bg-white']">
                <div class="flex items-center justify-between">
                    <span :class="['text-xs font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Le voyage interstellaire</span>
                    <span :class="['text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-500']">par Thomas</span>
                </div>
                <p :class="['mt-1 line-clamp-2 text-xs', isDarkMode ? 'text-gray-400' : 'text-gray-600']">
                    Dans un futur lointain, où les humains voyageaient entre les étoiles aussi facilement que nous prenons le bus...
                </p>
            </div>
        </div>
    </div>
</template>
