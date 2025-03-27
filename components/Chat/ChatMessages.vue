<script setup>
    defineProps({
        messages: Array,
        loading: Boolean,
        duelMode: Boolean,
        isDarkMode: Boolean,
        availableModels: Array,
    });
</script>
<template>
    <div class="chat-messages h-[50vh] space-y-4 overflow-y-auto p-4">
        <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex w-full gap-4"
            :class="[
                duelMode && msg.role === 'AI' ? 'items-start' : '',
                msg.role === 'AI' ? (msg.duelId === 'model2' ? 'justify-end' : 'justify-start') : 'justify-end',
            ]"
        >
            <div v-if="msg.model === 'system'" class="w-full text-center">
                <span
                    class="inline-block rounded-full px-3 py-1 text-xs font-medium"
                    :class="isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'"
                >
                    {{ msg.message }}
                </span>
            </div>
            <div
                v-else
                class="max-w-[80%] rounded-2xl px-4 py-3 shadow-md"
                :class="[
                    msg.role === 'AI'
                        ? msg.duelId === 'model2'
                            ? 'rounded-tl-lg rounded-tr-none bg-purple-200 text-purple-900'
                            : 'rounded-tl-none rounded-tr-lg bg-blue-200 text-blue-900'
                        : isDarkMode
                          ? 'rounded-tr-none bg-gray-700 text-white'
                          : 'rounded-tr-none bg-gray-200 text-gray-800',
                ]"
                :style="duelMode && msg.role === 'AI' ? 'max-width: 45%' : ''"
            >
                <div v-if="msg.role === 'AI'" class="mb-1 flex items-center gap-2">
                    <span class="text-xs font-medium text-gray-500">
                        {{ availableModels.find((m) => m.id === msg.model)?.name }}
                    </span>
                </div>
                <div class="prose prose-sm max-w-none" :class="isDarkMode ? 'prose-invert' : ''">
                    {{ msg.message }}
                </div>
            </div>
        </div>
        <div v-if="loading" class="flex justify-center py-4">
            <div class="flex space-x-2">
                <div class="h-3 w-3 animate-bounce rounded-full" :class="isDarkMode ? 'bg-blue-400' : 'bg-blue-500'"></div>
                <div class="h-3 w-3 animate-bounce rounded-full delay-100" :class="isDarkMode ? 'bg-blue-400' : 'bg-blue-500'"></div>
                <div class="h-3 w-3 animate-bounce rounded-full delay-200" :class="isDarkMode ? 'bg-blue-400' : 'bg-blue-500'"></div>
            </div>
        </div>
    </div>
</template>
