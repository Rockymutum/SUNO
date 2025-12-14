import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Shield, Zap } from 'lucide-react'

export default function Welcome() {
    const navigate = useNavigate()
    const [badgeState, setBadgeState] = useState('verified')

    // Cycle between badges
    useEffect(() => {
        const interval = setInterval(() => {
            setBadgeState(prev => prev === 'verified' ? 'instant' : 'verified')
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between p-6 relative overflow-hidden">

            {/* UNICORN MOTION BACKGROUND */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#E0F2FE] rounded-full blur-[120px] opacity-70 mix-blend-multiply"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -60, 0], x: [0, -30, 0], y: [0, 50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] -right-[20%] w-[70%] h-[70%] bg-[#F3E8FF] rounded-full blur-[120px] opacity-70 mix-blend-multiply"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, -40, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] bg-[#ECFEFF] rounded-full blur-[100px] opacity-60 mix-blend-multiply"
                />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-12 max-w-md mx-auto w-full">

                {/* Hero Graphic */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
                    className="relative"
                >
                    {/* Floating Container */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex flex-col items-center"
                    >
                        {/* Logo Wrapper with Glow */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-20 rounded-full animate-pulse" />
                            <div className="w-40 h-40 bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 flex items-center justify-center p-8 relative z-10 border border-gray-50">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* 3D FLIPPING BADGE */}
                        <div className="h-10 perspective-1000 relative z-20">
                            <AnimatePresence mode="wait">
                                {badgeState === 'verified' ? (
                                    <motion.div
                                        key="verified"
                                        initial={{ rotateX: 90, opacity: 0, y: -10 }}
                                        animate={{ rotateX: 0, opacity: 1, y: 0 }}
                                        exit={{ rotateX: -90, opacity: 0, y: 10 }}
                                        transition={{ duration: 0.5, ease: "backOut" }}
                                        className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 backface-hidden"
                                    >
                                        <div className="p-1.5 bg-green-100 rounded-full text-green-600"><Shield size={12} fill="currentColor" /></div>
                                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Verified Secure</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="instant"
                                        initial={{ rotateX: 90, opacity: 0, y: -10 }}
                                        animate={{ rotateX: 0, opacity: 1, y: 0 }}
                                        exit={{ rotateX: -90, opacity: 0, y: 10 }}
                                        transition={{ duration: 0.5, ease: "backOut" }}
                                        className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 backface-hidden"
                                    >
                                        <div className="p-1.5 bg-blue-100 rounded-full text-blue-600"><Zap size={12} fill="currentColor" /></div>
                                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Instant Access</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Typography */}
                <div className="space-y-2 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-black tracking-tighter text-primary uppercase leading-none font-tech"
                    >
                        SUNOMSI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm mx-auto font-sans tracking-tight"
                    >
                        Access top-rated professionals for any task, instantly. Verified, secure, and fast.
                    </motion.p>
                </div>
            </div>

            {/* FOOTER ACTIONS */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 w-full max-w-md mx-auto space-y-6 pb-6"
            >
                <Button
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="w-full h-16 text-lg font-bold bg-gray-900 hover:bg-black text-white rounded-2xl shadow-xl shadow-gray-900/10 flex items-center justify-center gap-4 px-8 group transition-all hover:scale-[1.02]"
                >
                    <span>Get Started</span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <ArrowRight size={16} />
                    </div>
                </Button>

                <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                        Powered by SUNO.V2
                    </p>
                </div>
            </motion.div>

        </div>
    )
}
