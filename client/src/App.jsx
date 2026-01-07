import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import DeveloperBadge from "./components/DeveloperBadge.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Customize from "./pages/Customize.jsx";
import CustomizeCategory from "./pages/CustomizeCategory.jsx";
import CustomizeProduct from "./pages/CustomizeProduct.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import AboutDeveloper from "./pages/AboutDeveloper.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const location = useLocation();
  const isDeveloperPage = location.pathname === "/about-developer";

  return (
    <div className="min-h-screen flex flex-col">
      {isDeveloperPage ? null : <Navbar />}
      <main className={`flex-1 ${isDeveloperPage ? "" : "pt-24"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/customize/:category" element={<CustomizeCategory />} />
          <Route
            path="/customize/:category/:productId"
            element={<CustomizeProduct />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-developer" element={<AboutDeveloper />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isDeveloperPage ? null : <Footer />}
      {isDeveloperPage ? null : <DeveloperBadge />}
    </div>
  );
}
