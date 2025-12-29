#!/bin/bash

# Script to find Bedrock model quota codes
# Usage: ./scripts/find-model-quotas.sh

echo "Fetching Bedrock Service Quotas..."
echo ""
echo "Token-related quotas (TPM = Tokens Per Minute):"
echo "================================================"
echo ""

aws service-quotas list-service-quotas \
  --service-code bedrock \
  --query 'Quotas[?contains(QuotaName, `token`) || contains(QuotaName, `Token`) || contains(QuotaName, `TPM`)].{Code:QuotaCode,Value:Value,Name:QuotaName}' \
  --output table

echo ""
echo "To use these in your CDK stack:"
echo "1. Find the quota code (L-xxxxxxxx) for your model"
echo "2. Update lib/cdk-quota-dashboards-stack.ts"
echo "3. Replace 'L-xxxxx' with the actual code"
echo ""
echo "Example:"
echo "  quotaCode: 'L-12345678'  // InvokeModel tokens per minute for Nova Lite"
