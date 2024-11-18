"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from "@/components/LoadingSpinner";
import { ArrowRight, Building, Mail, Phone, User, Users, Lock } from 'lucide-react';

export default function SignUpPage() {
    const router = useRouter();
    const token = Cookies.get('token');
    const verified = Cookies.get('verified');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        companyName: '',
        companyEmail: '',
        employeeSize: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (verified) {
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
            // const response = await fetch('http://localhost:8080/auth/register', {
                // const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
                const response = await fetch('https://jobboard-eu2h.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    employeeSize: parseInt(formData.employeeSize, 10)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            Cookies.set('token', data.token);
            Cookies.set('CompanyId', data.id);
            Cookies.set('companyEmail', data.email);

            router.push('/verify');
        } catch (error: any) {
            console.error('Error during registration:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex flex-col">
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="w-full lg:w-1/2 bg-blue-600 p-12 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold text-white mb-6">Welcome to JobBoard</h1>
                        <p className="text-blue-100 text-lg mb-8">
                            Join thousands of companies finding top talent with our innovative job posting platform.
                            Streamline your hiring process and connect with the best candidates in your industry.
                        </p>
                        <div className="bg-blue-500 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Why choose us?</h3>
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
                            <h2 className="text-3xl font-bold mb-2 text-gray-800">Create Your Account</h2>
                            <p className="text-gray-600 mb-8">Start your journey to finding great talent</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        {/* <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Full Name"
                                            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <div className="relative">
                                        {/* <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Phone Number"
                                            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <div className="relative">
                                        {/* <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                        <Input
                                            id="companyName"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="Company Name"
                                            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <div className="relative">
                                        {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                        <Input
                                            id="companyEmail"
                                            name="companyEmail"
                                            type="email"
                                            value={formData.companyEmail}
                                            onChange={handleInputChange}
                                            placeholder="Company Email"
                                            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                    <div className="relative">
                                        {/* <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                        <Input
                                            id="employeeSize"
                                            name="employeeSize"
                                            value={formData.employeeSize}
                                            onChange={handleInputChange}
                                            placeholder="Number of Employees"
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
                                            placeholder="Password"
                                            className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Checkbox id="terms" className="border-gray-300" />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                        I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms & Conditions</Link>
                                    </label>
                                </div>

                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                                    {loading ? <Loading /> : 'Create Account'}
                                </Button>
                            </form>
                            <div className="mt-6 text-center">
                                <span className="text-gray-600">Already have an account? </span>
                                <Link href="/login" className="text-blue-600 hover:underline font-semibold">Log In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
