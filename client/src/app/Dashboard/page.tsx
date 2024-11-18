'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import JobForm from "@/components/JobForm"
import { PlusCircle, Briefcase, ChevronRight } from 'lucide-react'

export default function Dashboard() {
    const [isJobFormOpen, setIsJobFormOpen] = useState(false)
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <main className="flex-grow p-6 md:p-10">
                {!isJobFormOpen ? (
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <PlusCircle className="mr-2 h-6 w-6 text-blue-600" />
                                        Create Interview
                                    </CardTitle>
                                    <CardDescription>Post a new job and start interviewing candidates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => setIsJobFormOpen(true)}
                                    >
                                        Get Started
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Briefcase className="mr-2 h-6 w-6 text-gray-600" />
                                        Your Posted Jobs
                                    </CardTitle>
                                    <CardDescription>View and manage your current job postings</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                                        onClick={() => router.push('/JobsPost')}
                                    >
                                        View Jobs
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <JobForm onClose={() => setIsJobFormOpen(false)} />
                )}
            </main>
        </div>
    )
}
