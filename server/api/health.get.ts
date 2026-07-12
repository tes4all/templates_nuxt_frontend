// Liveness/readiness endpoint for Docker HEALTHCHECK and (later) k3s probes.
export default defineEventHandler(() => ({ status: 'ok' }))
