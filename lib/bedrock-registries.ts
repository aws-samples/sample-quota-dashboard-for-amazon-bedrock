// Bedrock Model and Quota Registries
// This file contains the centralized registries for Bedrock model metadata and quota mappings

// Type definitions
export type EndpointType = 'regional' | 'cross-region' | 'global-cross-region';

export interface ModelMetadata {
    outputTokenBurndownRate: number;
}

export interface ModelRegistry {
    [modelId: string]: ModelMetadata;
}

export interface QuotaMapping {
    endpointType: EndpointType;
    tokenQuotaCode: string;
    requestQuotaCode: string;
}

export interface QuotaRegistry {
    [modelId: string]: QuotaMapping[];
}

// Model Registry containing output token burndown rates for each Bedrock model
export const MODEL_REGISTRY: ModelRegistry = {
    // Amazon Nova Models
    'amazon.nova-micro-v1:0': {
        outputTokenBurndownRate: 1
    },
    'amazon.nova-lite-v1:0': {
        outputTokenBurndownRate: 1
    },
    'amazon.nova-pro-v1:0': {
        outputTokenBurndownRate: 1
    },
    'amazon.nova-premier-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Amazon Nova 2 Models
    'amazon.nova-2-lite-v1:0': {
        outputTokenBurndownRate: 1
    },
    'amazon.nova-2-pro-preview-v1:0': {
        outputTokenBurndownRate: 1
    },
    'amazon.nova-2-omni-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Anthropic Claude 3 Models
    'anthropic.claude-3-haiku-20240307-v1:0': {
        outputTokenBurndownRate: 1
    },
    'anthropic.claude-3-sonnet-20240229-v1:0': {
        outputTokenBurndownRate: 1
    },
    'anthropic.claude-3-opus-20240229-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Anthropic Claude 3.5 Models
    'anthropic.claude-3-5-sonnet-20240620-v1:0': {
        outputTokenBurndownRate: 1
    },
    'anthropic.claude-3-5-sonnet-20241022-v2:0': {
        outputTokenBurndownRate: 1
    },
    'anthropic.claude-3-5-haiku-20241022-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Anthropic Claude 3.7 Models (5x output token burndown rate)
    'anthropic.claude-3-7-sonnet-20250219-v1:0': {
        outputTokenBurndownRate: 5
    },

    // Anthropic Claude 4 Models (5x output token burndown rate for Opus 4 and Sonnet 4.5)
    'anthropic.claude-haiku-4-5-20251001-v1:0': {
        outputTokenBurndownRate: 5
    },
    'anthropic.claude-sonnet-4-20250514-v1:0': {
        outputTokenBurndownRate: 5
    },
    'anthropic.claude-sonnet-4-5-20250929-v1:0': {
        outputTokenBurndownRate: 5
    },
    'anthropic.claude-sonnet-4-5-v1-1m-20250929-v1:0': { // Synthetic model ID - used to differentiate 1M context variant from standard version
        outputTokenBurndownRate: 5
    },
    'anthropic.claude-opus-4-20250514-v1:0': {
        outputTokenBurndownRate: 5
    },
    'anthropic.claude-opus-4-1-20250805-v1:0': {
        outputTokenBurndownRate: 5
    },
    'anthropic.claude-opus-4-5-20251001-v1:0': {
        outputTokenBurndownRate: 5
    },

    // Amazon Titan Text Models
    'amazon.titan-text-lite-v1': {
        outputTokenBurndownRate: 1
    },
    'amazon.titan-text-express-v1': {
        outputTokenBurndownRate: 1
    },
    'amazon.titan-text-premier-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Meta Llama Models
    'meta.llama2-13b-chat-v1': {
        outputTokenBurndownRate: 1
    },
    'meta.llama2-70b-chat-v1': {
        outputTokenBurndownRate: 1
    },
    'meta.llama2-chat-13b-v1': {
        outputTokenBurndownRate: 1
    },
    'meta.llama2-chat-70b-v1': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-8b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-70b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-2-1b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-2-3b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-2-11b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-2-90b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-1-8b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-1-70b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama3-3-70b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Meta Llama 4 Models
    'meta.llama4-scout-17b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'meta.llama4-maverick-17b-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Mistral Models
    'mistral.mistral-7b-instruct-v0:2': {
        outputTokenBurndownRate: 1
    },
    'mistral.mistral-small-2402-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.mistral-large-2402-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.mistral-large-2407-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.mistral-large-3-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.pixtral-large-2502-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.ministral-3b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.ministral-8b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.ministral-14b-v1:0': {
        outputTokenBurndownRate: 1
    },
        'mistral.voxtral-mini-v1:0': {
        outputTokenBurndownRate: 1
    },
    'mistral.voxtral-small-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Cohere Models
    'cohere.command-r-v1:0': {
        outputTokenBurndownRate: 1
    },
    'cohere.command-r-plus-v1:0': {
        outputTokenBurndownRate: 1
    },
    'cohere.embed-english-v3': {
        outputTokenBurndownRate: 1
    },
    'cohere.embed-multilingual-v3': {
        outputTokenBurndownRate: 1
    },
    'cohere.embed-v4': {
        outputTokenBurndownRate: 1
    },

    // AI21 Labs Models
    'ai21.jamba-instruct-v1:0': {
        outputTokenBurndownRate: 1
    },
    'ai21.jamba-1-5-large-v1:0': {
        outputTokenBurndownRate: 1
    },
    'ai21.jamba-1-5-mini-v1:0': {
        outputTokenBurndownRate: 1
    },
    'ai21.j2-ultra-v1': {
        outputTokenBurndownRate: 1
    },
    'ai21.j2-mid-v1': {
        outputTokenBurndownRate: 1
    },

    // DeepSeek Models
    'deepseek.deepseek-r1-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Qwen Models
    'qwen.qwen3-next-80b-a3b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'qwen.qwen3-32b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'qwen.qwen3-coder-30b-a3b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'qwen.qwen3-vl-235b-a22b-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Google Gemma Models
    'google.gemma-3-4b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'google.gemma-3-12b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'google.gemma-3-27b-v1:0': {
        outputTokenBurndownRate: 1
    },

    // NVIDIA Models
    'nvidia.nemotron-nano-2-v1:0': {
        outputTokenBurndownRate: 1
    },
    'nvidia.nemotron-nano-2-vl-v1:0': {
        outputTokenBurndownRate: 1
    },

    // OpenAI GPT OSS Models
    'openai.gpt-oss-20b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'openai.gpt-oss-120b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'openai.gpt-oss-safeguard-20b-v1:0': {
        outputTokenBurndownRate: 1
    },
    'openai.gpt-oss-safeguard-120b-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Kimi Models
    'kimi.k2-thinking-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Minimax Models
    'minimax.m2-v1:0': {
        outputTokenBurndownRate: 1
    },

    // Magistral Models
    'magistral.small-1-2-v1:0': {
        outputTokenBurndownRate: 1
    }
};

