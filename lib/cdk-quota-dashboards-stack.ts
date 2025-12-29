import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';
import { NagSuppressions } from 'cdk-nag';
import { MODEL_REGISTRY, getQuotaCodes, getQuotaErrorDetails, type EndpointType, validateModelEndpointSupport, getSupportedEndpointTypes } from './bedrock-registries';

// Dashboard configuration interface
interface DashboardConfig {
  /**
   * The Bedrock model ID to monitor (without endpoint prefixes)
   * @example 'amazon.nova-lite-v1:0'
   * @example 'anthropic.claude-3-haiku-20240307-v1:0'
   */
  modelId: string;
  
  /**
   * The endpoint type for this model. Must be supported by the model.
   * Use getSupportedEndpointTypes(modelId) to check valid options.
   * 
   * - 'regional': Standard regional endpoints
   * - 'cross-region': Cross-region inference
   * - 'global-cross-region': Global cross-region
   * 
   * @example 'regional'
   * @example 'cross-region' 
   * @example 'global-cross-region'
   */
  endpointType: EndpointType;
}

/**
 * Validates that all dashboard configurations use valid model/endpoint combinations
 * @param configs Array of dashboard configurations to validate
 * @throws Error with detailed message if any configurations are invalid
 */
function validateAllDashboardConfigs(configs: DashboardConfig[]): void {
  const errors: string[] = [];
  
  configs.forEach((config, index) => {
    if (!validateModelEndpointSupport(config.modelId, config.endpointType)) {
      const supported = getSupportedEndpointTypes(config.modelId);
      if (supported.length === 0) {
        errors.push(`Config ${index}: Model '${config.modelId}' not found in quota registry`);
      } else {
        errors.push(`Config ${index}: Model '${config.modelId}' does not support endpoint type '${config.endpointType}'. Supported types: ${supported.join(', ')}`);
      }
    }
  });
  
  if (errors.length > 0) {
    throw new Error(`Invalid dashboard configurations found:\n${errors.join('\n')}\n\nPlease check the QUOTA_REGISTRY in lib/bedrock-registries.ts for valid model/endpoint combinations.`);
  }
}

// Helper function to generate full model ID with endpoint prefix
function getFullModelId(modelId: string, endpointType: EndpointType): string {
  switch (endpointType) {
    case 'regional':
      return modelId;
    case 'cross-region':
      return `us.${modelId}`;
    case 'global-cross-region':
      return `global.${modelId}`;
    default:
      return modelId;
  }
}

export interface CdkQuotaDashboardsStackProps extends cdk.StackProps {
}

export class CdkQuotaDashboardsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: CdkQuotaDashboardsStackProps) {
    super(scope, id, props);

