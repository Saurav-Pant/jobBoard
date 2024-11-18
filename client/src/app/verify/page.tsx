'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Cookies from 'js-cookie'
import { CheckCircle2 } from 'lucide-react'

export default function SignUpOTP() {
    const [emailOTP, setEmailOTP] = useState('')
    const [mobileOTP, setMobileOTP] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [mobileVerified, setMobileVerified] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        if(emailVerified || mobileVerified) {
            router.push('/Dashboard')
        }
    })

    useEffect(() => {
        if (emailVerified || mobileVerified) {
            const timer = setTimeout(() => {
                router.push('/Dashboard')
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [emailVerified, mobileVerified, router])

    const handleEmailVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const companyEmail = Cookies.get('companyEmail')
            console.log(companyEmail)

            // const response = await fetch('http://localhost:8080/auth/verify-email', {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
                const response = await fetch('https://jobboard-eu2h.onrender.com/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: companyEmail,
                    otp: emailOTP
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setEmailVerified(true)
                toast({
                    title: "Email Verified",
                    description: "Your email has been successfully verified.",
                })
            } else {
                toast({
                    title: "Verification Failed",
                    description: data.error || "Please check your OTP and try again.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('Error:', error)
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleMobileVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setMobileVerified(true)
            toast({
                title: "Mobile Verified",
                description: "Your mobile number has been successfully verified.",
            })
        } catch (error) {
            console.error('Error:', error)
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] bg-white flex flex-col">
            <main className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-center items-center">
                    <div className="w-full lg:w-1/2 lg:pr-8 flex justify-center items-center mb-8 lg:mb-0">
                        <p className="text-gray-600 text-center lg:text-left">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold mb-1">Sign Up</h2>
                            <p className="text-gray-600 mb-6">Lorem ipsum is simply dummy text</p>

                            <form onSubmit={handleEmailVerify} className="mb-4">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Input
                                            id="emailOTP"
                                            value={emailOTP}
                                            onChange={(e) => setEmailOTP(e.target.value)}
                                            placeholder="Email OTP"
                                            className={emailVerified ? "pr-10 border-green-500" : ""}
                                        />
                                        {emailVerified && (
                                            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                                        )}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full mt-2 bg-blue-700 hover:bg-blue-800" disabled={isLoading || emailVerified}>
                                    {isLoading ? 'Verifying...' : emailVerified ? 'Verified' : 'Verify Email'}
                                </Button>
                            </form>

                            <form onSubmit={handleMobileVerify}>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Input
                                            id="mobileOTP"
                                            value={mobileOTP}
                                            onChange={(e) => setMobileOTP(e.target.value)}
                                            placeholder="Mobile OTP"
                                            className={mobileVerified ? "pr-10 border-green-500" : ""}
                                        />
                                        {mobileVerified && (
                                            <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                                        )}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full mt-2 bg-blue-700 hover:bg-blue-800" disabled={isLoading || mobileVerified}>
                                    {isLoading ? 'Verifying...' : mobileVerified ? 'Verified' : 'Verify Mobile'}
                                </Button>
                            </form>

                            {emailVerified && mobileVerified && (
                                <p className="mt-4 text-center text-green-600">
                                    Both email and mobile verified. Redirecting to dashboard...
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
