// Bedrock Model Registry for US-East-1 Region
// This file contains all quota codes specific to the us-east-1 region

import { createModelConfig } from './types';
import type { EndpointType } from './types';

// Re-export helper functions and types for convenience
export {
  getQuotaCodes,
  validateModelEndpointSupport,
  getSupportedEndpointTypes
} from './types';
export type { EndpointType, QuotaCodes, ModelConfig } from './types';

// =============================================================================
// BEDROCK MODELS REGISTRY FOR US-EAST-1
// =============================================================================

export const BEDROCK_MODELS = {
  AMAZON: {
    // Nova Models
    NOVA_MICRO_V1: createModelConfig({
      modelId: 'amazon.nova-micro-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 5120,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-CFA4FA0D', requestQuotaCode: 'L-E118F160' },
      crossRegion: { tokenQuotaCode: 'L-DC7FF66C', requestQuotaCode: 'L-3F110E0F' }
    }),

    NOVA_LITE_V1: createModelConfig({
      modelId: 'amazon.nova-lite-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 5120,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-70423BF8', requestQuotaCode: 'L-E386A278' },
      crossRegion: { tokenQuotaCode: 'L-7C42E72A', requestQuotaCode: 'L-89F8391A' }
    }),

    NOVA_PRO_V1: createModelConfig({
      modelId: 'amazon.nova-pro-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 5120,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-CE33604C', requestQuotaCode: 'L-F2717A44' },
      crossRegion: { tokenQuotaCode: 'L-C0326783', requestQuotaCode: 'L-ED46B8C5' }
    }),

    NOVA_PREMIER_V1: createModelConfig({
      modelId: 'amazon.nova-premier-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 25600,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-AA7FE948', requestQuotaCode: 'L-9AD981E7' }
    }),

    // Nova 2 Models
    NOVA_2_LITE_V1: createModelConfig({
      modelId: 'amazon.nova-2-lite-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-C6F5908D', requestQuotaCode: 'L-F06F1187' },
      globalCrossRegion: { tokenQuotaCode: 'L-71C69B70', requestQuotaCode: 'L-D5F39C2F' }
    }),

    // Nova Canvas (Image Generation)
    NOVA_CANVAS_V1: createModelConfig({
      modelId: 'amazon.nova-canvas-v1:0',
      outputTokenBurndownRate: 1,
      supportedEndpoints: ['regional'],
      regional: { requestQuotaCode: 'L-3F26CE29' }
    }),
  },

  ANTHROPIC: {
    // Claude 3 Models
    CLAUDE_3_HAIKU: createModelConfig({
      modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-8CE99163', requestQuotaCode: 'L-2DC80978' },
      crossRegion: { tokenQuotaCode: 'L-DCADBC78', requestQuotaCode: 'L-616A3F5B' }
    }),

    CLAUDE_3_SONNET: createModelConfig({
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-4C35BB2A', requestQuotaCode: 'L-F406804E' },
      crossRegion: { tokenQuotaCode: 'L-5DF13F64', requestQuotaCode: 'L-46591118' }
    }),

    CLAUDE_3_OPUS: createModelConfig({
      modelId: 'anthropic.claude-3-opus-20240229-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-27477D78', requestQuotaCode: 'L-8050DFC8' },
      crossRegion: { tokenQuotaCode: 'L-6C86825E', requestQuotaCode: 'L-EB15245D' }
    }),

    // Claude 3.5 Models
    CLAUDE_3_5_SONNET_20240620: createModelConfig({
      modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-A50569E5', requestQuotaCode: 'L-254CACF4' },
      crossRegion: { tokenQuotaCode: 'L-479B647F', requestQuotaCode: 'L-F457545D' }
    }),

    CLAUDE_3_5_SONNET_20241022: createModelConfig({
      modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-AD41C330', requestQuotaCode: 'L-79E773B3' },
      crossRegion: { tokenQuotaCode: 'L-FF8B4E28', requestQuotaCode: 'L-1D3E59A3' }
    }),

    CLAUDE_3_5_HAIKU: createModelConfig({
      modelId: 'anthropic.claude-3-5-haiku-20241022-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-7AB4ABDD', requestQuotaCode: 'L-C7438F8F' },
      crossRegion: { tokenQuotaCode: 'L-4BF37C17', requestQuotaCode: 'L-252DF594' }
    }),

    // Claude 3.7 Models (cross-region only)
    CLAUDE_3_7_SONNET: createModelConfig({
      modelId: 'anthropic.claude-3-7-sonnet-20250219-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-6E888CC2', requestQuotaCode: 'L-3D8CC480' }
    }),

    // Claude 4 Models
    CLAUDE_HAIKU_4_5: createModelConfig({
      modelId: 'anthropic.claude-haiku-4-5-20251001-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-58BE175A', requestQuotaCode: 'L-CCA5DF70' },
      globalCrossRegion: { tokenQuotaCode: 'L-9A11C666', requestQuotaCode: 'L-E5084BBA' }
    }),

    CLAUDE_SONNET_4: createModelConfig({
      modelId: 'anthropic.claude-sonnet-4-20250514-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-59759B4A', requestQuotaCode: 'L-559DCC33' },
      globalCrossRegion: { tokenQuotaCode: 'L-97E41E39', requestQuotaCode: 'L-C63AA5DA' }
    }),

    CLAUDE_SONNET_4_5: createModelConfig({
      modelId: 'anthropic.claude-sonnet-4-5-20250929-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-F4DDD3EB', requestQuotaCode: 'L-4A6BFAB1' },
      globalCrossRegion: { tokenQuotaCode: 'L-27C57EE8', requestQuotaCode: 'L-DB84CE56' }
    }),

    CLAUDE_OPUS_4: createModelConfig({
      modelId: 'anthropic.claude-opus-4-20250514-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 32768,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-29C2B0A3', requestQuotaCode: 'L-C99C7EF6' }
    }),

    CLAUDE_OPUS_4_1: createModelConfig({
      modelId: 'anthropic.claude-opus-4-1-20250805-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 32768,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-BD85BFCD', requestQuotaCode: 'L-7EC72A47' }
    }),

    CLAUDE_OPUS_4_5: createModelConfig({
      modelId: 'anthropic.claude-opus-4-5-20251101-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-7007E9C9', requestQuotaCode: 'L-27989F42' },
      globalCrossRegion: { tokenQuotaCode: 'L-3ABF6ACC', requestQuotaCode: 'L-58424D95' }
    }),

    // Claude 4.6 Models
    CLAUDE_SONNET_4_6: createModelConfig({
      modelId: 'anthropic.claude-sonnet-4-6',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-15B8E632', requestQuotaCode: 'L-00FF3314' },
      globalCrossRegion: { tokenQuotaCode: 'L-7BEE40FB', requestQuotaCode: 'L-F6E116D7' }
    }),

    CLAUDE_OPUS_4_6: createModelConfig({
      modelId: 'anthropic.claude-opus-4-6-v1',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 131072,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-0AD9BBE8', requestQuotaCode: 'L-11DFF789' },
      globalCrossRegion: { tokenQuotaCode: 'L-3DCCFAA4', requestQuotaCode: 'L-3DD46812' }
    }),

    // Claude 4.7 Models
    CLAUDE_OPUS_4_7: createModelConfig({
      modelId: 'anthropic.claude-opus-4-7',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 131072,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-5DB28B7B' },
      globalCrossRegion: { tokenQuotaCode: 'L-34152C1D' }
    }),
  },

  META: {
    // Llama 3 Models
    LLAMA3_8B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-8b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-03A9B835', requestQuotaCode: 'L-320BEFEB' }
    }),

    LLAMA3_70B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-70b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-609E24B0', requestQuotaCode: 'L-46D383AF' }
    }),

    LLAMA3_2_1B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-2-1b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-6F14193C', requestQuotaCode: 'L-20CFCD61' },
      crossRegion: { tokenQuotaCode: 'L-BD9FDA6F', requestQuotaCode: 'L-A31D2B40' }
    }),

    LLAMA3_2_3B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-2-3b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-A7EDC29B', requestQuotaCode: 'L-2F9B4FC2' },
      crossRegion: { tokenQuotaCode: 'L-0B2687F4', requestQuotaCode: 'L-6B0A9FAD' }
    }),

    LLAMA3_2_11B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-2-11b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-E2D0B19E', requestQuotaCode: 'L-53CCF898' }
    }),

    LLAMA3_2_90B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-2-90b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-41C63FF8', requestQuotaCode: 'L-EBDED838' }
    }),

    LLAMA3_1_8B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-1-8b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-9E79C230', requestQuotaCode: 'L-19A2ED6C' },
      crossRegion: { tokenQuotaCode: 'L-9782749C', requestQuotaCode: 'L-396C5302' }
    }),

    LLAMA3_1_70B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-1-70b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-48E55E59', requestQuotaCode: 'L-ECA5B974' },
      crossRegion: { tokenQuotaCode: 'L-92E68994', requestQuotaCode: 'L-29644EB3' }
    }),

    LLAMA3_3_70B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama3-3-70b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-0E7AA8B7', requestQuotaCode: 'L-DEDE703C' }
    }),

    // Llama 4 Models (cross-region only)
    LLAMA4_SCOUT_17B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama4-scout-17b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-532E6630', requestQuotaCode: 'L-751B753A' }
    }),

    LLAMA4_MAVERICK_17B_INSTRUCT: createModelConfig({
      modelId: 'meta.llama4-maverick-17b-instruct-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-DE3FBBF4', requestQuotaCode: 'L-4F18EF2F' }
    }),
  },

  MISTRAL: {
    MISTRAL_7B_INSTRUCT: createModelConfig({
      modelId: 'mistral.mistral-7b-instruct-v0:2',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-02D831F1', requestQuotaCode: 'L-D9A35062' }
    }),

    MISTRAL_SMALL_2402: createModelConfig({
      modelId: 'mistral.mistral-small-2402-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-82C15FA8', requestQuotaCode: 'L-1CBB0490' }
    }),

    MISTRAL_LARGE_2402: createModelConfig({
      modelId: 'mistral.mistral-large-2402-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-01447289', requestQuotaCode: 'L-3AF844DB' }
    }),

    MISTRAL_LARGE_2407: createModelConfig({
      modelId: 'mistral.mistral-large-2407-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-01447289', requestQuotaCode: 'L-3AF844DB' }
    }),

    MISTRAL_LARGE_3: createModelConfig({
      modelId: 'mistral.mistral-large-3-675b-instruct',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 32768,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-C709F563', requestQuotaCode: 'L-5B274E24' }
    }),

    MINISTRAL_3B: createModelConfig({
      modelId: 'mistral.ministral-3-3b-instruct',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-8A4BEE90', requestQuotaCode: 'L-DCA37E91' }
    }),

    MINISTRAL_8B: createModelConfig({
      modelId: 'mistral.ministral-3-8b-instruct',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-3B98F300', requestQuotaCode: 'L-2BDF9A55' }
    }),

    MINISTRAL_14B: createModelConfig({
      modelId: 'mistral.ministral-3-14b-instruct',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-334E5409', requestQuotaCode: 'L-99F7BDBC' }
    }),

    VOXTRAL_MINI: createModelConfig({
      modelId: 'mistral.voxtral-mini-3b-2507',
      outputTokenBurndownRate: 1,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-0B767044', requestQuotaCode: 'L-17AE85BD' }
    }),

    VOXTRAL_SMALL: createModelConfig({
      modelId: 'mistral.voxtral-small-24b-2507',
      outputTokenBurndownRate: 1,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-930E2896', requestQuotaCode: 'L-ACB2FB6A' }
    }),
  },

  COHERE: {
    COMMAND_R: createModelConfig({
      modelId: 'cohere.command-r-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-17F95AA4', requestQuotaCode: 'L-A49CA90F' }
    }),

    COMMAND_R_PLUS: createModelConfig({
      modelId: 'cohere.command-r-plus-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-FEE1DCB6', requestQuotaCode: 'L-ADB4B3D7' }
    }),

    EMBED_ENGLISH_V3: createModelConfig({
      modelId: 'cohere.embed-english-v3',
      outputTokenBurndownRate: 1,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-A2BE277A', requestQuotaCode: 'L-FF8E7864' }
    }),

    EMBED_MULTILINGUAL_V3: createModelConfig({
      modelId: 'cohere.embed-multilingual-v3',
      outputTokenBurndownRate: 1,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-C2F86908', requestQuotaCode: 'L-9E5BD0C6' }
    }),

    EMBED_V4: createModelConfig({
      modelId: 'cohere.embed-v4:0',
      outputTokenBurndownRate: 1,
      supportedEndpoints: ['regional', 'cross-region', 'global-cross-region'],
      regional: { tokenQuotaCode: 'L-C47B85D5', requestQuotaCode: 'L-BE5FD99B' },
      crossRegion: { tokenQuotaCode: 'L-4C3F0FE6', requestQuotaCode: 'L-EB8C1F30' },
      globalCrossRegion: { tokenQuotaCode: 'L-02DFBB76', requestQuotaCode: 'L-7089DC7D' }
    }),
  },

  AI21: {
    JAMBA_1_5_LARGE: createModelConfig({
      modelId: 'ai21.jamba-1-5-large-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-CFAB19FF', requestQuotaCode: 'L-F4CAA0FD' }
    }),

    JAMBA_1_5_MINI: createModelConfig({
      modelId: 'ai21.jamba-1-5-mini-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 4096,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-5A778346', requestQuotaCode: 'L-0449ADC5' }
    }),
  },

  DEEPSEEK: {
    DEEPSEEK_R1: createModelConfig({
      modelId: 'deepseek.r1-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-06B03968', requestQuotaCode: 'L-F52323AB' }
    }),
  },

  QWEN: {
    QWEN3_NEXT_80B: createModelConfig({
      modelId: 'qwen.qwen3-next-80b-a3b',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-37AB702E', requestQuotaCode: 'L-07B3CEEA' }
    }),

    QWEN3_32B: createModelConfig({
      modelId: 'qwen.qwen3-32b-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-B7C52139', requestQuotaCode: 'L-E880C759' }
    }),

    QWEN3_CODER_30B: createModelConfig({
      modelId: 'qwen.qwen3-coder-480b-a35b-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 16384,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-92F81E14', requestQuotaCode: 'L-66EE6E0B' }
    }),

    QWEN3_VL_235B: createModelConfig({
      modelId: 'qwen.qwen3-235b-a22b-2507-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-46063925', requestQuotaCode: 'L-11B56FB0' }
    }),
  },

  GOOGLE: {
    GEMMA_3_4B: createModelConfig({
      modelId: 'google.gemma-3-4b-it',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-73FB8466', requestQuotaCode: 'L-3056DF33' }
    }),

    GEMMA_3_12B: createModelConfig({
      modelId: 'google.gemma-3-12b-it',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-3FD4A73E', requestQuotaCode: 'L-999037CA' }
    }),

    GEMMA_3_27B: createModelConfig({
      modelId: 'google.gemma-3-27b-it',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-F8729E94', requestQuotaCode: 'L-5D46C7AF' }
    }),
  },

  NVIDIA: {
    NEMOTRON_NANO_2: createModelConfig({
      modelId: 'nvidia.nemotron-nano-9b-v2',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-33D3627D', requestQuotaCode: 'L-AC7B3FB9' }
    }),

    NEMOTRON_NANO_2_VL: createModelConfig({
      modelId: 'nvidia.nemotron-nano-12b-v2',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-A05A5476', requestQuotaCode: 'L-30B384EA' }
    }),
  },

  OPENAI: {
    GPT_OSS_20B: createModelConfig({
      modelId: 'openai.gpt-oss-20b-1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 16384,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-036E14D8', requestQuotaCode: 'L-AF7F0545' }
    }),

    GPT_OSS_120B: createModelConfig({
      modelId: 'openai.gpt-oss-120b-1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 16384,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-9DC5F595', requestQuotaCode: 'L-25B50707' }
    }),

    GPT_OSS_SAFEGUARD_20B: createModelConfig({
      modelId: 'openai.gpt-oss-safeguard-20b',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 16384,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-5D8F2F54', requestQuotaCode: 'L-65833D55' }
    }),

    GPT_OSS_SAFEGUARD_120B: createModelConfig({
      modelId: 'openai.gpt-oss-safeguard-120b',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 16384,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-594C7AC9', requestQuotaCode: 'L-C4E013EF' }
    }),
  },

  KIMI: {
    K2_THINKING: createModelConfig({
      modelId: 'moonshot.kimi-k2-thinking',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 16384,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-03579AC2', requestQuotaCode: 'L-02572418' }
    }),
  },

  MINIMAX: {
    M2: createModelConfig({
      modelId: 'minimax.minimax-m2',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional'],
      regional: { tokenQuotaCode: 'L-A81B7C40', requestQuotaCode: 'L-828C986E' }
    }),
  },

} as const;

