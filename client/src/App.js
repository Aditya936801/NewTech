import "./app.css";
import React, { Suspense } from "react";
import { BrowserRouter,  Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactUs from "./pages/ContactUs";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import Wrapper from "./components/Wrapper";
const LoginPage = React.lazy(() => import("./pages/Admin/Login"));
const DashBoard = React.lazy(() => import("./pages/Admin/DashBoard"));

const App = () => {
  const isAuth = Boolean(useSelector(state=>state.token))
  const admin = useSelector(state=>state.admin)
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route
          
            path="/"
            element={
              isAuth?admin?.isMaster?<Navigate to="/admin/dashboard"/>:<></>:

              <Suspense fallback={<div>Loading</div>}>
                <Wrapper>
                  <HomePage />
                </Wrapper>
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<div>Loading</div>}>
                <Wrapper>
                  <ContactUs />
                </Wrapper>
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              isAuth?admin?.isMaster?<Navigate to="/admin/dashboard"/>:<></>:
              <Suspense fallback={<div>Loading</div>}>
                 <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isAuth?
              <Suspense fallback={<div>Loading</div>}>
                 <DashBoard />
              </Suspense>:<Navigate to="/"/>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
