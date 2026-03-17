type MockToolStream = {
    toolId: string;
    toolName: string;
    chunks: string[];
};

const createOllamaChunks = (text: string): string[] => {
    const tokens = text.match(/.{1,12}(\s|$)|\S+/g) || [text];

    const chunkStrings = tokens.map((token) =>
        JSON.stringify({
            model: 'qwen2.5:7b',
            created_at: new Date().toISOString(),
            message: {
                role: 'assistant',
                content: token,
            },
            done: false,
        }),
    );

    chunkStrings.push(
        JSON.stringify({
            model: 'qwen2.5:7b',
            created_at: new Date().toISOString(),
            message: {
                role: 'assistant',
                content: '',
            },
            done: true,
            done_reason: 'stop',
        }),
    );

    return chunkStrings;
};

export const buildMockToolStreams = (
    name: string,
    url: string,
): MockToolStream[] => {
    return [
        {
            toolId: 'crawl',
            toolName: 'Crawler',
            chunks: createOllamaChunks(
                `Fetching affiliate page for ${name}. Opening URL ${url}. Main page loaded successfully. Basic page metadata and visible sections were captured.`,
            ),
        },
        {
            toolId: 'extract',
            toolName: 'Extractor',
            chunks: createOllamaChunks(
                `Scanning the page for affiliate details. Looking for commission, cookie duration, requirements, signup flow, and pricing related sections. Found multiple candidate sections that may contain program information.`,
            ),
        },
        {
            toolId: 'analysis',
            toolName: 'Ollama Analysis',
            chunks: createOllamaChunks(
                `${name} appears to be a structured affiliate program page. The content suggests this program is intended for publishers or partners who want to refer merchants or products. The page likely contains useful information for qualification and payout analysis.`,
            ),
        },
        {
            toolId: 'summary',
            toolName: 'Summary',
            chunks: createOllamaChunks(
                `Summary for ${name}: page fetched, affiliate-related sections detected, and the page looks relevant for deeper extraction. Recommended next step is extracting commission model, cookie window, and application requirements.`,
            ),
        },
    ];
};
