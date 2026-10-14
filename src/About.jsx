import "./App.css";

export default function About() {
  return (
    <div className="store">
      <div className="announcement">Free shipping on orders over $100 * Discover your next favorite.</div>
      <header className="header">
        <a className="logo" href="/">luxe<span>cart.</span></a>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/#shop">Shop</a>
          <a href="/#categories">Categories</a>
          <a href="/about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero about-hero">
          <div className="hero-content">
            <span className="eyebrow">ABOUT LUXECART</span>
            <h1>Good finds, chosen with care.</h1>
            <p>
              LuxeCart brings together everyday essentials with clean design,
              fair prices, and a shopping experience that feels simple from
              first look to checkout.
            </p>
            <p>
              We imagined a more thoughtful way to shop: curated products,
              honest value, and a brand experience that feels elevated without
              being complicated. Every item in our collection is selected to help
              customers build a home, routine, and style they genuinely love.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/#shop">Shop collection <span>-&gt;</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=85"
                alt="Curated shop interior"
              />
            </div>
          </div>
        </section>

        <section className="about-story">
          <div>
            <h2>Our story</h2>
            <p>
              LuxeCart began with a simple idea: shopping should feel inspiring,
              personal, and easy. We wanted to create a place where quality and
              practicality meet modern design, giving people the confidence to
              choose pieces that add comfort, beauty, and function to everyday life.
            </p>
            <p>
              From home essentials to signature accessories, we focus on the
              details that make a product worth keeping. Whether someone is
              refreshing a room, upgrading a routine, or discovering a new favorite,
              we aim to make that experience joyful and stress-free.
            </p>
          </div>

          <div>
            <h2>Why people shop with us</h2>
            <ul>
              <li>Curated collections chosen for quality and lifestyle value.</li>
              <li>Clean, modern pieces that work beautifully in real homes.</li>
              <li>Friendly service and a straightforward shopping experience.</li>
              <li>Thoughtful details that make everyday essentials feel special.</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer" id="footer">
        <div className="footer-bottom">
          <span>(c) 2026 LuxeCart. All rights reserved.</span>
          <span>Made for the things you love.</span>
        </div>
      </footer>
    </div>
  );
}
