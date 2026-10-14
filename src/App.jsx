import Shop from "./Shop.jsx";
import About from "./About.jsx";

export default function App() {
  if (window.location.pathname === "/about") {
    return <About />;
  }

  return <Shop />;
}
