import "./app.css";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./navigation/ProtectedRoute";
import { CssBaseline } from "@mui/material";
import CustomSnackbar from "./components/CustomSnackbar";
import { ADMIN_ROUTE } from "./navigation/routes/adminRoutes";
import { LANDING_ROUTE } from "./navigation/routes/landingRoutes";
import { LOGIN_ROUTE } from "./navigation/routes/loginRoutes";
import HomePage from "./pages/HomePage"
const LoginPage = React.lazy(() => import("./pages/Admin/Login"));
const DashBoard = React.lazy(() => import("./pages/Admin/DashBoard"));

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
        <Route
        path={LANDING_ROUTE.home}
        element={
          <Suspense fallback={<div>Loading</div>}>
        <ProtectedRoute>

          <HomePage />
        </ProtectedRoute>

          </Suspense>
        }
        />
        <Route
        path={LOGIN_ROUTE.login}
        element={
          <Suspense fallback={<div>Loading</div>}>
          <ProtectedRoute>
          <LoginPage />
          </ProtectedRoute>
          </Suspense>
        }
        />
          <Route
            path={ADMIN_ROUTE.dashboard}
            element={
              <Suspense fallback={<div>Loading</div>}>
                <DashBoard />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <CustomSnackbar />
    </div>
  );
};

export default App;
