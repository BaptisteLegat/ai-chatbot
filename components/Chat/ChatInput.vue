<script setup>
    defineProps({
        message: String,
        activeModel: String,
        secondaryModel: String,
        duelMode: Boolean,
        loading: Boolean,
        isDarkMode: Boolean,
        selectedTags: Array,
        availableTags: Array,
    });

    defineEmits(['send-prompt', 'save-to-library', 'toggle-tag', 'update:message']);
</script>
<template>
    <div :class="['border-t p-4', isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50']">
        <form @submit.prevent="$emit('send-prompt')" class="flex gap-2">
            <input
                :value="message"
                @input="$emit('update:message', $event.target.value)"
                type="text"
                placeholder="Écrivez votre prompt ici..."
                :class="[
                    'flex-1 rounded-xl border px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2',
                    isDarkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-purple-500' : 'border-gray-300 focus:ring-blue-500',
                ]"
                :disabled="(!activeModel && !duelMode) || (duelMode && (!activeModel || !secondaryModel))"
            />
            <div class="flex gap-2">
                <button
                    type="button"
                    @click="$emit('save-to-library')"
                    :class="[
                        'flex items-center justify-center rounded-xl px-3 py-3 transition-all',
                        isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                        !message ? 'cursor-not-allowed opacity-50' : '',
                    ]"
                    :disabled="!message"
                >
                    💾
                </button>
                <div class="relative">
                    <button
                        type="button"
                        @click="$emit('toggle-tag', 'Créatif')"
                        :class="[
                            'flex items-center justify-center rounded-xl px-3 py-3 transition-all',
                            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                            selectedTags.length ? 'ring-2 ring-blue-500' : '',
                        ]"
                    >
                        🏷️
                    </button>
                    <div
                        v-if="selectedTags.length > 0"
                        class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white"
                    >
                        {{ selectedTags.length }}
                    </div>
                </div>
                <button
                    type="submit"
                    :class="[
                        'flex items-center justify-center rounded-xl px-5 py-3 text-white transition-all',
                        isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700',
                        !message || (!activeModel && !duelMode) || (duelMode && (!activeModel || !secondaryModel)) || loading
                            ? 'cursor-not-allowed opacity-50'
                            : '',
                    ]"
                    :disabled="!message || (!activeModel && !duelMode) || (duelMode && (!activeModel || !secondaryModel)) || loading"
                >
                    <span v-if="!loading">Envoyer</span>
                    <svg v-else class="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </button>
            </div>
        </form>
        <div v-if="selectedTags.length > 0" class="mt-2 flex flex-wrap gap-1">
            <span
                v-for="tag in availableTags"
                @click="$emit('toggle-tag', tag)"
                :class="[
                    'cursor-pointer rounded-full px-2 py-1 text-xs',
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
        <div
            v-if="(!activeModel && !duelMode) || (duelMode && (!activeModel || !secondaryModel))"
            :class="['mt-2 text-center text-sm', isDarkMode ? 'text-gray-400' : 'text-gray-500']"
        >
            {{ duelMode ? 'Sélectionnez deux modèles pour commencer le duel' : 'Sélectionnez un modèle pour commencer la conversation' }}
        </div>
    </div>
</template>