// Quota Registry with quota codes mapped to endpoint types and quota types
// Uses clear terminology with 'cross-region' instead of 'CRIS'
export const QUOTA_REGISTRY: QuotaRegistry = {
    // Amazon Nova Models
    'amazon.nova-micro-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-CFA4FA0D', requestQuotaCode: 'L-E118F160' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-DC7FF66C', requestQuotaCode: 'L-3F110E0F' }
    ],
    'amazon.nova-lite-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-70423BF8', requestQuotaCode: 'L-E386A278' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-7C42E72A', requestQuotaCode: 'L-89F8391A' }
    ],
    'amazon.nova-pro-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-CE33604C', requestQuotaCode: 'L-F2717A44' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-C0326783', requestQuotaCode: 'L-ED46B8C5' }
    ],
    'amazon.nova-premier-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-AA7FE948', requestQuotaCode: 'L-9AD981E7' }
    ],

    // Amazon Nova 2 Models
    'amazon.nova-2-lite-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-C6F5908D', requestQuotaCode: 'L-F06F1187' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-71C69B70', requestQuotaCode: 'L-D5F39C2F' }
    ],
    'amazon.nova-2-pro-preview-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-F0AF140A', requestQuotaCode: 'L-3B97F1DC' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-6B796A8E', requestQuotaCode: 'L-A3425ABD' }
    ],
    'amazon.nova-2-omni-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-2438ED67', requestQuotaCode: 'L-91A570FD' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-21800074', requestQuotaCode: 'L-DCD79770' }
    ],

    // Anthropic Claude 3 Models
    'anthropic.claude-3-haiku-20240307-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-8CE99163', requestQuotaCode: 'L-2DC80978' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-DCADBC78', requestQuotaCode: 'L-616A3F5B' }
    ],
    'anthropic.claude-3-sonnet-20240229-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-4C35BB2A', requestQuotaCode: 'L-F406804E' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-5DF13F64', requestQuotaCode: 'L-46591118' }
    ],
    'anthropic.claude-3-opus-20240229-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-27477D78', requestQuotaCode: 'L-8050DFC8' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-6C86825E', requestQuotaCode: 'L-EB15245D' }
    ],

    // Anthropic Claude 3.5 Models
    'anthropic.claude-3-5-sonnet-20240620-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-A50569E5', requestQuotaCode: 'L-254CACF4' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-479B647F', requestQuotaCode: 'L-F457545D' }
    ],
    'anthropic.claude-3-5-sonnet-20241022-v2:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-AD41C330', requestQuotaCode: 'L-79E773B3' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-FF8B4E28', requestQuotaCode: 'L-1D3E59A3' }
    ],
    'anthropic.claude-3-5-haiku-20241022-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-7AB4ABDD', requestQuotaCode: 'L-C7438F8F' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-4BF37C17', requestQuotaCode: 'L-252DF594' }
    ],

    // Anthropic Claude 3.7 Models (cross-region only)
    'anthropic.claude-3-7-sonnet-20250219-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-6E888CC2', requestQuotaCode: 'L-3D8CC480' }
    ],

    // Anthropic Claude 4 Models
    'anthropic.claude-haiku-4-5-20251001-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-58BE175A', requestQuotaCode: 'L-CCA5DF70' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-9A11C666', requestQuotaCode: 'L-E5084BBA' }
    ],
    'anthropic.claude-sonnet-4-20250514-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-59759B4A', requestQuotaCode: 'L-559DCC33' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-97E41E39', requestQuotaCode: 'L-C63AA5DA' }
    ],
    'anthropic.claude-sonnet-4-5-20250929-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-F4DDD3EB', requestQuotaCode: 'L-4A6BFAB1' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-27C57EE8', requestQuotaCode: 'L-DB84CE56' }
    ],
    'anthropic.claude-sonnet-4-5-v1-1m-20250929-v1:0': [ // Synthetic model ID - used to differentiate 1M context variant from standard version
        { endpointType: 'cross-region', tokenQuotaCode: 'L-8EA73537', requestQuotaCode: 'L-A052927A' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-4B26E44A', requestQuotaCode: 'L-C0D53EFB' }
    ],
    'anthropic.claude-opus-4-20250514-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-29C2B0A3', requestQuotaCode: 'L-C99C7EF6' }
    ],
    'anthropic.claude-opus-4-1-20250805-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-BD85BFCD', requestQuotaCode: 'L-7EC72A47' }
    ],
    'anthropic.claude-opus-4-5-20251001-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-7007E9C9', requestQuotaCode: 'L-27989F42' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-3ABF6ACC', requestQuotaCode: 'L-58424D95' }
    ],

    // Amazon Titan Text Models
    'amazon.titan-text-lite-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-70BE83E9', requestQuotaCode: 'L-A70F1DE3' }
    ],
    'amazon.titan-text-express-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-44992E63', requestQuotaCode: 'L-9EAB0D12' }
    ],
    'amazon.titan-text-premier-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-96616D9A', requestQuotaCode: 'L-F6E7D163' }
    ],

    // Meta Llama Models
    'meta.llama2-13b-chat-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-D9F0CC0D', requestQuotaCode: 'L-0700C8EB' }
    ],
    'meta.llama2-70b-chat-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-247B684D', requestQuotaCode: 'L-D5C2E582' }
    ],
    'meta.llama2-chat-13b-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-6DB35E51', requestQuotaCode: 'L-674F621D' }
    ],
    'meta.llama2-chat-70b-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-B05C5C8E', requestQuotaCode: 'L-D11DCD9B' }
    ],
    'meta.llama3-8b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-03A9B835', requestQuotaCode: 'L-320BEFEB' }
    ],
    'meta.llama3-70b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-609E24B0', requestQuotaCode: 'L-46D383AF' }
    ],
    'meta.llama3-2-1b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-6F14193C', requestQuotaCode: 'L-20CFCD61' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-BD9FDA6F', requestQuotaCode: 'L-A31D2B40' }
    ],
    'meta.llama3-2-3b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-A7EDC29B', requestQuotaCode: 'L-2F9B4FC2' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-0B2687F4', requestQuotaCode: 'L-6B0A9FAD' }
    ],
    'meta.llama3-2-11b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-E2D0B19E', requestQuotaCode: 'L-53CCF898' }
    ],
    'meta.llama3-2-90b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-41C63FF8', requestQuotaCode: 'L-EBDED838' }
    ],
    'meta.llama3-1-8b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-9E79C230', requestQuotaCode: 'L-19A2ED6C' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-9782749C', requestQuotaCode: 'L-396C5302' }
    ],
    'meta.llama3-1-70b-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-48E55E59', requestQuotaCode: 'L-ECA5B974' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-92E68994', requestQuotaCode: 'L-29644EB3' }
    ],
    'meta.llama3-3-70b-instruct-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-0E7AA8B7', requestQuotaCode: 'L-DEDE703C' }
    ],

    // Meta Llama 4 Models (cross-region only)
    'meta.llama4-scout-17b-instruct-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-532E6630', requestQuotaCode: 'L-751B753A' }
    ],
    'meta.llama4-maverick-17b-instruct-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-DE3FBBF4', requestQuotaCode: 'L-4F18EF2F' }
    ],

    // Mistral Models
    'mistral.mistral-7b-instruct-v0:2': [
        { endpointType: 'regional', tokenQuotaCode: 'L-02D831F1', requestQuotaCode: 'L-D9A35062' }
    ],
    'mistral.mistral-small-2402-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-82C15FA8', requestQuotaCode: 'L-1CBB0490' }
    ],
    'mistral.mistral-large-2402-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-01447289', requestQuotaCode: 'L-3AF844DB' }
    ],
    'mistral.mistral-large-2407-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-01447289', requestQuotaCode: 'L-3AF844DB' }
    ],
    'mistral.mistral-large-3-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-C709F563', requestQuotaCode: 'L-5B274E24' }
    ],
    'mistral.pixtral-large-2502-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-4B9F76B0', requestQuotaCode: 'L-674F42D5' }
    ],
    'mistral.ministral-3b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-8A4BEE90', requestQuotaCode: 'L-DCA37E91' }
    ],
    'mistral.ministral-8b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-3B98F300', requestQuotaCode: 'L-2BDF9A55' }
    ],
    'mistral.ministral-14b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-334E5409', requestQuotaCode: 'L-99F7BDBC' }
    ],
        'mistral.voxtral-mini-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-0B767044', requestQuotaCode: 'L-17AE85BD' }
    ],
    'mistral.voxtral-small-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-930E2896', requestQuotaCode: 'L-ACB2FB6A' }
    ],

    // Cohere Models
    'cohere.command-r-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-17F95AA4', requestQuotaCode: 'L-A49CA90F' }
    ],
    'cohere.command-r-plus-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-FEE1DCB6', requestQuotaCode: 'L-ADB4B3D7' }
    ],
    'cohere.embed-english-v3': [
        { endpointType: 'regional', tokenQuotaCode: 'L-A2BE277A', requestQuotaCode: 'L-FF8E7864' }
    ],
    'cohere.embed-multilingual-v3': [
        { endpointType: 'regional', tokenQuotaCode: 'L-C2F86908', requestQuotaCode: 'L-9E5BD0C6' }
    ],
    'cohere.embed-v4': [
        { endpointType: 'regional', tokenQuotaCode: 'L-C47B85D5', requestQuotaCode: 'L-BE5FD99B' },
        { endpointType: 'cross-region', tokenQuotaCode: 'L-4C3F0FE6', requestQuotaCode: 'L-EB8C1F30' },
        { endpointType: 'global-cross-region', tokenQuotaCode: 'L-02DFBB76', requestQuotaCode: 'L-7089DC7D' }
    ],

    // AI21 Labs Models
    'ai21.jamba-instruct-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-46D2582A', requestQuotaCode: 'L-40063291' }
    ],
    'ai21.jamba-1-5-large-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-CFAB19FF', requestQuotaCode: 'L-F4CAA0FD' }
    ],
    'ai21.jamba-1-5-mini-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-5A778346', requestQuotaCode: 'L-0449ADC5' }
    ],
    'ai21.j2-ultra-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-A4F5E139', requestQuotaCode: 'L-A48E31B4' }
    ],
    'ai21.j2-mid-v1': [
        { endpointType: 'regional', tokenQuotaCode: 'L-ABEE1010', requestQuotaCode: 'L-75D9A33A' }
    ],

    // DeepSeek Models
    'deepseek.deepseek-r1-v1:0': [
        { endpointType: 'cross-region', tokenQuotaCode: 'L-06B03968', requestQuotaCode: 'L-F52323AB' }
    ],

    // Qwen Models
    'qwen.qwen3-next-80b-a3b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-37AB702E', requestQuotaCode: 'L-07B3CEEA' }
    ],
    'qwen.qwen3-32b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-B7C52139', requestQuotaCode: 'L-E880C759' }
    ],
    'qwen.qwen3-coder-30b-a3b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-92F81E14', requestQuotaCode: 'L-66EE6E0B' }
    ],
    'qwen.qwen3-vl-235b-a22b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-46063925', requestQuotaCode: 'L-11B56FB0' }
    ],

    // Google Gemma Models
    'google.gemma-3-4b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-73FB8466', requestQuotaCode: 'L-3056DF33' }
    ],
    'google.gemma-3-12b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-3FD4A73E', requestQuotaCode: 'L-999037CA' }
    ],
    'google.gemma-3-27b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-F8729E94', requestQuotaCode: 'L-5D46C7AF' }
    ],

    // NVIDIA Models
    'nvidia.nemotron-nano-2-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-33D3627D', requestQuotaCode: 'L-AC7B3FB9' }
    ],
    'nvidia.nemotron-nano-2-vl-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-A05A5476', requestQuotaCode: 'L-30B384EA' }
    ],

    // OpenAI GPT OSS Models
    'openai.gpt-oss-20b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-036E14D8', requestQuotaCode: 'L-AF7F0545' }
    ],
    'openai.gpt-oss-120b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-9DC5F595', requestQuotaCode: 'L-25B50707' }
    ],
    'openai.gpt-oss-safeguard-20b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-5D8F2F54', requestQuotaCode: 'L-65833D55' }
    ],
    'openai.gpt-oss-safeguard-120b-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-594C7AC9', requestQuotaCode: 'L-C4E013EF' }
    ],

    // Kimi Models
    'kimi.k2-thinking-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-03579AC2', requestQuotaCode: 'L-02572418' }
    ],

    // Minimax Models
    'minimax.m2-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-A81B7C40', requestQuotaCode: 'L-828C986E' }
    ],

    // Magistral Models
    'magistral.small-1-2-v1:0': [
        { endpointType: 'regional', tokenQuotaCode: 'L-D18AC5F7', requestQuotaCode: 'L-B14A9603' }
    ]
};

