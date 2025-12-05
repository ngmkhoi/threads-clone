// Component này chỉ dùng cho icon trong Dialog
export const InstagramGradientDef = () => (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
            <linearGradient
                id="instagram-dialog-gradient"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
            >
                <stop offset="0%" stopColor="#405de6" />
                <stop offset="20%" stopColor="#5851db" />
                <stop offset="40%" stopColor="#833ab4" />
                <stop offset="60%" stopColor="#c13584" />
                <stop offset="80%" stopColor="#e1306c" />
                <stop offset="100%" stopColor="#fd1d1d" />
            </linearGradient>
        </defs>
    </svg>
);

export const InstagramGradientIcon = ({ Icon, className = "", ...props }) => {
    return (
        <>
            <InstagramGradientDef />
            <Icon
                className={className}
                stroke="url(#instagram-dialog-gradient)"
                {...props}
            />
        </>
    );
};
