import { BEDROCK_MODELS, getQuotaCodes, validateModelEndpointSupport, getSupportedEndpointTypes } from '../lib/bedrock-registries';

describe('Registry Helper Functions', () => {
    describe('getQuotaCodes', () => {
        test('should return quota codes for supported endpoint type', () => {
            // Test with a known model and supported endpoint
            const result = getQuotaCodes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'cross-region');
            expect(result).not.toBeNull();
            expect(result?.tokenQuotaCode).toMatch(/^L-[A-Z0-9]{8}$/);
            expect(result?.requestQuotaCode).toMatch(/^L-[A-Z0-9]{8}$/);
        });

        test('should return null for unsupported endpoint type', () => {
            const result = getQuotaCodes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'regional');
            expect(result).toBeNull();
        });
    });

    describe('validateModelEndpointSupport', () => {
        test('should return true for supported model and endpoint type', () => {
            const result = validateModelEndpointSupport(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'cross-region');
            expect(result).toBe(true);
        });

        test('should return false for unsupported endpoint type', () => {
            const result = validateModelEndpointSupport(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'regional');
            expect(result).toBe(false);
        });
    });

    describe('getSupportedEndpointTypes', () => {
        test('should return supported endpoint types for models', () => {
            const result = getSupportedEndpointTypes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1);
            expect(result).toEqual(['cross-region']);
            expect(result.length).toBeGreaterThan(0);
        });

        test('should return valid endpoint types', () => {
            const validEndpoints = ['regional', 'cross-region', 'global-cross-region'];
            const result = getSupportedEndpointTypes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1);
            result.forEach(endpoint => {
                expect(validEndpoints).toContain(endpoint);
            });
        });
    });

    describe('Model Configuration Properties', () => {
        test('should have correct model ID format', () => {
            expect(BEDROCK_MODELS.AMAZON.NOVA_LITE_V1.modelId).toBe('amazon.nova-lite-v1:0');
            expect(BEDROCK_MODELS.AMAZON.NOVA_LITE_V1.modelId).toMatch(/^amazon\./);
        });

        test('should have valid burndown rates', () => {
            expect(BEDROCK_MODELS.AMAZON.NOVA_LITE_V1.outputTokenBurndownRate).toBe(1);
            expect([1, 5]).toContain(BEDROCK_MODELS.AMAZON.NOVA_LITE_V1.outputTokenBurndownRate);
        });

        test('should have valid supported endpoints', () => {
            const validEndpoints = ['regional', 'cross-region', 'global-cross-region'];
            BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1.supportedEndpoints.forEach(endpoint => {
                expect(validEndpoints).toContain(endpoint);
            });
        });

        test('should have quota codes in correct format for supported endpoints', () => {
            const quotaCodePattern = /^L-[A-Z0-9]{8}$/;

            // Test cross-region endpoint (supported by NOVA_PREMIER_V1)
            const crossRegionCodes = BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1.crossRegion;
            expect(crossRegionCodes?.tokenQuotaCode).toMatch(quotaCodePattern);
            expect(crossRegionCodes?.requestQuotaCode).toMatch(quotaCodePattern);
        });

        test('should not have quota codes for unsupported endpoints', () => {
            expect(getQuotaCodes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'regional')).toBeNull();
        });
    });

    describe('Type Safety', () => {
        test('should prevent access to unsupported endpoint properties', () => {
            expect(getQuotaCodes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'regional')).toBeNull();
            expect(validateModelEndpointSupport(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'regional')).toBe(false);
            expect(getSupportedEndpointTypes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1)).not.toContain('regional');
        });

        test('should provide access to supported endpoint properties', () => {
            // Test with a model that has cross-region support
            expect(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1.crossRegion).toBeDefined();
            expect(getQuotaCodes(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'cross-region')).toBeDefined();
            expect(validateModelEndpointSupport(BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1, 'cross-region')).toBe(true);
        });
    });

    describe('Registry Structure', () => {
        test('should have Amazon models', () => {
            expect(BEDROCK_MODELS.AMAZON).toBeDefined();
            expect(Object.keys(BEDROCK_MODELS.AMAZON).length).toBeGreaterThan(0);
        });

        test('should have Anthropic models', () => {
            expect(BEDROCK_MODELS.ANTHROPIC).toBeDefined();
            expect(Object.keys(BEDROCK_MODELS.ANTHROPIC).length).toBeGreaterThan(0);
        });

        test('should have consistent model structure', () => {
            // Test a few specific models to ensure structure consistency
            const testModels = [
                BEDROCK_MODELS.AMAZON.NOVA_LITE_V1,
                BEDROCK_MODELS.AMAZON.NOVA_PREMIER_V1,
                BEDROCK_MODELS.ANTHROPIC.CLAUDE_3_HAIKU
            ];

            testModels.forEach(model => {
                expect(model.modelId).toBeDefined();
                expect(typeof model.modelId).toBe('string');
                expect(model.outputTokenBurndownRate).toBeDefined();
                expect(typeof model.outputTokenBurndownRate).toBe('number');
                expect(model.supportedEndpoints).toBeDefined();
                expect(Array.isArray(model.supportedEndpoints)).toBe(true);
                expect(model.supportedEndpoints.length).toBeGreaterThan(0);
            });
        });
    });
});

