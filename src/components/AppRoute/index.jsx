import { Route, Routes } from "react-router-dom";

import Login from "@/pages/Auth/Login.jsx";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Activity from "@/pages/Activity";
import AuthLayout from "@/layouts/AuthLayout/";
import Register from "@/pages/Auth/Register.jsx";
import VerifyEmail from "@/pages/Auth/VerifyEmail.jsx";
import ForgotPassword from "@/pages/Auth/ForgotPassword.jsx";
import ResetPassword from "@/pages/Auth/ResetPassword.jsx";
import PrivateRoute from "@/components/AppRoute/PrivateRoute";
import PostDetail from "@/pages/PostDetail";
import EmbedLayout from "@/layouts/EmbedLayout";
import Embed from "@/pages/Embed";

export default function AppRoute() {
    return (
        <Routes>


            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/post/:id" element={<PostDetail />} />
                
                <Route element={<PrivateRoute />}>
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>

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
    )
}