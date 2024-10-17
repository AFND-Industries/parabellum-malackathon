import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage.jsx";
import RecevoirPage from "./pages/RecevoirPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import HeaderPage from "./components/HeaderComponent.jsx";
import Footer from "./components/FooterComponent.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ResultPage from "./pages/ResultPage.jsx";
import { RecevoirProvider } from "./context/RecevoirContext.jsx";

createRoot(document.getElementById("root")).render(
  <RecevoirProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/recevoir" element={<RecevoirPage />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </RecevoirProvider>
);
