import Sidebar from '../../components/common/Sidebar';
import LoginPanel from '../../components/common/LoginPanel';
import {Outlet} from "react-router-dom";
import FeedHeader from "@/components/common/Header/index.jsx";
import Index from "@/components/common/Header/components/index.jsx";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen">
        {/* Header - Fixed Top */}
        <div className="fixed top-0 z-20 w-full bg-background">
            <div className="flex justify-center ml-[30px]">
                <div className="w-full max-w-[640px] h-[60px] md:h-[74px] z-20 flex items-center justify-center">
                    <Index>
                        <FeedHeader/>
                    </Index>
                </div>
            </div>
        </div>

        {/* Sidebar - Fixed Left */}
        <Sidebar />

        {/* Main Container */}
        <div className="flex justify-center ml-[30px] z-10">
            {/* Content Area - Fixed Width */}
            <div className="w-full max-w-[640px] pt-[60px] md:pt-[74px]">
                <Outlet />
            </div>

             {/*Login Panel - Fixed Right */}
            <div className=" fixed left-[calc(50%+320px+15px)] hidden xl:block w-[350px] z-30 h-[calc(100vh-73px)] pt-[62px] md:pt-[62px] overflow-y-auto">
                <div className="p-3">
                    <LoginPanel />
                </div>
            </div>
        </div>
    </div>
  );
};

export default DefaultLayout;
