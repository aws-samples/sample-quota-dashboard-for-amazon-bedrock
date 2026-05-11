// Bedrock Model Registry for EU-West-2 Region
// This file contains all quota codes specific to the eu-west-2 region

import { createModelConfig } from './types';

// Re-export helper functions and types for convenience
export {
  getQuotaCodes,
  validateModelEndpointSupport,
  getSupportedEndpointTypes
} from './types';
export type { EndpointType, QuotaCodes, ModelConfig } from './types';

// =============================================================================
// BEDROCK MODELS REGISTRY FOR EU-WEST-2
// =============================================================================

export const BEDROCK_MODELS = {
  AMAZON: {
    // Nova 2 Models
    NOVA_2_LITE_V1: createModelConfig({
      modelId: 'amazon.nova-2-lite-v1:0',
      outputTokenBurndownRate: 1,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['global-cross-region'],
      globalCrossRegion: { tokenQuotaCode: 'L-71C69B70', requestQuotaCode: 'L-D5F39C2F' }
    }),

  },

  ANTHROPIC: {
    // Claude 4.5 Models
    CLAUDE_HAIKU_4_5: createModelConfig({
      modelId: 'anthropic.claude-haiku-4-5-20251001-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-58BE175A', requestQuotaCode: 'L-CCA5DF70' },
      globalCrossRegion: { tokenQuotaCode: 'L-9A11C666', requestQuotaCode: 'L-E5084BBA' }
    }),
    CLAUDE_SONNET_4_5: createModelConfig({
      modelId: 'anthropic.claude-sonnet-4-5-20250929-v1:0',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 65536,
      supportedEndpoints: ['cross-region', 'global-cross-region'],
      crossRegion: { tokenQuotaCode: 'L-F4DDD3EB', requestQuotaCode: 'L-4A6BFAB1' },
      globalCrossRegion: { tokenQuotaCode: 'L-27C57EE8', requestQuotaCode: 'L-DB84CE56' }
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
      supportedEndpoints: ['regional', 'cross-region', 'global-cross-region'],
      regional: { tokenQuotaCode: 'L-5F5A169C', requestQuotaCode: 'L-9B878FAE' },
      crossRegion: { tokenQuotaCode: 'L-15B8E632', requestQuotaCode: 'L-00FF3314' },
      globalCrossRegion: { tokenQuotaCode: 'L-7BEE40FB', requestQuotaCode: 'L-F6E116D7' }
    }),
    CLAUDE_OPUS_4_6: createModelConfig({
      modelId: 'anthropic.claude-opus-4-6-v1',
      outputTokenBurndownRate: 5,
      defaultMaxTokens: 131072,
      supportedEndpoints: ['regional', 'cross-region', 'global-cross-region'],
      regional: { tokenQuotaCode: 'L-98944717', requestQuotaCode: 'L-0491E43A' },
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
  // Add more models here as desired.
} as const;