    // All available dashboard configurations
    // NOTE: Each model/endpoint combination is validated at runtime.
    // If you add a new configuration, ensure the model supports the specified endpoint type.
    // Use getSupportedEndpointTypes(modelId) to check valid options for a model.
    const allDashboardConfigs: DashboardConfig[] = [
      // Amazon Nova Models
      { modelId: 'amazon.nova-micro-v1:0', endpointType: 'cross-region' },
      { modelId: 'amazon.nova-lite-v1:0', endpointType: 'cross-region' },
      { modelId: 'amazon.nova-pro-v1:0', endpointType: 'cross-region' },
      { modelId: 'amazon.nova-premier-v1:0', endpointType: 'cross-region' },

      // Amazon Nova 2 Models
      { modelId: 'amazon.nova-2-lite-v1:0', endpointType: 'cross-region' },
      { modelId: 'amazon.nova-2-pro-preview-v1:0', endpointType: 'cross-region' },
      { modelId: 'amazon.nova-2-omni-v1:0', endpointType: 'cross-region' },

      // // Anthropic Claude 3 Models
      // { modelId: 'anthropic.claude-3-haiku-20240307-v1:0', endpointType: 'cross-region' },
      // { modelId: 'anthropic.claude-3-sonnet-20240229-v1:0', endpointType: 'cross-region' },
      // { modelId: 'anthropic.claude-3-opus-20240229-v1:0', endpointType: 'cross-region' },

      // // Anthropic Claude 3.5 Models
      // { modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0', endpointType: 'cross-region' },
      // { modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0', endpointType: 'cross-region' },
      // { modelId: 'anthropic.claude-3-5-haiku-20241022-v1:0', endpointType: 'cross-region' },

      // Anthropic Claude 3.7 Models (cross-region only)
      { modelId: 'anthropic.claude-3-7-sonnet-20250219-v1:0', endpointType: 'cross-region' },

      // Anthropic Claude 4 Models (cross-region only)
      { modelId: 'anthropic.claude-haiku-4-5-20251001-v1:0', endpointType: 'cross-region' },
      { modelId: 'anthropic.claude-sonnet-4-20250514-v1:0', endpointType: 'cross-region' },
      { modelId: 'anthropic.claude-sonnet-4-5-20250929-v1:0', endpointType: 'cross-region' },
      { modelId: 'anthropic.claude-sonnet-4-5-v1-1m-20250929-v1:0', endpointType: 'cross-region' }, // Synthetic model ID - used to differentiate 1M context variant
      { modelId: 'anthropic.claude-opus-4-20250514-v1:0', endpointType: 'cross-region' },
      { modelId: 'anthropic.claude-opus-4-1-20250805-v1:0', endpointType: 'cross-region' },
      { modelId: 'anthropic.claude-opus-4-5-20251001-v1:0', endpointType: 'cross-region' },

      // // Amazon Titan Text Models
      // { modelId: 'amazon.titan-text-lite-v1', endpointType: 'regional' },
      // { modelId: 'amazon.titan-text-express-v1', endpointType: 'regional' },
      // { modelId: 'amazon.titan-text-premier-v1:0', endpointType: 'regional' },

      // // Meta Llama Models
      // { modelId: 'meta.llama3-2-1b-instruct-v1:0', endpointType: 'cross-region' },
      // { modelId: 'meta.llama3-2-3b-instruct-v1:0', endpointType: 'cross-region' },
      // { modelId: 'meta.llama3-2-11b-instruct-v1:0', endpointType: 'regional' },
      // { modelId: 'meta.llama3-2-90b-instruct-v1:0', endpointType: 'regional' },
      // { modelId: 'meta.llama3-1-8b-instruct-v1:0', endpointType: 'cross-region' },
      // { modelId: 'meta.llama3-1-70b-instruct-v1:0', endpointType: 'cross-region' },
      // { modelId: 'meta.llama3-3-70b-instruct-v1:0', endpointType: 'cross-region' },

      // // Meta Llama 4 Models (cross-region only)
      // { modelId: 'meta.llama4-scout-17b-instruct-v1:0', endpointType: 'cross-region' },
      // { modelId: 'meta.llama4-maverick-17b-instruct-v1:0', endpointType: 'cross-region' },

      // // Mistral Models
      // { modelId: 'mistral.mistral-small-2402-v1:0', endpointType: 'regional' },
      // { modelId: 'mistral.mistral-large-2407-v1:0', endpointType: 'regional' },
      // { modelId: 'mistral.mistral-large-3-v1:0', endpointType: 'regional' },
      // { modelId: 'mistral.pixtral-large-2502-v1:0', endpointType: 'cross-region' },

      // // Ministral Models
      // { modelId: 'mistral.ministral-3b-v1:0', endpointType: 'regional' },
      // { modelId: 'mistral.ministral-8b-v1:0', endpointType: 'regional' },
      // { modelId: 'mistral.ministral-14b-v1:0', endpointType: 'regional' },

      // // Cohere Models
      // { modelId: 'cohere.command-r-v1:0', endpointType: 'regional' },
      // { modelId: 'cohere.command-r-plus-v1:0', endpointType: 'regional' },
      // { modelId: 'cohere.embed-v4', endpointType: 'regional' },

      // // AI21 Labs Models
      // { modelId: 'ai21.jamba-instruct-v1:0', endpointType: 'regional' },
      // { modelId: 'ai21.jamba-1-5-large-v1:0', endpointType: 'regional' },

      // // DeepSeek Models
      // { modelId: 'deepseek.deepseek-r1-v1:0', endpointType: 'cross-region' },

      // // Google Gemma Models
      // { modelId: 'google.gemma-3-4b-v1:0', endpointType: 'regional' },
      // { modelId: 'google.gemma-3-12b-v1:0', endpointType: 'regional' },
      // { modelId: 'google.gemma-3-27b-v1:0', endpointType: 'regional' },

      // // NVIDIA Models
      // { modelId: 'nvidia.nemotron-nano-2-v1:0', endpointType: 'regional' },
      // { modelId: 'nvidia.nemotron-nano-2-vl-v1:0', endpointType: 'regional' },

      // // OpenAI GPT OSS Models
      // { modelId: 'openai.gpt-oss-20b-v1:0', endpointType: 'regional' },
      // { modelId: 'openai.gpt-oss-120b-v1:0', endpointType: 'regional' },

      // // Qwen Models (selected popular ones)
      // { modelId: 'qwen.qwen3-32b-v1:0', endpointType: 'regional' },
      // { modelId: 'qwen.qwen3-coder-30b-a3b-v1:0', endpointType: 'regional' },
    ];

