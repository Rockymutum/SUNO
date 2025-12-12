import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import TopBar from './TopBar'
import { AnimatePresence, motion } from 'framer-motion'

export default function Layout() {
    const location = useLocation()

    // Pages that should be full screen (no top/bottom nav, no default padding)
    const isFullScreen = location.pathname.startsWith('/task/') ||
        location.pathname.startsWith('/messages/') ||
        location.pathname.startsWith('/worker/') ||
        location.pathname === '/profile/edit' ||
        location.pathname === '/welcome' ||
        location.pathname.startsWith('/profile/public/')

    const showNav = !isFullScreen

    return (
        <div className="fixed inset-0 bg-background text-primary font-sans flex flex-col overflow-hidden">
            {/* Background fill */}
            <div className="absolute inset-0 z-0 bg-background" />

            {showNav && <TopBar />}

            <main className="flex-1 relative z-10 w-full max-w-md mx-auto">
                <AnimatePresence mode='wait' initial={false}>
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute inset-0 overflow-y-auto overflow-x-hidden bg-background no-scrollbar shadow-none ${isFullScreen ? '' : 'px-5 pt-20 pb-24'
                            }`}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {showNav && <BottomNav />}
        </div>
    )
}
