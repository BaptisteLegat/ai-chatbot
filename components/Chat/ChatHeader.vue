<script setup>
    defineProps({
        isDarkMode: Boolean,
        duelMode: Boolean,
    });

    defineEmits(['toggle-dark-mode', 'toggle-duel-mode']);
</script>
<template>
    <div class="mb-8 flex items-center justify-between">
        <h1
            :class="[
                'text-3xl font-bold',
                isDarkMode ? 'text-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent',
            ]"
        >
            PromptCraft
        </h1>
        <div class="flex items-center gap-3">
            <button
                @click="$emit('toggle-dark-mode')"
                class="rounded-full p-2 text-sm"
                :class="isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'"
            >
                <span v-if="isDarkMode">☀️</span>
                <span v-else>🌙</span>
            </button>
            <button
                @click="$emit('toggle-duel-mode')"
                class="rounded-full px-4 py-2 text-sm font-medium transition-all"
                :class="
                    duelMode
                        ? isDarkMode
                            ? 'bg-purple-800 text-purple-200 ring-2 ring-purple-500'
                            : 'bg-purple-100 text-purple-700 ring-2 ring-purple-500'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                "
            >
                {{ duelMode ? '✌️ Mode Duel Activé' : '⚔️ Activer le Duel' }}
            </button>
        </div>
    </div>
</template>
