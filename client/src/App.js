import "./app.css";
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnprotectedRoute from "./navigation/UnprotectedRoute";
import ProtectedRoute from "./navigation/ProtectedRoute";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import CustomSnackbar from "./components/CustomSnackbar";
import Loader from "./components/Loader"
import { ADMIN_ROUTE } from "./navigation/routes/adminRoutes";
import { LANDING_ROUTE } from "./navigation/routes/landingRoutes";
import { LOGIN_ROUTE } from "./navigation/routes/loginRoutes";
import HomePage from "./pages/HomePage";
const LoginPage = React.lazy(() => import("./pages/Admin/Login"));
const AdminDashBoard = React.lazy(() => import("./pages/Admin/AdminDashBoard"));
const StudentDashBoard = React.lazy(() => import("./pages/Admin/StudentDashBoard"));

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d2164d",
      },
    },
  });
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route
              path={LANDING_ROUTE.home}
              element={
                  <UnprotectedRoute>
                    <HomePage />
                  </UnprotectedRoute>
              }
            />
            <Route
              path={LOGIN_ROUTE.login}
              element={
                <Suspense fallback={<Loader/>}>
                  <UnprotectedRoute>
                    <LoginPage />
                  </UnprotectedRoute>
                </Suspense>
              }
            />
            <Route
              path={ADMIN_ROUTE.adminDashboard}
              element={
                <Suspense fallback={<Loader/>}>
                  <ProtectedRoute>
                    <AdminDashBoard />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path={ADMIN_ROUTE.studentDashboard}
              element={
                <Suspense fallback={<Loader/>}>
                  <ProtectedRoute>
                    <StudentDashBoard />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
        <CustomSnackbar />
      </ThemeProvider>
    </div>
  );
};

export default App;
