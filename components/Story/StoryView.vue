<script setup>
    import StoryEditor from './StoryEditor.vue';
    import StoryControls from './StoryControls.vue';
    import HallOfFame from './HallOfFame.vue';
    import { ref, watch } from 'vue';

    const props = defineProps({
        storyTitle: String,
        storyContent: String,
        message: String,
        messages: Array,
        activeModel: String,
        loading: Boolean,
        isDarkMode: Boolean,
        availableModels: Array,
    });

    const emit = defineEmits(['export-story', 'select-model', 'send-prompt', 'update:story-title', 'update:story-content', 'update:message']);

    const localMessage = ref(props.message || '');

    watch(localMessage, (newVal) => {
        emit('update:message', newVal);
    });

    watch(
        () => props.activeModel,
        (newModel) => {
            if (newModel && props.messages && props.messages.length > 0) {
                const lastMessage = props.messages[props.messages.length - 1];
                if (lastMessage.role === 'AI' && lastMessage.model === props.activeModel) {
                    emit('update:story-content', props.storyContent + '\n\n' + lastMessage.message);
                }
            }
        }
    );

    const sendPrompt = () => {
        if (props.activeModel === 'roneneldan/TinyStories-33M') {
            emit('update:message', localMessage.value);
        }
        emit('send-prompt');
    };

    watch(
        () => props.activeModel,
        (newModel) => {
            if (newModel && props.messages && props.messages.length > 0) {
                const lastMessage = props.messages[props.messages.length - 1];
                if (lastMessage.role === 'AI' && lastMessage.model === props.activeModel) {
                    emit('update:story-content', props.storyContent + '\n\n' + lastMessage.message);
                }
            }
        }
    );
</script>
<template>
    <div class="p-4">
        <StoryControls
            :isDarkMode="isDarkMode"
            @export-story="$emit('export-story')"
            @new-story="
                $emit('update:story-content', '');
                $emit('update:story-title', 'My Story');
            "
        />
        <StoryEditor
            :storyTitle="storyTitle"
            :storyContent="storyContent"
            :isDarkMode="isDarkMode"
            @update:story-title="$emit('update:story-title', $event)"
            @update:story-content="$emit('update:story-content', $event)"
        />
        <div :class="['border-t pt-4', isDarkMode ? 'border-gray-700' : 'border-gray-200']">
            <h3 :class="['mb-2 text-sm font-medium', isDarkMode ? 'text-gray-300' : 'text-gray-700']">Continuer l'histoire avec le modèle</h3>
            <div class="mb-4 flex flex-wrap gap-2">
                <button
                    v-for="model in availableModels.filter((m) => m.id === 'roneneldan/TinyStories-33M')"
                    :key="model.id"
                    @click="$emit('select-model', model.id)"
                    class="flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
                    :class="[
                        activeModel === model.id
                            ? isDarkMode
                                ? 'bg-blue-700 text-white shadow-md'
                                : 'bg-blue-600 text-white shadow-md'
                            : isDarkMode
                              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              : 'bg-white text-gray-700 shadow-sm hover:bg-gray-100',
                    ]"
                >
                    <span class="h-2 w-2 rounded-full" :class="model.provider === 'nvidia' ? 'bg-green-500' : 'bg-yellow-500'"></span>
                    {{ model.name }}
                </button>
            </div>
            <div class="flex gap-2">
                <input
                    v-model="localMessage"
                    type="text"
                    :class="[
                        'flex-1 rounded-xl border px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2',
                        isDarkMode ? 'border-gray-700 bg-gray-800 text-white focus:ring-purple-500' : 'border-gray-300 focus:ring-blue-500',
                    ]"
                    placeholder="Votre instruction pour continuer l'histoire..."
                    :disabled="!activeModel"
                />
                <button
                    @click="sendPrompt"
                    :class="[
                        'flex items-center justify-center rounded-xl px-5 py-3 text-white transition-all',
                        isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700',
                        !localMessage || !activeModel || loading ? 'cursor-not-allowed opacity-50' : '',
                    ]"
                    :disabled="!localMessage || !activeModel || loading"
                >
                    <span v-if="!loading">Continuer</span>
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
            <p v-if="activeModel === 'roneneldan/TinyStories-33M'" class="mt-2 text-xs text-gray-500">
                * Ce modèle est en anglais, veuillez écrire votre histoire en anglais pour de meilleurs résultats.
            </p>
        </div>
        <HallOfFame :isDarkMode="isDarkMode" />
        <div :class="['mt-4 text-center text-xs', isDarkMode ? 'text-gray-500' : 'text-gray-400']">
            <p>Powered by Nuxt.js | Modèles disponibles via nvidia et Hugging Face</p>
            <p class="mt-1">© 2025 PromptCraft - Version Beta 0.1</p>
        </div>
    </div>
</template>
