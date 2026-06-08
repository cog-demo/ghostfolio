/**
 * Configuration validator for service deployments.
 *
 * Ensures required environment variables and config files are present
 * before starting services.
 *
 * TODO: Add JSON schema validation for service configs
 */

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const REQUIRED_ENV_VARS = [
  'NODE_ENV',
  'DATABASE_URL',
  'REDIS_URL',
  'API_SECRET_KEY',
];

const OPTIONAL_ENV_VARS = [
  'LOG_LEVEL',
  'SENTRY_DSN',
  'DATADOG_API_KEY',
  'FEATURE_FLAG_SERVICE_URL',
];

export function validateConfig(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  }

  // Check optional variables
  for (const envVar of OPTIONAL_ENV_VARS) {
    if (!process.env[envVar]) {
      warnings.push(`Optional environment variable not set: ${envVar}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
