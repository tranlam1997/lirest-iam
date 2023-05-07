import { Registry } from "prom-client";

export function getDefaultMetrics(register: Registry) {
  return {
    app: 'lirest-iam-node-app',
    prefix: 'iam_node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
  }
}