// Helper interface for quota codes
export interface QuotaCodes {
    tokenQuotaCode: string;
    requestQuotaCode: string;
}

// Registry lookup helper functions

/**
 * Get quota codes for a specific model and endpoint type
 * @param modelId The base model ID (without endpoint prefixes)
 * @param endpointType The endpoint type to lookup
 * @returns QuotaCodes object or null if not found
 */
export function getQuotaCodes(modelId: string, endpointType: EndpointType): QuotaCodes | null {
    const quotaMappings = QUOTA_REGISTRY[modelId];
    if (!quotaMappings) {
        return null;
    }

    const mapping = quotaMappings.find(m => m.endpointType === endpointType);
    if (!mapping) {
        return null;
    }

    return {
        tokenQuotaCode: mapping.tokenQuotaCode,
        requestQuotaCode: mapping.requestQuotaCode
    };
}

/**
 * Validate that a model supports a specific endpoint type
 * @param modelId The base model ID (without endpoint prefixes)
 * @param endpointType The endpoint type to validate
 * @returns true if the model supports the endpoint type, false otherwise
 */
export function validateModelEndpointSupport(modelId: string, endpointType: EndpointType): boolean {
    const quotaMappings = QUOTA_REGISTRY[modelId];
    if (!quotaMappings) {
        return false;
    }

    return quotaMappings.some(mapping => mapping.endpointType === endpointType);
}

