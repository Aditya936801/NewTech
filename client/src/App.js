import "./app.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import Wrapper from "./components/Wrapper"
import LoginPage from "./pages/Admin/Login";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Wrapper><HomePage /></Wrapper>} />
          <Route path="/home" element={<Wrapper><HomePage /></Wrapper>} />
          <Route path="/admin" element={<LoginPage />} />
          
        </Routes>
        </BrowserRouter>
       
    </div>
  );
};

export default App;
