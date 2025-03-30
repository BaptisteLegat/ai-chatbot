<script setup>
    import { ref, nextTick } from 'vue';
    import ChatHeader from '@/components/Chat/ChatHeader.vue';
    import ViewTabs from '@/components/Tabs/ViewTabs.vue';
    import ChatView from '@/components/Chat/ChatView.vue';
    import DiscoverView from '@/components/Discover/DiscoverView.vue';
    import StoryView from '@/components/Story/StoryView.vue';

    const chatMessages = ref([
        {
            role: 'AI',
            message: 'Salut ! Je suis votre assistant IA. Sélectionnez un modèle pour commencer.',
            model: 'system',
        },
    ]);

    const storyMessages = ref([]);

    const loading = ref(false);
    const message = ref('');
    const activeModel = ref(null);
    const secondaryModel = ref(null);
    const duelMode = ref(false);
    const currentView = ref('chat');
    const isDarkMode = ref(false);
    const promptLibrary = ref([
        {
            id: 1,
            title: "Histoire d'aventure",
            prompt: "Raconte-moi une histoire d'aventure avec un dragon et un chevalier",
            tags: ['Créatif', 'Histoire'],
            author: 'Sophie',
            likes: 24,
        },
        {
            id: 2,
            title: 'Explication scientifique',
            prompt: 'Explique-moi comment fonctionne la photosynthèse en termes simples',
            tags: ['Éducatif', 'Science'],
            author: 'Marc',
            likes: 18,
        },
        {
            id: 3,
            title: 'Poème sur la nature',
            prompt: 'Écris un poème sur la beauté des montagnes',
            tags: ['Créatif', 'Poésie'],
            author: 'Julie',
            likes: 31,
        },
        {
            id: 4,
            title: 'Blague informatique',
            prompt: 'Raconte une blague sur les programmeurs',
            tags: ['Humour', 'Informatique'],
            author: 'Thomas',
            likes: 15,
        },
    ]);
    const storyMode = ref(false);
    const storyContent = ref('');
    const storyTitle = ref('');

    const availableModels = [
        { id: 'meta/llama-3.1-8b-instruct', name: 'LLaMA 3.1 (9B)', provider: 'nvidia' },
        { id: 'mistralai/mistral-7b-instruct-v0.3', name: 'Mistral 7B (V0.3)', provider: 'nvidia' },
        { id: 'nvidia/nemotron-mini-4b-instruct', name: 'Nvidia Nemotron Mini', provider: 'nvidia' },
        { id: 'roneneldan/TinyStories-33M', name: 'TinyStories', provider: 'hugging_face' },
        { id: 'microsoft/Phi-3.5-MoE-instruct', name: 'Phi-3.5', provider: 'hugging_face' },
    ];

    const availableTags = ref(['Créatif', 'Code', 'Histoire', 'Science', 'Éducatif', 'Humour', 'Poésie', 'Informatique']);
    const selectedTags = ref([]);

    const scrollToEnd = () => {
        nextTick(() => {
            const container = document.querySelector('.chat-messages');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        });
    };

    const generateResponse = async (modelId, messagesHistory) => {
        try {
            const lastUserMessage = messagesHistory
                .slice()
                .reverse()
                .find((m) => m.role === 'user');
            const prompt = lastUserMessage?.message || message.value;

            const response = await $fetch('/api/chat', {
                method: 'POST',
                body: { model: modelId, message: prompt },
            });

            return response.choices?.[0]?.message?.content || "❌ Pas de réponse de l'IA.";
        } catch (error) {
            console.error('Erreur API :', error);
            return "❌ Une erreur est survenue avec l'API.";
        }
    };

    const sendPrompt = async () => {
        if (!message.value || (!activeModel.value && !duelMode.value)) return;

        loading.value = true;

        if (currentView.value === 'story') {
            storyMessages.value.push({
                role: 'user',
                message: message.value,
                model: null,
            });
        } else {
            chatMessages.value.push({
                role: 'user',
                message: message.value,
                model: null,
            });
        }

        scrollToEnd();

        try {
            if (duelMode.value) {
                const [model1, model2] = [activeModel.value, secondaryModel.value];
                const [response1, response2] = await Promise.all([
                    generateResponse(model1, currentView.value === 'story' ? storyMessages.value : chatMessages.value),
                    generateResponse(model2, currentView.value === 'story' ? storyMessages.value : chatMessages.value),
                ]);

                const targetMessages = currentView.value === 'story' ? storyMessages : chatMessages;
                targetMessages.value.push(
                    {
                        role: 'AI',
                        message: response1,
                        model: model1,
                    },
                    {
                        role: 'AI',
                        message: response2,
                        model: model2,
                    }
                );
            } else {
                const response = await generateResponse(activeModel.value, currentView.value === 'story' ? storyMessages.value : chatMessages.value);

                if (currentView.value === 'story') {
                    storyMessages.value.push({
                        role: 'AI',
                        message: response,
                        model: activeModel.value,
                    });
                    storyContent.value += '\n\n' + response;
                } else {
                    chatMessages.value.push({
                        role: 'AI',
                        message: response,
                        model: activeModel.value,
                    });
                }
            }

            scrollToEnd();
            message.value = '';
        } catch (error) {
            console.error('Error:', error);
            const targetMessages = currentView.value === 'story' ? storyMessages : chatMessages;
            targetMessages.value.push({
                role: 'AI',
                message: "Désolé, une erreur s'est produite. Veuillez réessayer.",
                model: 'system',
            });
            scrollToEnd();
        } finally {
            loading.value = false;
        }
    };

    const selectModel = (modelId, isSecondary = false) => {
        if (duelMode.value) {
            if (isSecondary && modelId === activeModel.value) return;
            if (!isSecondary && modelId === secondaryModel.value) return;
        }

        if (isSecondary) {
            secondaryModel.value = modelId;
        } else {
            activeModel.value = modelId;
            if (!duelMode.value) {
                const targetMessages = currentView.value === 'story' ? storyMessages : chatMessages;
                const lastMessage = targetMessages.value[targetMessages.value.length - 1];
                if (
                    !lastMessage ||
                    lastMessage.message !== `Modèle ${availableModels.find((m) => m.id === modelId).name} sélectionné. Posez-moi une question !`
                ) {
                    targetMessages.value.push({
                        role: 'AI',
                        message: `Modèle ${availableModels.find((m) => m.id === modelId).name} sélectionné. Posez-moi une question !`,
                        model: 'system',
                    });
                    scrollToEnd();
                }
            }
        }

        if (duelMode.value && activeModel.value && secondaryModel.value) {
            const targetMessages = currentView.value === 'story' ? storyMessages : chatMessages;
            const lastMessage = targetMessages.value[targetMessages.value.length - 1];
            const expectedMessage = `Duel configuré : ${availableModels.find((m) => m.id === activeModel.value).name} vs ${availableModels.find((m) => m.id === secondaryModel.value).name}. Entrez votre prompt pour voir les deux réponses !`;

            if (!lastMessage || lastMessage.message !== expectedMessage) {
                targetMessages.value.push({
                    role: 'AI',
                    message: expectedMessage,
                    model: 'system',
                });
                scrollToEnd();
            }
        }
    };

    const toggleDuelMode = () => {
        duelMode.value = !duelMode.value;
        activeModel.value = null;
        secondaryModel.value = null;

        const targetMessages = currentView.value === 'story' ? storyMessages : chatMessages;

        if (duelMode.value) {
            targetMessages.value = [
                {
                    role: 'AI',
                    message: 'Mode Duel activé ! Sélectionnez deux modèles à comparer.',
                    model: 'system',
                },
            ];
        } else {
            targetMessages.value = [
                {
                    role: 'AI',
                    message: 'Mode Duel désactivé. Sélectionnez un modèle pour continuer.',
                    model: 'system',
                },
            ];
        }
    };

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
    };

    const changeView = (view) => {
        currentView.value = view;
        if (view === 'story') {
            storyMode.value = true;
            if (!storyTitle.value) storyTitle.value = 'Mon histoire';
            if (!storyContent.value) storyContent.value = 'Once upon a time...';
        } else {
            storyMode.value = false;
        }
    };

    const usePromptFromLibrary = (prompt) => {
        message.value = prompt;
        currentView.value = 'chat';
    };

    const saveToPromptLibrary = () => {
        if (message.value) {
            const newPrompt = {
                id: promptLibrary.value.length + 1,
                title: `Prompt #${promptLibrary.value.length + 1}`,
                prompt: message.value,
                tags: selectedTags.value.length ? [...selectedTags.value] : ['Général'],
                author: 'Vous',
                likes: 0,
            };
            promptLibrary.value.push(newPrompt);
            alert('Prompt ajouté à la bibliothèque !');
        }
    };

    const exportStory = () => {
        const blob = new Blob([storyContent.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${storyTitle.value || 'histoire'}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const toggleTag = (tag) => {
        if (selectedTags.value.includes(tag)) {
            selectedTags.value = selectedTags.value.filter((t) => t !== tag);
        } else {
            selectedTags.value = [...selectedTags.value, tag];
        }
    };

    const likePrompt = (promptId) => {
        const prompt = promptLibrary.value.find((p) => p.id === promptId);
        if (prompt) prompt.likes++;
    };
</script>
<template>
    <div
        :class="['min-h-screen transition-colors duration-300', isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100']"
    >
        <div class="px-4 py-8">
            <div class="mx-auto max-w-5xl">
                <ChatHeader :isDarkMode="isDarkMode" :duelMode="duelMode" @toggle-dark-mode="toggleDarkMode" @toggle-duel-mode="toggleDuelMode" />
                <ViewTabs :currentView="currentView" :isDarkMode="isDarkMode" @change-view="changeView" />
                <div :class="['overflow-hidden rounded-xl shadow-xl', isDarkMode ? 'bg-gray-800' : 'bg-white']">
                    <ChatView
                        v-if="currentView === 'chat'"
                        :messages="chatMessages"
                        :loading="loading"
                        :message="message"
                        :activeModel="activeModel"
                        :secondaryModel="secondaryModel"
                        :duelMode="duelMode"
                        :isDarkMode="isDarkMode"
                        :availableModels="availableModels"
                        :selectedTags="selectedTags"
                        :availableTags="availableTags"
                        @send-prompt="sendPrompt"
                        @select-model="selectModel"
                        @save-to-library="saveToPromptLibrary"
                        @toggle-tag="toggleTag"
                        @update:message="(val) => (message = val)"
                    />
                    <DiscoverView
                        v-if="currentView === 'discover'"
                        :promptLibrary="promptLibrary"
                        :selectedTags="selectedTags"
                        :availableTags="availableTags"
                        :isDarkMode="isDarkMode"
                        @use-prompt="usePromptFromLibrary"
                        @toggle-tag="toggleTag"
                        @like-prompt="likePrompt"
                    />
                    <StoryView
                        v-if="currentView === 'story'"
                        :storyTitle="storyTitle"
                        :storyContent="storyContent"
                        :message="message"
                        :activeModel="activeModel"
                        :loading="loading"
                        :isDarkMode="isDarkMode"
                        :availableModels="availableModels"
                        :messages="storyMessages"
                        @export-story="exportStory"
                        @select-model="selectModel"
                        @send-prompt="sendPrompt"
                        @update:story-title="(val) => (storyTitle = val)"
                        @update:story-content="(val) => (storyContent = val)"
                        @update:message="(val) => (message = val)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
