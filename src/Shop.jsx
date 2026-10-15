import { useState } from "react";
import "./App.css";
import { createOrder, startPayment } from "./lib/payments.js";

const products = [
  {
    id: 1,
    name: "Classic White Sneakers",
    category: "Fashion",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Minimalist Wristwatch",
    category: "Accessories",
    price: "$149.99",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Premium Headphones",
    category: "Electronics",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Everyday Leather Bag",
    category: "Accessories",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
  },
];

function formatMoney(amountMinor, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100);
}

export default function Shop() {
  const [notice, setNotice] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(null); // created order, awaiting payment
  const [payment, setPayment] = useState({ status: "idle", reference: null, error: null });

  function flash(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    flash(product.name + " added to your cart!");
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalMinor = cart.reduce((sum, item) => {
    const numeric = Number(String(item.price).replace(/[^0-9.]/g, ""));
    return sum + Math.round(numeric * 100) * item.quantity;
  }, 0);

  // Activated when the "Continue to checkout" button is clicked.
  function openCheckout() {
    if (cart.length === 0) {
      flash("Your cart is empty.");
      return;
    }
    let order;
    try {
      order = createOrder(cart);
    } catch (err) {
      flash(err.message);
      return;
    }
    setPayment({ status: "idle", reference: null, error: null });
    setCheckout(order);
    setCartOpen(false);
  }

  async function handlePayment() {
    if (!checkout) return;
    setPayment({ status: "processing", reference: null, error: null });
    try {
      const result = await startPayment(checkout);
      setPayment({ status: "success", reference: result.reference, error: null });
      setCart([]);
    } catch (err) {
      setPayment({ status: "error", reference: null, error: err.message });
    }
  }

  function closeCheckout() {
    setCheckout(null);
    setPayment({ status: "idle", reference: null, error: null });
  }

  return (
    <div className="store">
      <div className="announcement">Free shipping on orders over $100 * Discover your next favorite.</div>
      <header className="header">
        <a className="logo" href="#home">luxe<span>cart.</span></a>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="/about">About</a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <span>Bag</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">THE EVERYDAY COLLECTION - 2026</span>
            <h1>Good things.<br />Great <span>finds.</span></h1>
            <p>Thoughtfully picked essentials for the way you live, work, and express yourself.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#shop">Explore collection <span>-&gt;</span></a>
              <span className="hero-note">Quality you love. Prices you'll love more.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=85" alt="Curated fashion collection" />
            </div>
          </div>
        </section>

        <section className="benefits" aria-label="Store benefits">
          <div><span>↗</span><div><strong>Free shipping</strong><p>On orders over $100</p></div></div>
          <div><span>◈</span><div><strong>Quality first</strong><p>Products picked with care</p></div></div>
          <div><span>↺</span><div><strong>Easy returns</strong><p>Shop with confidence</p></div></div>
          <div><span>♡</span><div><strong>Made for you</strong><p>Everyday favorites</p></div></div>
        </section>

        <section className="category-section" id="categories">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</span>
              <h2>Shop by category</h2>
            </div>
          </div>
          <div className="category-grid">
            <a className="category-card category-fashion" href="#shop"><span>01 / STYLE</span><strong>Fashion</strong><span className="category-arrow">↗</span></a>
            <a className="category-card category-electronics" href="#shop"><span>02 / TECH</span><strong>Electronics</strong><span className="category-arrow">↗</span></a>
            <a className="category-card category-accessories" href="#shop"><span>03 / DETAILS</span><strong>Accessories</strong><span className="category-arrow">↗</span></a>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading shop-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>The good stuff<span className="heading-dot">.</span></h2>
              <p className="section-description">Good quality, great design, and prices that make sense.</p>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <button className="quick-add" onClick={() => addToCart(product)}>+ Add to cart</button>
                </div>
                <div className="product-info">
                  <div className="product-meta"><span>{product.category}</span><span className="rating">★ 4.8</span></div>
                  <h3>{product.name}</h3>
                  <div className="price-row"><strong>{product.price}</strong></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer-top">
          <div className="footer-brand"><a className="logo" href="#home">luxe<span>cart.</span></a><p>Everyday essentials.<br />Extraordinary little finds.</p></div>
          <div className="footer-column"><strong>Explore</strong><a href="#shop">All products</a><a href="#categories">Categories</a><a href="/about">About</a></div>
          <div className="footer-column"><strong>Customer care</strong><a href="mailto:hello@example.com">Contact us</a><a href="#footer">Shipping information</a><a href="#footer">Returns &amp; refunds</a></div>
          <div className="footer-column"><strong>Stay connected</strong><p>Good finds. Good vibes. Always.</p><a href="#home">Back to top</a></div>
        </div>
        <div className="footer-bottom"><span>(c) 2026 LuxeCart. All rights reserved.</span><span>Made for the things you love.</span></div>
      </footer>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()} aria-label="Shopping cart">
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>Shopping bag</h2>
              </div>
              <button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>🛍️</span>
                <h3>Your bag is empty</h3>
                <p>Looks like you haven't added anything yet.<br />Explore the collection to get started.</p>
                <button className="primary-button" onClick={() => setCartOpen(false)}>Continue shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <span>{item.category}</span>
                        <h3>{item.name}</h3>
                        <strong>{item.price}</strong>
                        <div className="quantity-control">
                          <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => removeItem(item.id)} aria-label="Remove item">×</button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>{formatMoney(subtotalMinor)}</strong></div>
                  <div><span>Shipping</span><strong>{subtotalMinor >= 10000 ? "Free" : formatMoney(999)}</strong></div>
                  <div className="cart-total"><span>Total</span><strong>{formatMoney(subtotalMinor >= 10000 ? subtotalMinor : subtotalMinor + 999)}</strong></div>
                  <button className="checkout-button" onClick={openCheckout}>Continue to checkout</button>
                  <p>Secure checkout. You'll be redirected to our payment partner.</p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkout && (
        <div className="cart-overlay" onClick={closeCheckout}>
          <aside className="cart-drawer checkout-drawer" onClick={(e) => e.stopPropagation()} aria-label="Checkout">
            <div className="cart-header">
              <div>
                <span className="eyebrow">SECURE CHECKOUT</span>
                <h2>Payment</h2>
              </div>
              <button className="close-button" onClick={closeCheckout} aria-label="Close checkout">×</button>
            </div>

            {payment.status === "success" ? (
              <div className="cart-empty">
                <span>✅</span>
                <h3>Payment successful</h3>
                <p>Thank you for your order.<br />Reference: <strong>{payment.reference}</strong></p>
                <button className="primary-button" onClick={closeCheckout}>Continue shopping</button>
              </div>
            ) : (
              <div className="checkout-panel">
                <div className="checkout-order-id"><span>Order</span><strong>{checkout.id}</strong></div>

                <div className="checkout-items">
                  {checkout.items.map((item) => (
                    <div key={item.productId}>
                      <span>{item.name} × {item.quantity}</span>
                      <strong>{formatMoney(item.amount)}</strong>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-total"><span>Amount due</span><strong>{formatMoney(checkout.subtotalMinor)}</strong></div>
                </div>

                {payment.status === "error" && (
                  <p className="checkout-error">{payment.error} — please try again.</p>
                )}

                <button className="checkout-button" onClick={handlePayment} disabled={payment.status === "processing"}>
                  {payment.status === "processing" ? "Processing payment…" : `Pay ${formatMoney(checkout.subtotalMinor)}`}
                </button>
                <p>You'll complete payment on our secure payment partner.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      {notice && <div className="toast" role="status"><span>✓</span>{notice}</div>}
    </div>
  );
}