/**
 * Get all supported endpoint types for a model
 * @param modelId The base model ID (without endpoint prefixes)
 * @returns Array of supported endpoint types, empty array if model not found
 */
export function getSupportedEndpointTypes(modelId: string): EndpointType[] {
    const quotaMappings = QUOTA_REGISTRY[modelId];
    if (!quotaMappings) {
        return [];
    }

    return Array.from(new Set(quotaMappings.map(mapping => mapping.endpointType)));
}

/**
 * Check if a model exists in the Model Registry
 * @param modelId The base model ID (without endpoint prefixes)
 * @returns true if model exists in MODEL_REGISTRY, false otherwise
 */
export function isModelInRegistry(modelId: string): boolean {
    return modelId in MODEL_REGISTRY;
}

/**
 * Check if a model has any quota mappings
 * @param modelId The base model ID (without endpoint prefixes)
 * @returns true if model has quota mappings in QUOTA_REGISTRY, false otherwise
 */
export function hasQuotaMappings(modelId: string): boolean {
    return modelId in QUOTA_REGISTRY && QUOTA_REGISTRY[modelId].length > 0;
}

/**
 * Get detailed error information for missing quota codes
 * @param modelId The base model ID (without endpoint prefixes)
 * @param endpointType The endpoint type to check
 * @returns Detailed error message explaining what's missing
 */
