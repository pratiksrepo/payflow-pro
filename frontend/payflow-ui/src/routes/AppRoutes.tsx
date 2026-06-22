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

import AdminDashboardPage
    from "../pages/AdminDashboardPage";

import AdminRoute from "./AdminRoute";

import RoleRoute
    from "./RoleRoute";
import AdminUsersPage from "../pages/AdminUsersPage";

export default function AppRoutes() {
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

                    <Route
                        path="payments"
                        element={
                            <PaymentsPage />
                        }
                    />

                    <Route
                        path="wallet"
                        element={
                            <WalletPage />
                        }
                    />

                    <Route
                        path="notifications"
                        element={
                            <NotificationsPage />
                        }
                    />

                    <Route
                        path="admin"
                        element={
                            <RoleRoute
                                allowedRole="Admin"
                            >
                                <AdminDashboardPage />
                            </RoleRoute>
                        }
                    />

                    <Route
                        path="users"
                        element={
                            <RoleRoute
                                allowedRole="Admin"
                            >
                                <AdminUsersPage />
                            </RoleRoute>
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}