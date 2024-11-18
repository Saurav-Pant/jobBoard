'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from "lucide-react"
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
import { Button } from "@/components/ui/button" 

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
    const [companyEmail, setCompanyEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            // router.push('/')
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
        <div>
            <header className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full mr-2"></div>
                    <Link href="/" className="text-2xl font-bold">
                        JobMailer
                    </Link>
                </div>
                {Cookies.get('token') ? (
                    <div className="flex items-center">
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
                ) : (
                    <nav className="space-x-4">
                        <Link
                            href="/login"
                            className="hover:underline"
                        >
                        <Button variant="outline">Log in</Button>
                        </Link>
                        <Link
                            href="/signup"
                            className="hover:underline"
                        >
                        <Button>Sign up</Button>
                        </Link>
                    </nav>
                )}
            </header>
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

export default Navbar
