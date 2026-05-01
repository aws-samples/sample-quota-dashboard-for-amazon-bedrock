// Bedrock Model Registry for US-West-2 Region
// This file contains all quota codes specific to the us-west-2 region

import { createModelConfig } from './types';

// Re-export helper functions and types for convenience
export {
  getQuotaCodes,
  validateModelEndpointSupport,
  getSupportedEndpointTypes
} from './types';
export type { EndpointType, QuotaCodes, ModelConfig } from './types';

// =============================================================================
// BEDROCK MODELS REGISTRY FOR US-WEST-2
// =============================================================================

export const BEDROCK_MODELS = {
  AMAZON: {
    // Nova Models
    NOVA_MICRO_V1: createModelConfig({
      modelId: 'amazon.nova-micro-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 5120,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-DC7FF66C', requestQuotaCode: 'L-3F110E0F' }
    }),

    NOVA_LITE_V1: createModelConfig({
      modelId: 'amazon.nova-lite-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 5120,
      supportedEndpoints: ['cross-region'],
      crossRegion: { tokenQuotaCode: 'L-7C42E72A', requestQuotaCode: 'L-89F8391A' }
    }),

    NOVA_PRO_V1: createModelConfig({
      modelId: 'amazon.nova-pro-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 5120,
      supportedEndpoints: ['cross-region'],
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

    // Claude 3.5 Models
    CLAUDE_3_5_SONNET_20240620: createModelConfig({
      modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 8192,
      supportedEndpoints: ['regional', 'cross-region'],
      regional: { tokenQuotaCode: 'L-A50569E5', requestQuotaCode: 'L-254CACF4' },
      crossRegion: { tokenQuotaCode: 'L-479B647F', requestQuotaCode: 'L-F457545D' }
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

    // Add more models here as desired.

  },
} as const;