export function getQuotaErrorDetails(modelId: string, endpointType: EndpointType): string {
    if (!hasQuotaMappings(modelId)) {
        return `Model '${modelId}' not found in QUOTA_REGISTRY. Add quota mappings for this model.`;
    }

    const supportedTypes = getSupportedEndpointTypes(modelId);
    if (supportedTypes.length === 0) {
        return `Model '${modelId}' has no quota mappings in QUOTA_REGISTRY.`;
    }

    if (!supportedTypes.includes(endpointType)) {
        return `Model '${modelId}' does not support endpoint type '${endpointType}'. Supported types: ${supportedTypes.join(', ')}`;
    }

    return `Quota codes found but lookup failed for model '${modelId}' with endpoint type '${endpointType}'.`;
}

// Registry validation functions

/**
 * Validate quota code format (L-xxxxxxxx pattern)
 * @param quotaCode The quota code to validate
 * @returns true if quota code matches L-xxxxxxxx pattern, false otherwise
 */
export function validateQuotaCodeFormat(quotaCode: string): boolean {
    const quotaCodePattern = /^L-[A-Z0-9]{8}$/;
    return quotaCodePattern.test(quotaCode);
}

/**
 * Check for missing models in either registry
 * @returns Object containing arrays of missing models in each registry
 */
