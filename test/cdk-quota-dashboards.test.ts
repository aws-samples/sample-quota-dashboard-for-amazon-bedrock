import { getQuotaCodes, validateModelEndpointSupport, getSupportedEndpointTypes, isModelInRegistry, hasQuotaMappings, getQuotaErrorDetails, validateQuotaCodeFormat, findMissingModels, validateEndpointTypeConsistency, validateRegistries } from '../lib/bedrock-registries';

describe('Registry Helper Functions', () => {
    describe('getQuotaCodes', () => {
        test('should return quota codes for valid model and endpoint type', () => {
            const result = getQuotaCodes('amazon.nova-micro-v1:0', 'regional');
            expect(result).toEqual({
                tokenQuotaCode: 'L-CFA4FA0D',
                requestQuotaCode: 'L-E118F160'
            });
        });

        test('should return null for non-existent model', () => {
            const result = getQuotaCodes('non-existent-model', 'regional');
            expect(result).toBeNull();
        });

        test('should return null for unsupported endpoint type', () => {
            const result = getQuotaCodes('amazon.nova-premier-v1:0', 'regional');
            expect(result).toBeNull();
        });
    });

    describe('validateModelEndpointSupport', () => {
        test('should return true for supported model and endpoint type', () => {
            const result = validateModelEndpointSupport('anthropic.claude-3-haiku-20240307-v1:0', 'cross-region');
            expect(result).toBe(true);
        });

        test('should return false for non-existent model', () => {
            const result = validateModelEndpointSupport('non-existent-model', 'regional');
            expect(result).toBe(false);
        });

        test('should return false for unsupported endpoint type', () => {
            const result = validateModelEndpointSupport('amazon.nova-premier-v1:0', 'regional');
            expect(result).toBe(false);
        });
    });

    describe('getSupportedEndpointTypes', () => {
        test('should return supported endpoint types for model with multiple types', () => {
            const result = getSupportedEndpointTypes('amazon.nova-micro-v1:0');
            expect(result).toEqual(expect.arrayContaining(['regional', 'cross-region']));
            expect(result).toHaveLength(2);
        });

        test('should return single endpoint type for model with one type', () => {
            const result = getSupportedEndpointTypes('amazon.nova-premier-v1:0');
            expect(result).toEqual(['cross-region']);
        });

        test('should return empty array for non-existent model', () => {
            const result = getSupportedEndpointTypes('non-existent-model');
            expect(result).toEqual([]);
        });
    });

    describe('Error Handling Functions', () => {
        describe('isModelInRegistry', () => {
            test('should return true for existing model', () => {
                const result = isModelInRegistry('amazon.nova-micro-v1:0');
                expect(result).toBe(true);
            });

            test('should return false for non-existent model', () => {
                const result = isModelInRegistry('non-existent-model');
                expect(result).toBe(false);
            });
        });

        describe('hasQuotaMappings', () => {
            test('should return true for model with quota mappings', () => {
                const result = hasQuotaMappings('amazon.nova-micro-v1:0');
                expect(result).toBe(true);
            });

            test('should return false for non-existent model', () => {
                const result = hasQuotaMappings('non-existent-model');
                expect(result).toBe(false);
            });
        });

        describe('getQuotaErrorDetails', () => {
            test('should return model not found error for non-existent model', () => {
                const result = getQuotaErrorDetails('non-existent-model', 'regional');
                expect(result).toContain('not found in QUOTA_REGISTRY');
            });

            test('should return unsupported endpoint type error', () => {
                const result = getQuotaErrorDetails('amazon.nova-premier-v1:0', 'regional');
                expect(result).toContain('does not support endpoint type');
                expect(result).toContain('Supported types: cross-region');
            });

            test('should return appropriate error for valid model with valid endpoint', () => {
                // This should not happen in normal operation, but tests the fallback case
                const result = getQuotaErrorDetails('amazon.nova-micro-v1:0', 'regional');
                expect(result).toContain('Quota codes found but lookup failed');
            });
        });
    });

    describe('Registry Validation Functions', () => {
        describe('validateQuotaCodeFormat', () => {
            test('should return true for valid quota code format', () => {
                expect(validateQuotaCodeFormat('L-CFA4FA0D')).toBe(true);
                expect(validateQuotaCodeFormat('L-12345678')).toBe(true);
                expect(validateQuotaCodeFormat('L-ABCDEF12')).toBe(true);
            });

            test('should return false for invalid quota code format', () => {
                expect(validateQuotaCodeFormat('L-CFA4FA0')).toBe(false); // Too short
                expect(validateQuotaCodeFormat('L-CFA4FA0DD')).toBe(false); // Too long
                expect(validateQuotaCodeFormat('CFA4FA0D')).toBe(false); // Missing L- prefix
                expect(validateQuotaCodeFormat('L-cfa4fa0d')).toBe(false); // Lowercase letters
                expect(validateQuotaCodeFormat('L-CFA4FA@D')).toBe(false); // Invalid character
                expect(validateQuotaCodeFormat('')).toBe(false); // Empty string
            });
        });

        describe('findMissingModels', () => {
            test('should identify models missing in either registry', () => {
                const result = findMissingModels();
                
                // Both arrays should be empty for a properly configured registry
                expect(Array.isArray(result.missingInModelRegistry)).toBe(true);
                expect(Array.isArray(result.missingInQuotaRegistry)).toBe(true);
                
                // In the current registry, all models should be present in both registries
                expect(result.missingInModelRegistry).toHaveLength(0);
                expect(result.missingInQuotaRegistry).toHaveLength(0);
            });
        });

        describe('validateEndpointTypeConsistency', () => {
            test('should return empty array for valid endpoint types', () => {
                const result = validateEndpointTypeConsistency();
                expect(result).toEqual([]);
            });
        });

        describe('validateRegistries', () => {
            test('should return comprehensive validation results', () => {
                const result = validateRegistries();
                
                expect(result).toHaveProperty('quotaCodeErrors');
                expect(result).toHaveProperty('missingModels');
                expect(result).toHaveProperty('endpointTypeErrors');
                expect(result).toHaveProperty('isValid');
                
                expect(Array.isArray(result.quotaCodeErrors)).toBe(true);
                expect(typeof result.missingModels).toBe('object');
                expect(Array.isArray(result.endpointTypeErrors)).toBe(true);
                expect(typeof result.isValid).toBe('boolean');
            });

            test('should validate all quota codes in registry', () => {
                const result = validateRegistries();
                
                // All quota codes in the current registry should be valid
                expect(result.quotaCodeErrors).toHaveLength(0);
                expect(result.endpointTypeErrors).toHaveLength(0);
                expect(result.missingModels.missingInModelRegistry).toHaveLength(0);
                expect(result.missingModels.missingInQuotaRegistry).toHaveLength(0);
                expect(result.isValid).toBe(true);
            });
        });
    });
});
