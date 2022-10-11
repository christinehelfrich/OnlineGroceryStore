import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "./pages/Profile";
import { CartItem } from "./components/CartItem";
import { useEffect, useState } from "react";

function App() {
  const { isAuthenticated } = useAuth0();
  /*
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  */

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