import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CdkQuotaDashboardsStack } from '../lib/cdk-quota-dashboards-stack';

/**
 * Helper: synthesize the stack and extract all dashboard widget metric expressions.
 * Returns the parsed dashboard body widgets array.
 */
function getDashboardWidgets(): any[] {
    const app = new cdk.App();
    const stack = new CdkQuotaDashboardsStack(app, 'TestStack');
    const template = Template.fromStack(stack);

    const dashboards = template.findResources('AWS::CloudWatch::Dashboard');
    const dashboardLogicalIds = Object.keys(dashboards);
    expect(dashboardLogicalIds.length).toBeGreaterThan(0);

    const dashboardResource = dashboards[dashboardLogicalIds[0]];
    const bodyStr = JSON.stringify(dashboardResource.Properties.DashboardBody);

    // The DashboardBody is a Fn::Join — resolve it by stringifying and parsing
    // CDK produces { "Fn::Join": ["", [...parts]] }
    const body = dashboardResource.Properties.DashboardBody;
    let resolvedBody: string;
    if (typeof body === 'string') {
        resolvedBody = body;
    } else if (body['Fn::Join']) {
        resolvedBody = body['Fn::Join'][1].join('');
    } else {
        resolvedBody = JSON.stringify(body);
    }

    const parsed = JSON.parse(resolvedBody);
    return parsed.widgets;
}

