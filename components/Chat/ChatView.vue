<script setup>
    import ModelSelector from './ModelSelector.vue';
    import ChatMessages from './ChatMessages.vue';
    import ChatInput from './ChatInput.vue';

    defineProps({
        messages: Array,
        loading: Boolean,
        message: String,
        activeModel: String,
        secondaryModel: String,
        duelMode: Boolean,
        isDarkMode: Boolean,
        availableModels: Array,
        selectedTags: Array,
        availableTags: Array,
    });

    const emit = defineEmits(['send-prompt', 'select-model', 'save-to-library', 'toggle-tag', 'update:message']);

    const handleSelectModel = (modelId, isSecondary = false) => {
        emit('select-model', modelId, isSecondary);
    };
</script>

<template>
    <div>
        <ModelSelector
            :duelMode="duelMode"
            :activeModel="activeModel"
            :secondaryModel="secondaryModel"
            :availableModels="availableModels"
            :isDarkMode="isDarkMode"
            @select-model="handleSelectModel"
        />

        <ChatMessages :messages="messages" :loading="loading" :duelMode="duelMode" :isDarkMode="isDarkMode" :availableModels="availableModels" />

        <ChatInput
            :message="message"
            :activeModel="activeModel"
            :secondaryModel="secondaryModel"
            :duelMode="duelMode"
            :loading="loading"
            :isDarkMode="isDarkMode"
            :selectedTags="selectedTags"
            :availableTags="availableTags"
            @send-prompt="emit('send-prompt')"
            @save-to-library="emit('save-to-library')"
            @toggle-tag="(tag) => emit('toggle-tag', tag)"
            @update:message="(value) => emit('update:message', value)"
        />
    </div>
</template>
