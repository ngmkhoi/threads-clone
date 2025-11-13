import {Route, Routes} from "react-router-dom";

import Login from "@/pages/Auth/Login";
import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import Activity from "@/pages/Activity";

export default function AppRoute() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
            </Route>

            {/*NotFound*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}