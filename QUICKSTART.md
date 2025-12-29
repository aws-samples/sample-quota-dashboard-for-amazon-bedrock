# Quick Start Guide

**Estimated time: 5-10 minutes**

This guide walks you through deploying the Bedrock Quota Dashboard in three steps.

## 1. Install & Deploy

```bash
npm install
npm run build
npx cdk deploy
```

## 2. View Dashboard

After deployment, use the Dashboard URL from the output to view your Bedrock quota monitoring.

## 3. Add New Models (Optional)

Most models are pre-configured. To add new ones:

1. Get quota codes: `npx ts-node scripts/get-quota-codes.ts > quota-codes.txt`
2. Add to `MODEL_REGISTRY` and `QUOTA_REGISTRY` in `lib/bedrock-registries.ts`
3. Add the models to the dashboard config in `lib/cdk-quota-dashboards-stack.ts`
4. Redeploy: `npx cdk deploy`

## What You Get

- CloudWatch Dashboard with quota monitoring for 80+ Bedrock models
- Red quota limit lines on graphs
- Automatic quota refresh every 2.9 hours

## 4. Cleanup (Optional)

To remove all resources and avoid charges:

```bash
npx cdk destroy
```

**Cost if left running:** ~$12/month (see [README.md](./README.md#cost-considerations) for details)

See [README.md](./README.md) for full documentation.
