import { Link, useLocation } from 'react-router-dom'
import { Home, Users, MessageSquare, User } from 'lucide-react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export default function BottomNav() {
    const location = useLocation()

    const navItems = [
        { name: 'Discovery', path: '/', icon: Home },
        { name: 'Workers', path: '/workers', icon: Users },
        { name: 'Messages', path: '/messages', icon: MessageSquare },
        { name: 'Profile', path: '/profile/me', icon: User },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 pb-safe z-50 px-4">
            <div className="max-w-md mx-auto mb-4 bg-surface/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-100/50">
                <div className="flex justify-between items-center h-16 px-6">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/' && location.pathname.startsWith(item.path))

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex flex-col items-center justify-center relative"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute -top-2 w-12 h-1 bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon
                                    size={22}
                                    className={clsx(
                                        "transition-colors duration-200",
                                        isActive ? "text-primary" : "text-gray-400"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className={clsx("text-[10px] uppercase tracking-wide mt-1 font-medium", isActive ? "text-primary" : "text-gray-400")}>
                                    {item.name}
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
