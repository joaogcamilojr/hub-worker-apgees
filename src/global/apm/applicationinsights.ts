import { useAzureMonitor } from '@azure/monitor-opentelemetry';

const isInitAppInsights = !(
	process.env.APPLICATIONINSIGHTS_CONNECTION_STRING === undefined ||
	process.env.APPLICATIONINSIGHTS_CONNECTION_STRING === ''
);

if (isInitAppInsights) useAzureMonitor();
