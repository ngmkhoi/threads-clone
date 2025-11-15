const HeaderWrapper = ({children}) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Children - FeedHeader */}
            {children}

            {/* Box Left - Góc trái */}
            <div
                className="absolute w-[50px] h-[50px] left-[-25px] top-[35px] md:top-[49px] overflow-hidden bg-transparent pointer-events-none"
                aria-hidden="true"
            >
                <div
                    className="w-[50px] h-[50px] border border-border rounded-full relative left-[25px] top-[25px]"
                    style={{
                        outline: '100px solid var(--color-background)',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06)'
                    }}
                />
            </div>

            {/* Box Right - Góc phải */}
            <div
                className="absolute w-[50px] h-[50px] right-[-25px] top-[35px] md:top-[49px] overflow-hidden bg-transparent pointer-events-none"
                aria-hidden="true"
            >
                <div
                    className="w-[50px] h-[50px] border border-border shadow-border rounded-full relative right-[25px] top-[25px]"
                    style={{
                        outline: '100px solid var(--color-background)',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06)'
                    }}
                />
            </div>

            {/* Bottom Border Line */}
            <div
                className="absolute w-[calc(100%-50px)] border-b border-border left-[25px] bottom-[-1px] pointer-events-none"
                style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06)' }}
                aria-hidden="true"
            />
        </div>
    )
}

export default HeaderWrapper