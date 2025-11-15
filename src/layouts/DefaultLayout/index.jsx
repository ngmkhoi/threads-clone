import Sidebar from '../../components/common/Sidebar';
import LoginPanel from '../../components/common/LoginPanel';
import {Outlet} from "react-router-dom";
import FeedHeader from "@/components/common/Header/index.jsx";
import HeaderWrapper from "@/components/common/Header/components/HeaderWrapper.jsx";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen">
        {/* Header - Fixed Top */}
        <div className="fixed top-0 z-20 w-full bg-background">
            <div className="flex justify-center ml-[30px]">
                <div className="w-full max-w-[640px] h-[60px] md:h-[74px] flex items-center justify-center">
                    <HeaderWrapper>
                        <FeedHeader/>
                    </HeaderWrapper>
                </div>
            </div>
        </div>

        {/* Sidebar - Fixed Left */}
        <Sidebar />

        {/* Main Container */}
        <div className="flex justify-center ml-[30px]">
            {/* Content Area - Fixed Width */}
            <div className="w-full max-w-[640px] pt-[60px] md:pt-[74px]">
                <Outlet />
            </div>

             {/*Login Panel - Fixed Right */}
            <div className=" fixed left-[calc(50%+320px+10px)] hidden xl:block w-[340px] top-22 h-[calc(100vh-73px)] overflow-y-auto">
                <div className="p-3">
                    <LoginPanel />
                </div>
            </div>
        </div>
    </div>
  );
};

export default DefaultLayout;
