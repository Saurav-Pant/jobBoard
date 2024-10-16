'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, BriefcaseIcon, ChevronLeftIcon } from "lucide-react";
import Link from 'next/link';

interface Job {
    id: string;
    title: string;
    description: string;
    experienceLevel: string;
    endDate: string;
}

export default function JobListings() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // const response = await fetch('http://localhost:8080/jobs/post-jobs', {
                // const response = await fetch(`${NEXT_PUBLIC_API_URL}/jobs/post-jobs`, {
                const response = await fetch('https://jobboard-eu2h.onrender.com/jobs/post-jobs', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();
                setJobs(data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <Link href="/Dashboard">
                        <Button variant="outline" size="sm">
                            <ChevronLeftIcon className="mr-2 h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Posted Jobs</h1>
                </div>

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-2/3" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-2/3" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : error ? (
                    <Card>
                        <CardContent className="text-center py-10">
                            <p className="text-red-500">Error loading jobs: {error}</p>
                        </CardContent>
                    </Card>
                ) : jobs.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <Card key={job.id}>
                                <CardHeader>
                                    <CardTitle>{job.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500 mb-4">{job.description}</p>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">{job.experienceLevel}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">
                                            Ends on {new Date(job.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-10">
                            <p className="text-gray-500">No jobs found.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
