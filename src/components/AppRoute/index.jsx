import { Route, Routes } from "react-router-dom";

import Login from "@/pages/Auth/Login";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Activity from "@/pages/Activity";
import AuthLayout from "@/layouts/AuthLayout/";
import Register from "@/pages/Auth/Register";
import VerifyEmail from "@/pages/Auth/VerifyEmail/index.jsx";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
export default function AppRoute() {
    return (
        <Routes>


            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            {/*NotFound*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}