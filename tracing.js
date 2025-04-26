// tracing.js
'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  // 1) Name your service “todo-service” so Jaeger can list it
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'todo-service'
  }),
  // 2) Send spans to Jaeger’s OTLP HTTP endpoint
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces'
  }),
  // 3) Auto-instrument HTTP, Express, MongoDB, etc.
  instrumentations: [
    getNodeAutoInstrumentations()
  ],
});

sdk.start();