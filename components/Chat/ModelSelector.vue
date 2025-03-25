<script setup>
    const props = defineProps({
        duelMode: Boolean,
        activeModel: String,
        secondaryModel: String,
        availableModels: Array,
        isDarkMode: Boolean,
    });

    const emit = defineEmits(['select-model']);

    const handleModelSelect = (modelId, isSecondary = false) => {
        if (props.duelMode) {
            if (isSecondary && modelId === props.activeModel) return;
            if (!isSecondary && modelId === props.secondaryModel) return;
        }
        emit('select-model', modelId, isSecondary);
    };
</script>
<template>
    <div class="border-b p-4" :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'">
        <div v-if="!duelMode" class="space-y-3">
            <h3 class="text-sm font-medium" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Sélectionnez votre modèle IA</h3>
            <div class="flex flex-wrap gap-2">
                <button
                    v-for="model in availableModels"
                    :key="model.id"
                    @click="handleModelSelect(model.id)"
                    :disabled="activeModel === model.id"
                    class="group relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all"
                    :class="[
                        activeModel === model.id
                            ? isDarkMode
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-blue-500 text-white shadow-md'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    ]"
                >
                    <span class="relative z-10 flex items-center gap-2">
                        <span class="h-2 w-2 rounded-full" :class="model.provider === 'nvidia' ? 'bg-green-500' : 'bg-yellow-500'"></span>
                        {{ model.name }}
                        <span v-if="activeModel === model.id" class="ml-1">✓</span>
                    </span>
                </button>
            </div>
        </div>
        <div v-else class="space-y-4">
            <h3 class="text-sm font-medium" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Configurez votre duel IA</h3>
            <div class="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div class="flex-1 space-y-2">
                    <h4 class="text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'">Modèle 1</h4>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <button
                            v-for="model in availableModels"
                            :key="'model1-' + model.id"
                            @click="handleModelSelect(model.id, false)"
                            :disabled="duelMode && model.id === secondaryModel"
                            class="group relative flex flex-col items-center rounded-lg p-3 transition-all"
                            :class="[
                                activeModel === model.id
                                    ? isDarkMode
                                        ? 'bg-blue-600/20 ring-2 ring-blue-500'
                                        : 'bg-blue-100 ring-2 ring-blue-500'
                                    : isDarkMode
                                      ? 'bg-gray-700 hover:bg-gray-600'
                                      : 'bg-gray-100 hover:bg-gray-200',
                                duelMode && model.id === secondaryModel ? 'cursor-not-allowed opacity-50' : '',
                            ]"
                        >
                            <div class="mb-1 h-8 w-8 rounded-full p-1.5" :class="isDarkMode ? 'bg-gray-600' : 'bg-white'">
                                <div class="h-full w-full rounded-full" :class="model.provider === 'nvidia' ? 'bg-green-500' : 'bg-yellow-500'"></div>
                            </div>
                            <span class="text-xs font-medium" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">{{ model.name }}</span>
                            <span
                                v-if="activeModel === model.id"
                                class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white"
                                >✓</span
                            >
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <div class="rounded-full p-2" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-200'">
                        <span class="text-lg font-bold" :class="isDarkMode ? 'text-purple-400' : 'text-purple-600'">VS</span>
                    </div>
                </div>
                <div class="flex-1 space-y-2">
                    <h4 class="text-xs font-bold uppercase tracking-wider" :class="isDarkMode ? 'text-purple-400' : 'text-purple-600'">Modèle 2</h4>
                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <button
                            v-for="model in availableModels"
                            :key="'model2-' + model.id"
                            @click="handleModelSelect(model.id, true)"
                            :disabled="duelMode && model.id === activeModel"
                            class="group relative flex flex-col items-center rounded-lg p-3 transition-all"
                            :class="[
                                secondaryModel === model.id
                                    ? isDarkMode
                                        ? 'bg-purple-600/20 ring-2 ring-purple-500'
                                        : 'bg-purple-100 ring-2 ring-purple-500'
                                    : isDarkMode
                                      ? 'bg-gray-700 hover:bg-gray-600'
                                      : 'bg-gray-100 hover:bg-gray-200',
                                duelMode && model.id === activeModel ? 'cursor-not-allowed opacity-50' : '',
                            ]"
                        >
                            <div class="mb-1 h-8 w-8 rounded-full p-1.5" :class="isDarkMode ? 'bg-gray-600' : 'bg-white'">
                                <div class="h-full w-full rounded-full" :class="model.provider === 'nvidia' ? 'bg-green-500' : 'bg-yellow-500'"></div>
                            </div>
                            <span class="text-xs font-medium" :class="isDarkMode ? 'text-gray-200' : 'text-gray-800'">{{ model.name }}</span>
                            <span
                                v-if="secondaryModel === model.id"
                                class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs text-white"
                                >✓</span
                            >
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="activeModel && secondaryModel" class="pt-2 text-center">
                <span
                    class="inline-block rounded-full px-3 py-1 text-xs font-medium"
                    :class="isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'"
                >
                    Duel prêt ! Entrez votre prompt pour commencer.
                </span>
            </div>
        </div>
    </div>
</template>
