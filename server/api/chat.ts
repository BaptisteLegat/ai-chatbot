import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';

async function queryHuggingFace(model: string, message: string, apiKey: string) {
    try {
        const client = new InferenceClient(apiKey);

        if (model === 'roneneldan/TinyStories-33M') {
            const output = await client.textGeneration({
                model,
                inputs: message,
                provider: 'hf-inference',
            });
            return { choices: [{ message: { content: output.generated_text, role: 'assistant' } }] };
        }

        if (model === 'microsoft/Phi-3.5-MoE-instruct') {
            const chatCompletion = await client.chatCompletion({
                provider: 'nebius',
                model,
                messages: [{ role: 'user', content: message }],
                max_tokens: 500,
            });
            return chatCompletion;
        }

        throw new Error('Modèle Hugging Face non supporté');
    } catch (error) {
        console.error('❌ Erreur API Hugging Face :', error);
        throw error;
    }
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const NVIDIA_API_KEY = config.nvidiaNimApiKey;
    const HUGGING_FACE_API_KEY = config.huggingFaceApiKey;

    if (!NVIDIA_API_KEY || !HUGGING_FACE_API_KEY) {
        setResponseStatus(event, 500);
        return { error: 'API keys are missing' };
    }

    const body = await readBody(event);
    const { model, message } = body;

    if (!model || !message) {
        setResponseStatus(event, 400);
        return { error: 'Missing model or message' };
    }

    try {
        if (model.startsWith('meta/') || model.startsWith('mistralai/') || model.startsWith('nvidia/')) {
            const openai = new OpenAI({
                apiKey: NVIDIA_API_KEY,
                baseURL: 'https://integrate.api.nvidia.com/v1',
            });

            const completion = await openai.chat.completions.create({
                model,
                messages: [{ role: 'user', content: message }],
                temperature: 0.7,
                top_p: 0.7,
                max_tokens: 1024,
            });

            return completion;
        } else {
            return await queryHuggingFace(model, message, HUGGING_FACE_API_KEY);
        }
    } catch (error) {
        console.error('❌ Erreur API :', error);
        setResponseStatus(event, 500);
        return { error: 'Failed to fetch response from API' };
    }
});
