// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { ReactNode } from "react";

// Import your AuthProvider and useAuth hook
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import the setup function for axios interceptors AND the axiosInstance itself
import { setupAxiosInterceptors } from "./api/axiosInstance";
import axiosInstance from "./api/axiosInstance"; // IMPORTANT: Import axiosInstance here for ejecting

// Import your pages
import Index from "./pages/Index"; // Your homepage now contains Login/Register
import CompleleteForm from "./pages/completeUserProfile";
import Dashboard from "./pages/Dashboard"; // This will be the general user dashboard
import Assessment from "./pages/Assessment";
import Report from "./pages/Report";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers/AdminUsers";
import AdminLevels from "./pages/admin/AdminLevels/AdminLevels";
import AdminQuizzes from "./pages/admin/AdminQuizzes/AdminQuizzes";
import AdminSkills from "./pages/admin/AdminSkills/AdminSkills";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// --- Helper Component for Protected Routes (No change here, but its usage is removed for admin routes) ---
interface ProtectedRouteProps {
  children: ReactNode;
  allowedUserTypes?: Array<"premium" | "basic" | "admin">;
  requiresProfileCompletion?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedUserTypes,
  requiresProfileCompletion,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiresProfileCompletion && user && !user.hasCompleteProfile) {
    return <Navigate to="/complete-profile" replace />;
  }

  if (allowedUserTypes && user && !allowedUserTypes.includes(user.userType)) {
    console.warn(
      `User with type '${user.userType}' attempted to access restricted route. Redirecting.`
    );
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
// --- End Helper Component ---

// --- Component to set up Axios Interceptors with `useAuth` (No change here) ---
const AxiosInterceptorSetup: React.FC = () => {
  const { logout } = useAuth();

  React.useEffect(() => {
    const interceptorId = setupAxiosInterceptors(logout);
    return () => {
      axiosInstance.interceptors.response.eject(interceptorId);
    };
  }, [logout]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AxiosInterceptorSetup />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* The quiz route below is currently unprotected. If you want it protected, uncomment the ProtectedRoute wrapper */}
            <Route path="/assessmnt" element={<Assessment />} />

            {/* Profile Completion Route - Protected and redirects if profile is already complete */}
            <Route
              path="/complete-profile"
              element={
                <ProtectedRoute requiresProfileCompletion={true}>
                  <CompleleteForm />
                </ProtectedRoute>
              }
            />
            {/* General User Dashboard - Accessible by basic, premium, and admin users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedUserTypes={["basic", "premium", "admin"]}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute
                  allowedUserTypes={["basic", "premium", "admin"]}
                >
                  <Report />
                </ProtectedRoute>
              }
            />
            {/* Admin Routes - NOW COMMENTED OUT FOR DEMO */}
            <Route
              path="/admin"
              element={
                // <ProtectedRoute allowedUserTypes={["admin"]}>
                <AdminDashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                // <ProtectedRoute allowedUserTypes={["admin"]}>
                <AdminUsers />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/levels"
              element={
                // <ProtectedRoute allowedUserTypes={["admin"]}>
                <AdminLevels />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/quizzes"
              element={
                // <ProtectedRoute allowedUserTypes={["admin"]}>
                <AdminQuizzes />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/skills"
              element={
                // <ProtectedRoute allowedUserTypes={["admin"]}>
                <AdminSkills />
                // </ProtectedRoute>
              }
            />
            {/* Catch-all for undefined routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
