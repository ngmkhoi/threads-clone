import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';

import Login from "@/pages/Auth/Login.jsx";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import AuthLayout from "@/layouts/AuthLayout/";
import Register from "@/pages/Auth/Register.jsx";
import PrivateRoute from "@/components/AppRoute/PrivateRoute";
import SplashScreen from "@/components/Common/SplashScreen";

// Lazy load non-critical routes
const NotFound = lazy(() => import("@/pages/NotFound"));
const Profile = lazy(() => import("@/pages/Profile"));
const Activity = lazy(() => import("@/pages/Activity"));
const VerifyEmail = lazy(() => import("@/pages/Auth/VerifyEmail.jsx"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword.jsx"));
const PostDetail = lazy(() => import("@/pages/PostDetail"));
const EmbedLayout = lazy(() => import("@/layouts/EmbedLayout"));
const Embed = lazy(() => import("@/pages/Embed"));


export default function AppRoute() {
    return (
        <Suspense fallback={<SplashScreen />}>
            <Routes>
                {/* Default Layout */}
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    
                    <Route element={<PrivateRoute />}>
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Route>

                {/* Auth Layout */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verify-email" element={<VerifyEmail />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                </Route>

                {/* Embed Route - for iframe embedding */}
                <Route path="/:username/post/:postId/embed" element={<EmbedLayout />}>
                    <Route index element={<Embed />} />
                </Route>

                {/*NotFound*/}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}