export function findMissingModels(): { missingInModelRegistry: string[], missingInQuotaRegistry: string[] } {
    const modelRegistryKeys = new Set(Object.keys(MODEL_REGISTRY));
    const quotaRegistryKeys = new Set(Object.keys(QUOTA_REGISTRY));

    const missingInModelRegistry = Array.from(quotaRegistryKeys).filter(modelId => !modelRegistryKeys.has(modelId));
    const missingInQuotaRegistry = Array.from(modelRegistryKeys).filter(modelId => !quotaRegistryKeys.has(modelId));

    return {
        missingInModelRegistry,
        missingInQuotaRegistry
    };
}

/**
 * Validate endpoint type consistency between registries
 * @returns Array of validation errors for endpoint type inconsistencies
 */
export function validateEndpointTypeConsistency(): string[] {
    const errors: string[] = [];
    const validEndpointTypes: EndpointType[] = ['regional', 'cross-region', 'global-cross-region'];

    // Check all quota mappings for invalid endpoint types
    for (const [modelId, quotaMappings] of Object.entries(QUOTA_REGISTRY)) {
        for (const mapping of quotaMappings) {
            if (!validEndpointTypes.includes(mapping.endpointType)) {
                errors.push(`Model '${modelId}' has invalid endpoint type '${mapping.endpointType}'. Valid types: ${validEndpointTypes.join(', ')}`);
            }
        }
    }

    return errors;
}

