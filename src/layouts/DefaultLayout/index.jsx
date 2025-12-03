import Sidebar from '@/components/Common/Sidebar';
import LoginPanel from '@/components/Common/LoginPanel';
import { Outlet } from "react-router-dom";
import FeedHeader from "@/components/Common/Header/index.jsx";
import WrapperHeader from "@/components/Common/Header/components/index.jsx";
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/authSelector.js';

const DefaultLayout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-20 w-full bg-background">
                <div className="flex justify-center ml-[30px]">
                    <div className="w-full max-w-[640px] h-[60px] md:h-[74px] z-20 flex items-center justify-center">
                        <WrapperHeader>
                            <FeedHeader />
                        </WrapperHeader>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Container */}
            <div className=" flex justify-center ml-[30px]">
                <div className="w-full max-w-[640px]  min-h-screen">
                    <Outlet  />
                </div>

                {/* Login Panel */}
                {!isAuthenticated && (
                    <div className="fixed left-[calc(50%+320px+15px)] hidden xl:block w-[350px] z-30 top-[62px] h-[calc(100vh-62px)] overflow-y-auto">
                        <div className="p-3">
                            <LoginPanel />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DefaultLayout;
