"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from "@/components/LoadingSpinner";
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const token = Cookies.get('token');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            router.push('/Dashboard');
        }
    }, [token, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // const response = await fetch('http://localhost:8080/auth/login', {
                // const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
                const response = await fetch('https://jobboard-eu2h.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            Cookies.set('token', data.token);
            Cookies.set('companyEmail', data.email);

            router.push('/Dashboard');
        } catch (error: any) {
            console.error('Error during login:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex flex-col">
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="w-full lg:w-1/2 bg-blue-600 p-12 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold text-white mb-6">Welcome Back!</h1>
                        <p className="text-blue-100 text-lg mb-8">
                            Log in to access your account and manage your job postings. Find the best talent for your company with JobBoard.
                        </p>
                        <div className="bg-blue-500 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Why choose JobBoard?</h3>
                            <ul className="text-blue-100 space-y-2">
                                <li className="flex items-center"><ArrowRight className="mr-2 h-4 w-4" /> Access to a vast pool of qualified candidates</li>
                                <li className="flex items-center"><ArrowRight className="mr-2 h-4 w-4" /> Easy-to-use job posting interface</li>
                                <li className="flex items-center"><ArrowRight className="mr-2 h-4 w-4" /> Advanced matching algorithms</li>
                                <li className="flex items-center"><ArrowRight className="mr-2 h-4 w-4" /> Comprehensive analytics and reporting</li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 p-12">
                        <div className="max-w-md mx-auto">
                            <h2 className="text-3xl font-bold mb-2 text-gray-800">Log In to Your Account</h2>
                            <p className="text-gray-600 mb-8">Enter your credentials to access your dashboard</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder='Email'
                                            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <div className="relative">
                                        {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder='Password'
                                            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Checkbox id="remember" className="border-gray-300" />
                                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                                    {loading ? <Loading /> : 'Log In'}
                                </Button>
                            </form>
                            <div className="mt-6 text-center">
                                <span className="text-gray-600">Don't have an account? </span>
                                <Link href="/signup" className="text-blue-600 hover:underline font-semibold">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