/**
 * Comprehensive registry validation function
 * @returns Object containing all validation results
 */
export function validateRegistries(): {
    quotaCodeErrors: { modelId: string, endpointType: EndpointType, invalidCodes: string[] }[],
    missingModels: { missingInModelRegistry: string[], missingInQuotaRegistry: string[] },
    endpointTypeErrors: string[],
    isValid: boolean
} {
    const quotaCodeErrors: { modelId: string, endpointType: EndpointType, invalidCodes: string[] }[] = [];
    const missingModels = findMissingModels();
    const endpointTypeErrors = validateEndpointTypeConsistency();

    // Validate all quota codes in the registry
    for (const [modelId, quotaMappings] of Object.entries(QUOTA_REGISTRY)) {
        for (const mapping of quotaMappings) {
            const invalidCodes: string[] = [];

            if (!validateQuotaCodeFormat(mapping.tokenQuotaCode)) {
                invalidCodes.push(`tokenQuotaCode: ${mapping.tokenQuotaCode}`);
            }

            if (!validateQuotaCodeFormat(mapping.requestQuotaCode)) {
                invalidCodes.push(`requestQuotaCode: ${mapping.requestQuotaCode}`);
            }

            if (invalidCodes.length > 0) {
                quotaCodeErrors.push({
                    modelId,
                    endpointType: mapping.endpointType,
                    invalidCodes
                });
            }
        }
    }

    const isValid = quotaCodeErrors.length === 0 &&
        missingModels.missingInModelRegistry.length === 0 &&
        missingModels.missingInQuotaRegistry.length === 0 &&
        endpointTypeErrors.length === 0;

    return {
        quotaCodeErrors,
        missingModels,
        endpointTypeErrors,
        isValid
    };
}