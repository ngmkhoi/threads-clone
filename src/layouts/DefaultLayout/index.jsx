import Sidebar from '../../components/common/Sidebar';
import LoginPanel from '../../components/common/LoginPanel';
import {Outlet} from "react-router-dom";
import FeedHeader from "@/components/common/Header/index.jsx";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header - Fixed Top */}
        <div className="fixed top-0 left-[72px] z-20 w-[calc(100%-72px)] px-4 py-3 bg-gray-50">
            <FeedHeader/>
        </div>

        {/* Sidebar - Fixed Left */}
        <Sidebar />

        {/* Main Container */}
        <div className="flex justify-center ml-[30px]">
            {/* Content Area - Fixed Width */}
            <div className="w-full max-w-[640px] pt-[61px]">
                <Outlet />
            </div>

            {/* Login Panel - Fixed Right */}
            <div className="fixed right-55 hidden xl:block w-[340px] top-10 h-[calc(100vh-73px)] overflow-y-auto">
                <div className="p-3">
                    <LoginPanel />
                </div>
            </div>
        </div>
    </div>
  );
};

export default DefaultLayout;

