import { Outlet } from "react-router-dom";

/**
 * EmbedLayout - Layout đơn giản cho trang embed
 * Không có sidebar, header, footer - chỉ hiển thị content chính
 * Dùng để nhúng post vào website khác qua iframe
 */
const EmbedLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Main Container - centered with max width */}
            <div className="flex justify-center">
                <div className="w-full max-w-[640px] p-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default EmbedLayout;
