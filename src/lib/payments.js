// src/lib/payments.js
// Swappable payment gateway layer.
//
// For production you must replace the mock/simulated gateway below with your
// chosen platform's SDK (e.g. Paystack, Flutterwave, Stripe) and set your
// secret/public keys in environment variables (VITE_PAYMENT_SECRET_KEY,
// VITE_PAYMENT_PUBLIC_KEY, VITE_PAYMENT_GATEWAY).
//
// Flow:
//  1. `createOrder(cart)` -> builds an order + amount (in kobo for most
//     gateways) from the cart.
//  2. `startPayment(order)` -> initializes the gateway and returns a promise
//     that resolves on success, rejects on cancel/timeout.
//  3. On success the app shows a confirmation and waits for a webhook/redirect
//     callback (see `handlePaymentWebhook`) to mark the order paid.

export const PAYMENT_GATEWAY = import.meta.env.VITE_PAYMENT_GATEWAY || "mock";

export const MOCK_GATEWAY = {
  /**
   * Simulates a payment gateway request. In production this is replaced with
   * the real SDK call (createPaymentIntent / initializePayment / redirectToCheckout).
   *
   * Resolves with a fake reference on success, rejects on user cancel or timeout.
   */
  init(order) {
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => {
        // Simulate a cancelled transaction
        reject(new Error("Payment cancelled by user"));
      }, 1200);

      // Simulate the platform returning a reference and a redirect URL
      const simulatedReference = `mck_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const simulatedRedirectUrl = `https://payments.example.com/confirm?order=${order.id}&ref=${simulatedReference}`;

      // Resolve the "gateway" payload
      resolve({
        orderId: order.id,
        reference: simulatedReference,
        redirectUrl: simulatedRedirectUrl,
        status: "pending",
        // In production you would also return a private token / authorization code
        // that you send to your backend webhook to verify the transaction.
        meta: {
          gateway: PAYMENT_GATEWAY,
          createdAt: new Date().toISOString(),
        },
      });
    });
  },
};

/**
 * Format a cart item into a human-readable line.
 */
function formatCartLine({ name, quantity, price }) {
  return `${name} x${quantity} ${price}`;
}

/**
 * Convert a display price like "₦8,990.99" into a gateway amount in kobo.
 * Most payment platforms use the smallest currency unit (kobo, cents, etc.).
 */
function priceToAmount(price) {
  // Strip any currency symbol, thousands separators, and whitespace.
  const cleaned = String(price).replace(/[^0-9.]/g, "");
  const numeric = Number(cleaned);
  if (!Number.isFinite(numeric) || numeric < 0) {
    throw new Error(`Invalid price format: ${price}`);
  }
  return Math.round(numeric * 100); // ₦ -> kobo
}

/**
 * Build an order from the current cart.
 */
export function createOrder(cart, customerEmail = "customer@example.com") {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("Cart is empty.");
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + priceToAmount(item.price) * item.quantity,
    0
  );

  const order = {
    id: `ORD_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    items: cart.map((item) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      amount: priceToAmount(item.price) * item.quantity,
    })),
    lineItems: cart.map(formatCartLine),
    subtotalMinor: subtotal,
    currency: "USD",
    customerEmail,
    status: "pending_payment",
    createdAt: new Date().toISOString(),
  };

  return order;
}

/**
 * Start the payment flow. Replace the mock gateway with your platform SDK.
 */
export async function startPayment(order) {
  if (PAYMENT_GATEWAY === "mock") {
    return MOCK_GATEWAY.init(order);
  }

  throw new Error(
    `Unsupported PAYMENT_GATEWAY "${PAYMENT_GATEWAY}". Configure VITE_PAYMENT_GATEWAY in your env.`
  );
}

/**
 * Handle a payment confirmation callback. This is called when your frontend
 * receives the redirect/return from the gateway (or when your backend
 * receives the webhook). In a real integration you would verify the
 * transaction on your server before marking the order as paid.
 */
export function handlePaymentWebhook(payload) {
  // Example payload from a gateway:
  // { order_id: "ORD_...", reference: "...", status: "successful" }
  const orderId = payload.order_id || payload.orderId;
  const reference = payload.reference || payload.reference;
  const status = payload.status || payload.status;

  if (!orderId || !reference || !status) {
    throw new Error("Invalid payment webhook payload.");
  }

  return {
    orderId,
    reference,
    status,
    receivedAt: new Date().toISOString(),
  };
}