    // Validate all dashboard configurations before proceeding
    validateAllDashboardConfigs(allDashboardConfigs);

    const dashboardConfigs = allDashboardConfigs;

    // Lambda function to fetch Service Quotas and publish as CloudWatch metrics
    const quotaFetcherLambda = new lambda.Function(this, 'QuotaFetcher', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'quota-fetcher-lambda.handler',
      timeout: cdk.Duration.minutes(5),
      code: lambda.Code.fromAsset('lib/lambda'),
    });

    // Grant permissions to fetch service quotas and publish CloudWatch metrics
    quotaFetcherLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['servicequotas:GetServiceQuota', 'servicequotas:ListServiceQuotas'],
        resources: [`*`], // Quotas does not support resource-level permissions
      })
    );

    quotaFetcherLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['cloudwatch:PutMetricData'],
        resources: ['*'],
        conditions: {
          StringEquals: {
            'cloudwatch:namespace': 'Bedrock/Quotas'
          }
        }
      })
    );

    // Custom Resource Provider
    const quotaProvider = new cr.Provider(this, 'QuotaProvider', {
      onEventHandler: quotaFetcherLambda,
    });

    // EventBridge rule to refresh quotas every 2.9 hours
    const dailyRefreshRule = new events.Rule(this, 'DailyQuotaRefresh', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(174)),
      description: 'Refresh Bedrock quota values every 2.9 hours',
    });

    // Prepare models for EventBridge rule with error handling
    const eventBridgeModels = dashboardConfigs.map(config => {
      const quotaCodes = getQuotaCodes(config.modelId, config.endpointType);
      const fullModelId = getFullModelId(config.modelId, config.endpointType);

      if (!quotaCodes) {
        console.warn(`[EVENTBRIDGE_WARNING] Excluding model '${config.modelId}' (${config.endpointType}) from scheduled quota refresh - missing quota codes`);
        return null;
      }

      return {
        modelId: fullModelId,
        tokenQuotaCode: quotaCodes.tokenQuotaCode,
        requestQuotaCode: quotaCodes.requestQuotaCode,
      };
    }).filter(Boolean); // Remove null entries

    if (eventBridgeModels.length === 0) {
      console.error('[EVENTBRIDGE_ERROR] No models available for scheduled quota refresh due to missing quota codes');
    } else {
      console.log(`[EVENTBRIDGE_SUCCESS] Configured scheduled quota refresh for ${eventBridgeModels.length} models`);
    }

    dailyRefreshRule.addTarget(
      new targets.LambdaFunction(quotaFetcherLambda, {
        event: events.RuleTargetInput.fromObject({
          source: 'aws.events',
          models: eventBridgeModels,
        }),
      })
    );

    // Create CloudWatch Dashboard
    const dashboard = new cloudwatch.Dashboard(this, 'BedrockQuotaDashboard', {
      dashboardName: 'BedrockQuotaConsumptionByModel',
      periodOverride: cloudwatch.PeriodOverride.INHERIT,
    });

    // Prepare models for initial quota fetch with error handling
    const customResourceModels = dashboardConfigs.map(config => {
      const quotaCodes = getQuotaCodes(config.modelId, config.endpointType);
      const fullModelId = getFullModelId(config.modelId, config.endpointType);

      if (!quotaCodes) {
        console.warn(`[CUSTOM_RESOURCE_WARNING] Excluding model '${config.modelId}' (${config.endpointType}) from initial quota fetch - missing quota codes`);
        return null;
      }

      return {
        modelId: fullModelId,
        tokenQuotaCode: quotaCodes.tokenQuotaCode,
        requestQuotaCode: quotaCodes.requestQuotaCode,
      };
    }).filter(Boolean); // Remove null entries

    if (customResourceModels.length === 0) {
      console.error('[CUSTOM_RESOURCE_ERROR] No models available for initial quota fetch due to missing quota codes');
    } else {
      console.log(`[CUSTOM_RESOURCE_SUCCESS] Configured initial quota fetch for ${customResourceModels.length} models`);
    }

    // Trigger initial quota fetch on first deployment
    new cdk.CustomResource(this, 'InitialQuotaFetch', {
      serviceToken: quotaProvider.serviceToken,
      properties: {
        models: customResourceModels,
      },
    });

    // Helper to determine model family for banners
    const getModelFamily = (modelId: string): string => {
      if (modelId.startsWith('amazon.nova-')) return 'Amazon Nova';
      if (modelId.startsWith('amazon.titan-')) return 'Amazon Titan';
      if (modelId.startsWith('anthropic.claude')) return 'Anthropic Claude';
      if (modelId.startsWith('meta')) return 'Meta';
      if (modelId.startsWith('mistral.')) return 'Mistral AI';
      if (modelId.startsWith('cohere.')) return 'Cohere';
      if (modelId.startsWith('ai21.')) return 'AI21 Labs';
      if (modelId.startsWith('deepseek.')) return 'DeepSeek';
      if (modelId.startsWith('google.')) return 'Google';
      if (modelId.startsWith('nvidia.')) return 'NVIDIA';
      if (modelId.startsWith('openai.')) return 'OpenAI';
      if (modelId.startsWith('qwen.')) return 'Qwen';
      if (modelId.startsWith('kimi.')) return 'Kimi';
      if (modelId.startsWith('minimax.')) return 'Minimax';
      if (modelId.startsWith('magistral.')) return 'Magistral';
      return 'Other Models';
    };

    // Track current family to add banners
    let currentFamily: string | null = null;

    // Track models with missing quota codes for summary logging
    const modelsWithMissingQuotas: string[] = [];
    const modelsWithMissingMetadata: string[] = [];

    // Create widgets for each dashboard configuration
    dashboardConfigs.forEach((config) => {
      const fullModelId = getFullModelId(config.modelId, config.endpointType);
      const quotaCodes = getQuotaCodes(config.modelId, config.endpointType);
      const modelFamily = getModelFamily(config.modelId);

      // Skip if no quota codes found
      if (!quotaCodes) {
        const errorDetails = getQuotaErrorDetails(config.modelId, config.endpointType);
        console.warn(`[QUOTA_ERROR] ${errorDetails}`);
        modelsWithMissingQuotas.push(`${config.modelId} (${config.endpointType})`);
        return;
      }

      // Get burndown rate from model registry
      const modelMetadata = MODEL_REGISTRY[config.modelId];
      if (!modelMetadata) {
        const errorMessage = `Missing model metadata for '${config.modelId}'. Model not found in MODEL_REGISTRY.`;
        console.warn(`[METADATA_ERROR] ${errorMessage}`);
        modelsWithMissingMetadata.push(config.modelId);
        return;
      }

      const burndownRate = modelMetadata.outputTokenBurndownRate;

      // Add banner when entering a new model family
      if (modelFamily !== currentFamily) {
        currentFamily = modelFamily;
        dashboard.addWidgets(
          new cloudwatch.TextWidget({
            markdown: `# ${modelFamily}`,
            width: 24,
            height: 1,
          })
        );
      }

      // Create CloudWatch metrics for quota values (updated daily by Lambda)
      const tokenQuotaMetric = new cloudwatch.Metric({
        namespace: 'Bedrock/Quotas',
        metricName: 'TokenQuota',
        dimensionsMap: {
          ModelId: fullModelId,
        },
        statistic: 'Maximum',
        period: cdk.Duration.minutes(1),
        label: 'Quota Limit',
        color: cloudwatch.Color.RED,
      });

      const requestQuotaMetric = new cloudwatch.Metric({
        namespace: 'Bedrock/Quotas',
        metricName: 'RequestQuota',
        dimensionsMap: {
          ModelId: fullModelId,
        },
        statistic: 'Maximum',
        period: cdk.Duration.minutes(1),
        label: 'Quota Limit',
        color: cloudwatch.Color.RED,
      });



      // Create metrics
      const inputTokens = new cloudwatch.Metric({
        namespace: 'AWS/Bedrock',
        metricName: 'InputTokenCount',
        dimensionsMap: {
          ModelId: fullModelId,
        },
        statistic: 'Sum',
        period: cdk.Duration.minutes(1),
      });

      const cacheWriteTokens = new cloudwatch.Metric({
        namespace: 'AWS/Bedrock',
        metricName: 'CacheWriteInputTokenCount',
        dimensionsMap: {
          ModelId: fullModelId,
        },
        statistic: 'Sum',
        period: cdk.Duration.minutes(1),
      });

      const outputTokens = new cloudwatch.Metric({
        namespace: 'AWS/Bedrock',
        metricName: 'OutputTokenCount',
        dimensionsMap: {
          ModelId: fullModelId,
        },
        statistic: 'Sum',
        period: cdk.Duration.minutes(1),
      });

      // Calculate total quota consumption with burndown rate
      const quotaTokenUsage = new cloudwatch.MathExpression({
        expression: `inputTokens + cacheWriteTokens + (outputTokens * ${burndownRate})`,
        usingMetrics: {
          inputTokens: inputTokens,
          cacheWriteTokens: cacheWriteTokens,
          outputTokens: outputTokens,
        },
        label: 'Quota Consumption (Tokens)',
        period: cdk.Duration.minutes(1),
      });

      // Create request count metric
      const invocations = new cloudwatch.Metric({
        namespace: 'AWS/Bedrock',
        metricName: 'Invocations',
        dimensionsMap: {
          ModelId: fullModelId,
        },
        statistic: 'Sum',
        period: cdk.Duration.minutes(1),
      });

      // Wrap quota metrics with FILL to create continuous horizontal lines
      const tokenQuotaLine = new cloudwatch.MathExpression({
        expression: 'FILL(tokenQuota, REPEAT)',
        usingMetrics: {
          tokenQuota: tokenQuotaMetric,
        },
        label: 'Quota Limit (Tokens)',
        color: cloudwatch.Color.RED,
        period: cdk.Duration.minutes(1),
      });

      const requestQuotaLine = new cloudwatch.MathExpression({
        expression: 'FILL(requestQuota, REPEAT)',
        usingMetrics: {
          requestQuota: requestQuotaMetric,
        },
        label: 'Quota Limit (Requests)',
        color: cloudwatch.Color.RED,
        period: cdk.Duration.minutes(1),
      });

      // Add widgets to dashboard with quota metrics on left axis
      dashboard.addWidgets(
        new cloudwatch.GraphWidget({
          title: `${fullModelId} - Token Quota Consumption`,
          left: [quotaTokenUsage, tokenQuotaLine],
          width: 12,
          height: 6,
          leftYAxis: {
            label: 'Quota Units (Tokens/min)',
          },
          period: cdk.Duration.minutes(1),
        }),
        new cloudwatch.GraphWidget({
          title: `${fullModelId} - Request Quota Consumption`,
          left: [invocations, requestQuotaLine],
          width: 12,
          height: 6,
          leftYAxis: {
            label: 'Quota Units (Requests/min)',
          },
          period: cdk.Duration.minutes(1),
        })
      );


    });

    // Log summary of models with missing data
    if (modelsWithMissingQuotas.length > 0) {
      console.warn(`[DASHBOARD_GENERATION_WARNING] Skipped ${modelsWithMissingQuotas.length} dashboard widget(s) due to missing quota codes:`);
      modelsWithMissingQuotas.forEach(model => {
        console.warn(`  - ${model}`);
      });
      console.warn('Dashboard generation continued with remaining models. To fix this, add the missing quota codes to QUOTA_REGISTRY in lib/bedrock-registries.ts');
    }

    if (modelsWithMissingMetadata.length > 0) {
      console.warn(`[DASHBOARD_GENERATION_WARNING] Skipped ${modelsWithMissingMetadata.length} dashboard widget(s) due to missing model metadata:`);
      modelsWithMissingMetadata.forEach(model => {
        console.warn(`  - ${model}`);
      });
      console.warn('Dashboard generation continued with remaining models. To fix this, add the missing models to MODEL_REGISTRY in lib/bedrock-registries.ts');
    }

    const totalConfigured = dashboardConfigs.length;
    const totalSkipped = modelsWithMissingQuotas.length + modelsWithMissingMetadata.length;
    const totalCreated = totalConfigured - totalSkipped;

    if (totalSkipped > 0) {
      console.warn(`[DASHBOARD_GENERATION_SUMMARY] Created ${totalCreated} dashboard widgets, skipped ${totalSkipped} due to missing data (${totalConfigured} total configured)`);
    } else {
      console.log(`[DASHBOARD_GENERATION_SUCCESS] Successfully created ${totalCreated} dashboard widgets for all configured models`);
    }

    // Output dashboard URL
    new cdk.CfnOutput(this, 'DashboardURL', {
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${this.region}#dashboards:name=BedrockQuotaConsumptionByModel`,
      description: 'CloudWatch Dashboard URL',
    });

    new cdk.CfnOutput(this, 'DashboardName', {
      value: dashboard.dashboardName,
      description: 'Dashboard Name',
    });

    // Stack-level suppressions for all IAM issues
    NagSuppressions.addStackSuppressions(this, [
      {
        id: 'AwsSolutions-IAM4',
        reason: 'AWS managed policy AWSLambdaBasicExecutionRole is required for Lambda execution and Custom Resource Provider',
        appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole']
      },
      {
        id: 'AwsSolutions-IAM5',
        reason: 'Service Quotas API and CloudWatch PutMetricData require wildcard permissions as they do not support resource-level permissions. Custom Resource Provider requires Lambda invoke permissions with version suffix wildcard.',
        appliesTo: ['Resource::*', 'Resource::<QuotaFetcher87D05653.Arn>:*']
      }
    ]);
  }
}
