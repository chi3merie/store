import { useState } from "react";
import "./App.css";

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

export default function Shop() {
  const [notice, setNotice] = useState("");

  function flash(productName) {
    setNotice(productName + " added to your cart!");
    window.setTimeout(() => setNotice(""), 2500);
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
          <a className="cart-button" href="#shop"><span>Bag</span><span className="cart-label">Shop</span></a>
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
          <div><span>◇</span><div><strong>Quality first</strong><p>Products picked with care</p></div></div>
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
                  <button className="quick-add" onClick={() => flash(product.name)}>+ Add to cart</button>
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
          <div className="footer-column"><strong>Customer care</strong><a href="mailto:hello@example.com">Contact us</a><a href="#footer">Shipping information</a><a href="#footer">Returns & refunds</a></div>
          <div className="footer-column"><strong>Stay connected</strong><p>Good finds. Good vibes. Always.</p><a href="#home">Back to top</a></div>
        </div>
        <div className="footer-bottom"><span>(c) 2026 LuxeCart. All rights reserved.</span><span>Made for the things you love.</span></div>
      </footer>
      {notice && <div className="toast" role="status"><span>✓</span>{notice}</div>}
    </div>
  );
}
