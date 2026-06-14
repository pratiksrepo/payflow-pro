import {
    BrowserRouter,
    Route,
    Routes
}
from "react-router-dom";

import LoginPage
from "../pages/auth/LoginPage";

import RegisterPage
from "../pages/auth/RegisterPage";

import DashboardPage
from "../pages/DashboardPage";

import DashboardLayout
from "../components/layouts/DashboardLayout";

import ProtectedRoute
from "./ProtectedRoute";

import PaymentsPage
from "../pages/PaymentsPage";

import WalletPage
from "../pages/WalletPage";

import NotificationsPage
from "../pages/NotificationsPage";

export default function AppRoutes()
{
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <LoginPage />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <RegisterPage />
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <DashboardPage />
                        }
                    />
                </Route>

                <Route
    path="payments"
    element={<PaymentsPage />}
/>

<Route
    path="wallet"
    element={<WalletPage />}
/>

<Route
    path="notifications"
    element={<NotificationsPage />}
/>

            </Routes>

        </BrowserRouter>
    );
}