'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Home, ChevronDown } from "lucide-react"
import JobForm from "@/components/JobForm"
import Cookies from 'js-cookie'
import Link from 'next/link'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Dashboard() {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isJobFormOpen, setIsJobFormOpen] = useState(false)
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
    const [companyEmail, setCompanyEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            router.push('/signup')
        } else {
            const email = Cookies.get('companyEmail')
            setCompanyEmail(email || '')
        }
    }, [router])

    const handleLogout = useCallback(() => {
        setIsLogoutDialogOpen(true)
    }, [])

    const confirmLogout = useCallback(() => {
        Cookies.remove('token')
        Cookies.remove('companyEmail')
        Cookies.remove('CompanyId')
        router.push('/signup')
    }, [router])

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <header className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-xl font-semibold">Covette</span>
                </div>
                <div className="flex items-center">
                    <Link href="#" className="text-gray-600 hover:text-gray-800 mr-4">Contact</Link>
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                        >
                            <span className="mr-2">{companyEmail}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-grow">
                <aside className="w-16 border-r">
                    <nav className="mt-5">
                        <Link href="#" className="block p-3 text-gray-600 hover:bg-gray-200">
                            <Home className="w-6 h-6 mx-auto" />
                        </Link>
                    </nav>
                </aside>

                <main className="flex-grow p-6">
                    {!isJobFormOpen ? (
                        <div className="flex justify-between">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => setIsJobFormOpen(true)}
                            >
                                Create Interview
                            </Button>
                            <Button
                                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => router.push('/JobsPost')}
                            >
                                Your Posted Jobs
                            </Button>
                        </div>
                    ) : (
                        <JobForm />
                    )}
                </main>
            </div>

            <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will end your current session and redirect you to the signup page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmLogout}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
