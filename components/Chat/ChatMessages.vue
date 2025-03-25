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
            :class="[
                'flex',
                msg.role === 'AI' ? (msg.duelId === 'model2' ? 'justify-end' : 'justify-start') : 'justify-end',
                duelMode && msg.role === 'AI' && !msg.duelId ? 'w-full justify-center' : '',
                msg.model === 'system' ? 'w-full justify-center' : '',
            ]"
        >
            <div v-if="msg.model === 'system'" class="mb-2 w-full text-center">
                <span
                    :class="[
                        'inline-block rounded-full px-3 py-1 text-xs font-medium',
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500',
                    ]"
                >
                    {{ msg.message }}
                </span>
            </div>
            <div
                v-else
                :class="[
                    'max-w-[80%] rounded-2xl px-4 py-3',
                    msg.role === 'AI'
                        ? [
                              'rounded-tl-none',
                              isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800',
                              msg.duelId === 'model2' ? 'rounded-tl-lg rounded-tr-none !bg-purple-100 !text-purple-900' : '',
                              msg.duelId === 'model1' ? '!bg-blue-100 !text-blue-900' : '',
                          ]
                        : ['rounded-tr-none', isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'],
                ]"
                :style="duelMode && msg.role === 'AI' ? 'max-width: 45%' : ''"
            >
                <div v-if="msg.role === 'AI'" :class="['mb-1 flex items-center gap-2', msg.duelId === 'model2' ? 'justify-end' : '']">
                    <span :class="['text-xs font-medium', isDarkMode ? 'text-gray-400' : 'text-gray-500']">
                        {{ availableModels.find((m) => m.id === msg.model)?.name }}
                    </span>
                </div>
                <div :class="['prose prose-sm max-w-none', isDarkMode ? 'prose-invert' : '']">
                    {{ msg.message }}
                </div>
                <div v-if="duelMode && msg.role === 'AI'" class="mt-2 text-right">
                    <button
                        class="rounded-full p-1 text-xs"
                        :class="isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'"
                    >
                        👍 Vote
                    </button>
                </div>
            </div>
        </div>
        <div v-if="loading" class="flex justify-center py-4">
            <div class="flex space-x-2">
                <div :class="['h-3 w-3 animate-bounce rounded-full', isDarkMode ? 'bg-blue-400' : 'bg-blue-500']"></div>
                <div :class="['h-3 w-3 animate-bounce rounded-full delay-100', isDarkMode ? 'bg-blue-400' : 'bg-blue-500']"></div>
                <div :class="['h-3 w-3 animate-bounce rounded-full delay-200', isDarkMode ? 'bg-blue-400' : 'bg-blue-500']"></div>
            </div>
        </div>
    </div>
</template>
