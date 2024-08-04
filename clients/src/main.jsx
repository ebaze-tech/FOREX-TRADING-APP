/* eslint-disable react/jsx-no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet
  // Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import Register from "./components/RegisterPage.jsx";
import Login from "./components/Login.jsx";
// import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import CreateSubscription from "./components/CreateSubscription.jsx";
import DeleteSubscription from "./components/DeleteSubscription.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import PaymentFailure from "./components/PaymentFailure.jsx";
import Course from "./components/Course.jsx";
import UpdateSubscription from "./components/UpdateSubscription.jsx";
import ViewAllSubscriptions from "./components/ViewAllSubscriptions.jsx";
import ViewSubscription from "./components/ViewSubscription.jsx";
import PaymentCallback from "./components/PaymentCallback.jsx";
import NotFoundPage from "./components/NotFoundPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-subscription" element={<CreateSubscription />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        {/* <Route path="/dashboard" element={<CreateSubscription />} /> */}
        <Route path="/payment/failed" element={<PaymentFailure />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/course" element={<Course />} />
        <Route path="/payment/callback" element={<PaymentCallback />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
