import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TaskCard } from '@/components/TaskCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { supabase } from '@/lib/supabase'

export default function Discovery() {
    const [searchTerm, setSearchTerm] = useState('')
    const { data: tasks = [], isLoading: loading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('tasks')
                .select(`
                    *,
                    creator:users(display_name, avatar_url)
                `)
                .order('created_at', { ascending: false })

            if (error) throw error
            return data
        }
    })

    // Search filter
    const filteredTasks = tasks.filter(task => {
        const term = searchTerm.toLowerCase()
        return (
            task.title?.toLowerCase().includes(term) ||
            task.description?.toLowerCase().includes(term) ||
            task.location?.toLowerCase().includes(term) ||
            task.category?.toLowerCase().includes(term) ||
            // Check nested creator name if available (searches by "Who posted this?")
            task.creator?.display_name?.toLowerCase().includes(term)
        )
    })

    return (
        <div className="pb-10 relative min-h-full">
            {/* Create Task Floating Button */}
            <Link to="/task/create" className="fixed bottom-20 right-5 z-40">
                <Button
                    variant="primary"
                    size="icon"
                    className="w-14 h-14 rounded-full shadow-2xl bg-primary text-white flex items-center justify-center p-0"
                >
                    <Plus size={28} />
                </Button>
            </Link>

            <div className="space-y-4">
                <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur py-2 -mx-4 px-4 mb-4 border-b border-gray-100">
                    <div className="relative">
                        <Input
                            placeholder="Search tasks, location, category..."
                            className="pl-10 bg-white shadow-sm border-gray-200"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                </div>

                {loading ? (
                    <>
                        {[1, 2].map(i => (
                            <div key={i} className="bg-white h-64 rounded-xl animate-pulse shadow-sm" />
                        ))}
                    </>
                ) : (
                    filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <TaskCard
                                    task={task}
                                // onDelete logic would need mutation + invalidateQueries
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No tasks found matching "{searchTerm}"
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