describe('CDK Template Assertions', () => {
    describe('Initial Reservation SampleCount-based expression', () => {
        test('should contain FILL(maxTokens, 0) + ((invocations - FILL(maxTokensCount, 0)) * defaultMaxTokens) for models with defaultMaxTokens', () => {
            // Validates: Requirements 1.1, 1.2, 2.1, 2.3
            const widgets = getDashboardWidgets();

            // Find all Initial Reservation graph widgets (not text widgets)
            const initialReservationWidgets = widgets.filter(
                (w: any) =>
                    w.type === 'metric' &&
                    w.properties?.title?.includes('Initial Reservation')
            );

            expect(initialReservationWidgets.length).toBeGreaterThan(0);

            // Every Initial Reservation widget should have the SampleCount-based pattern
            // since all configured models in the stack have defaultMaxTokens defined
            for (const widget of initialReservationWidgets) {
                const metrics = widget.properties.metrics;

                // Find the MathExpression metric entries — they are arrays where
                // one element is an object with the "expression" key
                const expressions = metrics
                    .filter((m: any) => Array.isArray(m) && m.some((el: any) => typeof el === 'object' && el.expression))
                    .map((m: any) => m.find((el: any) => typeof el === 'object' && el.expression));

                // Find the Initial Reservation expression (not the FILL quota line)
                const reservationExpr = expressions.find(
                    (e: any) => e.expression && e.expression.includes('FILL(maxTokens') && e.expression.includes('maxTokensCount')
                );

                expect(reservationExpr).toBeDefined();
                // Verify the SampleCount-based pattern: FILL(maxTokens, 0) + ((invocations - FILL(maxTokensCount, 0)) * <number>)
                expect(reservationExpr.expression).toMatch(
                    /FILL\(maxTokens,\s*0\) \+ \(\(invocations - FILL\(maxTokensCount,\s*0\)\) \* \d+\)/
                );
                // Verify the full expression structure
                expect(reservationExpr.expression).toContain('inputTokens + cacheWriteTokens + FILL(maxTokens');
                // Verify a valid defaultMaxTokens literal appears in the expression
                expect(reservationExpr.expression).toMatch(/\* \d+\)/);
                // Verify no IF-based fallback is present (Requirement 6.3)
                expect(reservationExpr.expression).not.toContain('IF(');
            }
        });

        test('should include maxTokensCount metric with SampleCount statistic in usingMetrics', () => {
            // Validates: Requirements 1.1, 4.3
            const widgets = getDashboardWidgets();

            const initialReservationWidgets = widgets.filter(
                (w: any) =>
                    w.type === 'metric' &&
                    w.properties?.title?.includes('Initial Reservation')
            );

            expect(initialReservationWidgets.length).toBeGreaterThan(0);

            for (const widget of initialReservationWidgets) {
                const metrics = widget.properties.metrics;

                // Find a metric entry with Bedrock/Quotas namespace, MaxTokens metric name,
                // and SampleCount statistic — this is the maxTokensCount metric
                const maxTokensCountMetric = metrics.find(
                    (m: any) =>
                        Array.isArray(m) &&
                        m.includes('Bedrock/Quotas') &&
                        m.includes('MaxTokens') &&
                        m.some((el: any) => typeof el === 'object' && el.stat === 'SampleCount')
                );

                expect(maxTokensCountMetric).toBeDefined();
            }
        });
    });

    describe('Request Quota widget unchanged', () => {
        test('should use Invocations and RequestQuota metrics without modification', () => {
            // Validates: Requirements 3.2
            const widgets = getDashboardWidgets();

            // Find all Request Quota graph widgets
            const requestQuotaWidgets = widgets.filter(
                (w: any) =>
                    w.type === 'metric' &&
                    w.properties?.title?.includes('Request Quota Consumption')
            );

            expect(requestQuotaWidgets.length).toBeGreaterThan(0);

            for (const widget of requestQuotaWidgets) {
                const metrics = widget.properties.metrics;

                // Should contain an Invocations metric from AWS/Bedrock namespace
                const invocationsMetric = metrics.find(
                    (m: any) => Array.isArray(m) && m.includes('AWS/Bedrock') && m.includes('Invocations')
                );
                expect(invocationsMetric).toBeDefined();

                // Should contain a FILL(requestQuota, REPEAT) expression for the quota line
                const expressions = metrics
                    .filter((m: any) => Array.isArray(m) && m.some((el: any) => typeof el === 'object' && el.expression))
                    .map((m: any) => m.find((el: any) => typeof el === 'object' && el.expression));

                const quotaLineExpr = expressions.find(
                    (e: any) => e.expression && e.expression.includes('FILL(requestQuota, REPEAT)')
                );
                expect(quotaLineExpr).toBeDefined();

                // Verify no IF fallback is present on the Request Quota widget
                const allExpressions = expressions.map((e: any) => e.expression).join(' ');
                expect(allExpressions).not.toContain('IF(');
            }
        });
    });

    describe('Token quota limit lines unchanged', () => {
        test('should have FILL(tokenQuota, REPEAT) on both Initial Reservation and Actual Consumption widgets', () => {
            // Validates: Requirements 3.3
            const widgets = getDashboardWidgets();

            // Find Initial Reservation and Actual Consumption graph widgets
            const initialReservationWidgets = widgets.filter(
                (w: any) =>
                    w.type === 'metric' &&
                    w.properties?.title?.includes('Initial Reservation')
            );
            const actualConsumptionWidgets = widgets.filter(
                (w: any) =>
                    w.type === 'metric' &&
                    w.properties?.title?.includes('Actual Consumption')
            );

            expect(initialReservationWidgets.length).toBeGreaterThan(0);
            expect(actualConsumptionWidgets.length).toBeGreaterThan(0);

            // Verify FILL(tokenQuota, REPEAT) is present on every Initial Reservation widget
            for (const widget of initialReservationWidgets) {
                const metrics = widget.properties.metrics;
                const expressions = metrics
                    .filter((m: any) => Array.isArray(m) && m.some((el: any) => typeof el === 'object' && el.expression))
                    .map((m: any) => m.find((el: any) => typeof el === 'object' && el.expression));

                const tokenQuotaLine = expressions.find(
                    (e: any) => e.expression === 'FILL(tokenQuota, REPEAT)'
                );
                expect(tokenQuotaLine).toBeDefined();
            }

            // Verify FILL(tokenQuota, REPEAT) is present on every Actual Consumption widget
            for (const widget of actualConsumptionWidgets) {
                const metrics = widget.properties.metrics;
                const expressions = metrics
                    .filter((m: any) => Array.isArray(m) && m.some((el: any) => typeof el === 'object' && el.expression))
                    .map((m: any) => m.find((el: any) => typeof el === 'object' && el.expression));

                const tokenQuotaLine = expressions.find(
                    (e: any) => e.expression === 'FILL(tokenQuota, REPEAT)'
                );
                expect(tokenQuotaLine).toBeDefined();
            }
        });
    });

    describe('Actual Consumption expression unchanged', () => {
        test('should use inputTokens + cacheWriteTokens + (outputTokens * burndownRate) without any IF fallback', () => {
            // Validates: Requirements 3.1
            const widgets = getDashboardWidgets();

            // Find all Actual Consumption graph widgets
            const actualConsumptionWidgets = widgets.filter(
                (w: any) =>
                    w.type === 'metric' &&
                    w.properties?.title?.includes('Actual Consumption')
            );

            expect(actualConsumptionWidgets.length).toBeGreaterThan(0);

            for (const widget of actualConsumptionWidgets) {
                const metrics = widget.properties.metrics;

                // Find MathExpression entries
                const expressions = metrics
                    .filter((m: any) => Array.isArray(m) && m.some((el: any) => typeof el === 'object' && el.expression))
                    .map((m: any) => m.find((el: any) => typeof el === 'object' && el.expression));

                // Find the Actual Consumption expression (not the FILL quota line)
                const consumptionExpr = expressions.find(
                    (e: any) => e.expression && e.expression.includes('outputTokens') && !e.expression.includes('FILL')
                );

                expect(consumptionExpr).toBeDefined();
                // Verify the expression uses the burndown rate pattern
                expect(consumptionExpr.expression).toMatch(
                    /inputTokens \+ cacheWriteTokens \+ \(outputTokens \* \d+\)/
                );
                // Verify no IF fallback is present
                expect(consumptionExpr.expression).not.toContain('IF(');
            }
        });
    });
});
