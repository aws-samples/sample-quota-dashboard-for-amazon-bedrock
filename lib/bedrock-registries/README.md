# Bedrock Model Registry - Region-Specific Architecture

This directory contains region-specific Bedrock model registries with type-safe quota code management.

## Architecture

- **Main file**: `../bedrock-registries.ts` - Imports from the selected region
- **Region files**: `us-east-1.ts`, `us-west-2.ts`, etc. - Complete model registries for each region
- **Type safety**: Full TypeScript validation for supported endpoints and quota codes

## Model Registry & Configuration

### Type-Safe Model Access

The new registry provides type-safe access to model configurations:

```typescript
// Direct property access with full type safety
const model = BEDROCK_MODELS.AMAZON.NOVA_LITE_V1;
console.log(model.modelId);                    // 'amazon.nova-lite-v1:0'
console.log(model.outputTokenBurndownRate);    // 1
console.log(model.regional?.tokenQuotaCode);   // 'L-70423BF8'
console.log(model.crossRegion?.requestQuotaCode); // 'L-89F8391A'

// TypeScript prevents invalid access at compile time
// model.globalCrossRegion  // ❌ Compile error - not supported!
```

### Advanced Usage Examples

```typescript
import { BEDROCK_MODELS, getQuotaCodes } from '../bedrock-registries';

// Type-safe access to model properties
const model = BEDROCK_MODELS.AMAZON.NOVA_LITE_V1;
console.log(model.modelId); // 'amazon.nova-lite-v1:0'
console.log(model.outputTokenBurndownRate); // 1

// Direct access to quota codes with full type safety
const regionalQuota = model.regional?.tokenQuotaCode; // 'L-70423BF8'
const crossRegionQuota = model.crossRegion?.requestQuotaCode; // 'L-89F8391A'

// Check supported endpoints
const supportsRegional = model.supportedEndpoints.includes('regional'); // true
const supportsGlobal = model.supportedEndpoints.includes('global-cross-region'); // false

// Helper function for dynamic access
const quotaCodes = getQuotaCodes(model, 'cross-region');
console.log(quotaCodes?.tokenQuotaCode); // 'L-7C42E72A'

// TypeScript will prevent invalid access
// const invalid = model.globalCrossRegion; // ❌ TypeScript error - not supported!
```

## Region-Specific Deployment

### Current Region: US-West-2

To deploy to a different region:

1. **Update region import in `../bedrock-registries.ts`:**
   
   **CRITICAL:** You must update the import to match your target region. Open `lib/bedrock-registries.ts` and:
   
   ```typescript
   // CURRENT (US-West-2):
   export * from './bedrock-registries/us-west-2';
   
   // TO CHANGE REGION (e.g., US-East-1):
   // export * from './bedrock-registries/us-west-2';  // ❌ Comment out current
   export * from './bedrock-registries/us-east-1';     // ✅ Uncomment target region
   ```

2. **Update dashboard configs in `lib/cdk-quota-dashboards-stack.ts`:**
   
   The `allDashboardConfigs` array must use endpoint types that are supported in your target region's registry. Models may support different endpoints in different regions (e.g., a model might have `regional` in eu-west-2 but only `cross-region` in us-east-1). The stack validates this at deploy time and will error if there's a mismatch.

3. **Deploy with explicit region:**
   ```bash
   AWS_DEFAULT_REGION=your-target-region npx cdk deploy
   ```

4. **For new regions:** Create region-specific quota file using:
   ```bash
   AWS_DEFAULT_REGION=your-region npx ts-node scripts/get-quota-codes.ts
   ```

### ⚠️ Important Notes

- **Registry import must match deployment region** - mismatched regions will use incorrect quota codes
- **Dashboard configs must match the registry** - endpoint types in `allDashboardConfigs` must be supported by the active region's registry
- **Use `AWS_DEFAULT_REGION=` prefix** for deployment commands
- **Only one region import should be active** - comment out all others to avoid conflicts
- **Quota codes are region-specific** - using wrong region's codes will cause monitoring failures

## Model Configuration Structure

Each model configuration includes:

```typescript
interface ModelConfig {
  modelId: string;                    // Full Bedrock model ID
  outputTokenBurndownRate: number;    // Correct multiplier based on AWS Documentation
                                     // https://docs.aws.amazon.com/bedrock/latest/userguide/quotas-token-burndown.html
  supportedEndpoints: EndpointType[]; // Supported endpoint types
  regional?: QuotaCodes;              // Regional quota codes (if supported)
  crossRegion?: QuotaCodes;           // Cross-region quota codes (if supported)
  globalCrossRegion?: QuotaCodes;     // Global cross-region quota codes (if supported)
}
```

## Adding New Models

### 1. Add to Region-Specific Registry

In `lib/bedrock-registries/us-east-1.ts` (or your target region):

```typescript
YOUR_NEW_MODEL: createModelConfig({
  modelId: 'provider.model-name-v1:0',
  outputTokenBurndownRate: 1, // https://docs.aws.amazon.com/bedrock/latest/userguide/quotas-token-burndown.html
  supportedEndpoints: ['regional', 'cross-region'],
  regional: { 
    tokenQuotaCode: 'L-xxxxxxxx', 
    requestQuotaCode: 'L-yyyyyyyy' 
  },
  crossRegion: { 
    tokenQuotaCode: 'L-zzzzzzzz', 
    requestQuotaCode: 'L-wwwwwwww' 
  }
})
```

### 2. Configure Dashboard

In `lib/cdk-quota-dashboards-stack.ts`:

```typescript
const allDashboardConfigs: DashboardConfig[] = [
  // ... existing configs
  { modelConfig: BEDROCK_MODELS.YOUR_PROVIDER.YOUR_NEW_MODEL, endpointType: 'regional' }
];
```

### 3. Validation & Type Safety

The system automatically validates:
- ✅ **Endpoint Support**: Can't use unsupported endpoint types
- ✅ **Quota Code Format**: Must match `L-xxxxxxxx` pattern  
- ✅ **Model Completeness**: All required properties must be present
- ✅ **Compile-Time Errors**: TypeScript catches configuration mistakes

**Find quota codes:** `npx ts-node scripts/get-quota-codes.ts` (saves to timestamped file)

## Benefits

- **Type Safety**: Compile-time validation of endpoint support
- **Autocomplete**: Full IDE support for model properties
- **Region Clarity**: Explicit region selection in code
- **Easy Deployment**: One-line change to switch regions
- **Maintainable**: Clear separation of region-specific data

## File Structure

```
lib/bedrock-registries/
├── README.md           # This file
├── us-east-1.ts       # US East 1 quota codes
├── us-west-2.ts       # US West 2 quota codes (when created)
└── eu-west-1.ts       # EU West 1 quota codes (when created)
```