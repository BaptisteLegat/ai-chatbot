import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const API_KEY = config.nvidiaNimApiKey as string;

    if (!API_KEY) {
        setResponseStatus(event, 500);
        return { error: 'API key is missing' };
    }

    const body = await readBody(event);
    const { model, message } = body;

    if (!model || !message) {
        setResponseStatus(event, 400);
        return { error: 'Missing model or message' };
    }

    const openai = new OpenAI({
        apiKey: API_KEY,
        baseURL: 'https://integrate.api.nvidia.com/v1',
    });

    try {
        const completion = await openai.chat.completions.create({
            model: model,
            messages: [{ role: 'user', content: message }],
            temperature: 0.7,
            top_p: 0.7,
            max_tokens: 1024,
        });

        return completion;
    } catch (error) {
        console.error('❌ Erreur API NVIDIA :', error);
        setResponseStatus(event, 500);
        return { error: 'Failed to fetch response from NVIDIA NIM' };
    }
});
