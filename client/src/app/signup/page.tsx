"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();
    const token = Cookies.get('token');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        companyName: '',
        companyEmail: '',
        employeeSize: ''
    });

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
        const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
        e.preventDefault();
        try {
            // const response = await fetch('http://localhost:8080/auth/register', {
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
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
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <header className="flex justify-between items-center p-4">
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-xl font-semibold">Covette</span>
                </div>
                <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-6xl flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 lg:pr-8 flex justify-center items-center mb-8 lg:mb-0">
                        <p className="text-gray-600 text-center lg:text-left">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer took a galley
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-1">Sign Up</h2>
                                <p className="text-gray-600 mb-6">Lorem ipsum is simply dummy text</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Name"
                                            className='bg-gray-200'
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Phone no."
                                            className='bg-gray-200'
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            id="companyName"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="Company Name"
                                            className='bg-gray-200'
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            id="companyEmail"
                                            name="companyEmail"
                                            type="email"
                                            value={formData.companyEmail}
                                            onChange={handleInputChange}
                                            placeholder="Company Email"
                                            className='bg-gray-200'
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            id="employeeSize"
                                            name="employeeSize"
                                            value={formData.employeeSize}
                                            onChange={handleInputChange}
                                            placeholder="Employee Size"
                                            className='bg-gray-200'
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex items-start sm:items-center">
                                    <Checkbox id="terms" className="mt-1 sm:mt-0" />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                        By clicking on proceed you will accept our <a href="#" className="text-blue-600">Terms & Conditions</a>
                                    </label>
                                </div>

                                <Button type="submit" className="w-full mt-6 bg-blue-700 hover:bg-blue-800">
                                    Proceed
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
