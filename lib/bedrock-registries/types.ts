// Shared types and utilities for Bedrock Model Registries
// This file contains all common type definitions and helper functions

// =============================================================================
// QUOTA CODES BEST PRACTICES
// =============================================================================
//
// When defining quota codes for models:
// 1. PREFERRED: Include both tokenQuotaCode and requestQuotaCode when available
//    Example: { tokenQuotaCode: 'L-ABC123', requestQuotaCode: 'L-DEF456' }
//
// 2. ACCEPTABLE: Include only one quota code if the model doesn't support both
//    Example: { requestQuotaCode: 'L-DEF456' } // For models without token quotas
//
// 3. Use the validateQuotaCodes() function to check for completeness
//
// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type EndpointType = 'regional' | 'cross-region' | 'global-cross-region';

// Map endpoint types to property names
type EndpointPropertyMap = {
  'regional': 'regional';
  'cross-region': 'crossRegion';
  'global-cross-region': 'globalCrossRegion';
};

// Create a mapped type that only allows properties for supported endpoints
type QuotaProperties<T extends readonly EndpointType[]> = {
  [K in T[number]as EndpointPropertyMap[K]]?: QuotaCodes;
};

export interface QuotaCodes {
  readonly tokenQuotaCode?: string;
  readonly requestQuotaCode?: string;
}

/**
 * Validates that quota codes are properly configured
 * @param quotaCodes The quota codes to validate
 * @param modelId The model ID for error reporting
 * @returns Array of warning messages if incomplete
 */
export function validateQuotaCodes(quotaCodes: QuotaCodes, modelId: string): string[] {
  const warnings: string[] = [];

  if (!quotaCodes.tokenQuotaCode && !quotaCodes.requestQuotaCode) {
    warnings.push(`Model ${modelId}: No quota codes provided. Consider adding both tokenQuotaCode and requestQuotaCode for complete monitoring.`);
  } else if (!quotaCodes.tokenQuotaCode) {
    warnings.push(`Model ${modelId}: Missing tokenQuotaCode. Consider adding for complete token usage monitoring.`);
  } else if (!quotaCodes.requestQuotaCode) {
    warnings.push(`Model ${modelId}: Missing requestQuotaCode. Consider adding for complete request monitoring.`);
  }

  return warnings;
}

interface EnhancedModelConfig<T extends readonly EndpointType[] = EndpointType[]> {
  readonly modelId: string;
  readonly outputTokenBurndownRate: number;
  readonly supportedEndpoints: T;
  /**
   * The model's native max output tokens. Used as a fallback in dashboard metric
   * calculations when callers don't set max_tokens in their InvokeModel requests.
   * @example 128000
   */
  readonly defaultMaxTokens?: number;
}

// Intersection type that combines base config with quota properties
export type ModelConfig<T extends readonly EndpointType[]> =
  EnhancedModelConfig<T> & QuotaProperties<T>;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Helper function to create model configs with type validation
 * Logs warnings for incomplete quota code configurations
 */
export function createModelConfig<T extends readonly EndpointType[]>(
  config: {
    modelId: string;
    outputTokenBurndownRate: number;
    supportedEndpoints: T;
    defaultMaxTokens?: number;
  } & QuotaProperties<T>
): ModelConfig<T> {
  // Validate quota codes for each endpoint and log warnings
  config.supportedEndpoints.forEach(endpointType => {
    const quotaCodes = getQuotaCodes(config as ModelConfig<T>, endpointType);
    if (quotaCodes) {
      const warnings = validateQuotaCodes(quotaCodes, config.modelId);
      warnings.forEach(warning => {
        console.warn(`[Quota Config Warning] ${warning}`);
      });
    }
  });

  return config;
}

/**
 * Get quota codes for a specific model and endpoint type
 * @param modelConfig The model configuration object
 * @param endpointType The endpoint type to lookup
 * @returns QuotaCodes object or null if not found
 */
export function getQuotaCodes<T extends readonly EndpointType[]>(
  modelConfig: ModelConfig<T>,
  endpointType: EndpointType
): QuotaCodes | null {
  switch (endpointType) {
    case 'regional':
      return (modelConfig as any).regional || null;
    case 'cross-region':
      return (modelConfig as any).crossRegion || null;
    case 'global-cross-region':
      return (modelConfig as any).globalCrossRegion || null;
    default:
      return null;
  }
}

/**
 * Get token quota code for a specific model and endpoint type
 * @param modelConfig The model configuration object
 * @param endpointType The endpoint type to lookup
 * @returns Token quota code string or null if not found
 */
export function getTokenQuotaCode<T extends readonly EndpointType[]>(
  modelConfig: ModelConfig<T>,
  endpointType: EndpointType
): string | null {
  const quotaCodes = getQuotaCodes(modelConfig, endpointType);
  return quotaCodes?.tokenQuotaCode || null;
}

/**
 * Get request quota code for a specific model and endpoint type
 * @param modelConfig The model configuration object
 * @param endpointType The endpoint type to lookup
 * @returns Request quota code string or null if not found
 */
export function getRequestQuotaCode<T extends readonly EndpointType[]>(
  modelConfig: ModelConfig<T>,
  endpointType: EndpointType
): string | null {
  const quotaCodes = getQuotaCodes(modelConfig, endpointType);
  return quotaCodes?.requestQuotaCode || null;
}

/**
 * Check if a model supports a specific endpoint type
 * @param modelConfig The model configuration object
 * @param endpointType The endpoint type to validate
 * @returns true if the model supports the endpoint type, false otherwise
 */
export function validateModelEndpointSupport<T extends readonly EndpointType[]>(
  modelConfig: ModelConfig<T>,
  endpointType: EndpointType
): boolean {
  return modelConfig.supportedEndpoints.includes(endpointType as any);
}

/**
 * Get all supported endpoint types for a model
 * @param modelConfig The model configuration object
 * @returns Array of supported endpoint types
 */
export function getSupportedEndpointTypes<T extends readonly EndpointType[]>(
  modelConfig: ModelConfig<T>
): readonly EndpointType[] {
  return modelConfig.supportedEndpoints;
}