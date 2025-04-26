// tracing.js
'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'todo-service'
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces'
  }),
  instrumentations: [
    getNodeAutoInstrumentations()
  ],
});

sdk.start();
