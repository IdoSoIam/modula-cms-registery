import type { ModuleContext, PaymentsModuleHandlers } from "./types"

export async function handlePaymentsModule(
  context: ModuleContext,
  handlers: PaymentsModuleHandlers
) {
  const { request, url, env } = context

  if (url.pathname === "/v1/payments/config" && request.method === "GET") {
    return await handlers.getInstancePaymentConfig(request, env)
  }

  if (url.pathname === "/v1/payments/config" && request.method === "PUT") {
    return await handlers.updateInstancePaymentConfig(request, env)
  }

  if (url.pathname === "/v1/payments/checkout" && request.method === "POST") {
    return await handlers.createStripeConnectCheckout(request, env)
  }

  const paymentSessionMatch = url.pathname.match(/^\/v1\/payments\/sessions\/([^/]+)$/)
  if (paymentSessionMatch && request.method === "GET") {
    return await handlers.getPaymentStatusBySession(request, env, decodeURIComponent(paymentSessionMatch[1]!))
  }

  const paymentOrderMatch = url.pathname.match(/^\/v1\/payments\/orders\/([^/]+)$/)
  if (paymentOrderMatch && request.method === "GET") {
    return await handlers.getPaymentStatusByOrder(request, env, decodeURIComponent(paymentOrderMatch[1]!))
  }

  if (url.pathname === "/v1/payments/webhooks/stripe" && request.method === "POST") {
    return await handlers.handleStripeWebhook(request, env)
  }

  return null
}
