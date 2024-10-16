'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Calendar } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Cookies from "js-cookie"
import { useToast } from "@/hooks/use-toast"

export default function JobForm() {
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [experienceLevel, setExperienceLevel] = useState('')
    const [candidates, setCandidates] = useState([''])
    const [endDate, setEndDate] = useState('')
    const companyId = Cookies.get('CompanyId')
    const { toast } = useToast()

    const handleAddCandidate = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            setCandidates([...candidates, e.currentTarget.value])
            e.currentTarget.value = ''
        }
    }

    const handleRemoveCandidate = (index: number) => {
        setCandidates(candidates.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // const jobResponse = await fetch('http://localhost:8080/jobs/post-jobs', {
                const jobResponse = await fetch('https://jobboard-eu2h.onrender.com/jobs/post-jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: jobTitle,
                    description: jobDescription,
                    experienceLevel,
                    endDate,
                    companyId
                }),
            })

            if (!jobResponse.ok) {
                throw new Error('Failed to post job')
            }

            const jobData = await jobResponse.json()
            const jobId = jobData.id
            const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

            // const alertResponse = await fetch('http://localhost:8080/jobs/send-job-alerts', {
            // const alertResponse = await fetch(`${NEXT_PUBLIC_API_URL}/jobs/send-job-alerts`, {
                const alertResponse = await fetch('https://jobboard-eu2h.onrender.com/jobs/send-job-alerts', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    candidateEmails: candidates,
                    jobId
                }),
            })

            if (!alertResponse.ok) {
                throw new Error('Failed to send job alerts')
            }

            toast({
                title: 'Success',
                description: 'Job posted and alerts sent successfully',
            })
        } catch (error) {
            console.error('Error posting job or sending alerts', error)
            toast({
                title: 'Error',
                description: 'Failed to post job or send alerts'
            })
        }
    }

    return (
        <div className="flex items-center justify-center h-[70vh] relative">
            <div className='absolute top-4 left-4'>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                            window.location.reload()
                        }}
                    >
                        Dashboard
                    </Button>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <Label htmlFor="jobTitle" className="w-1/3">Job Title</Label>
                        <Input
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Enter Job Title"
                            className="w-2/3"
                        />
                    </div>

                    <div className="flex items-start">
                        <Label htmlFor="jobDescription" className="w-1/3 mt-2">Job Description</Label>
                        <Textarea
                            id="jobDescription"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Enter Job Description"
                            className="w-2/3"
                            rows={4}
                        />
                    </div>

                    <div className="flex items-center">
                        <Label htmlFor="experienceLevel" className="w-1/3">Experience Level</Label>
                        <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                            <SelectTrigger className="w-2/3">
                                <SelectValue placeholder="Select Experience Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entry">Entry Level</SelectItem>
                                <SelectItem value="mid">Mid Level</SelectItem>
                                <SelectItem value="senior">Senior Level</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-start">
                        <Label htmlFor="addCandidate" className="w-1/3 mt-2">Add Candidate</Label>
                        <div className="w-2/3">
                            <Input
                                id="addCandidate"
                                placeholder="Enter candidate email and press Enter"
                                onKeyPress={handleAddCandidate}
                                className="mb-2"
                            />
                            <div className="flex flex-wrap gap-2">
                                {candidates.map((candidate, index) => (
                                    <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                        <span className="text-sm">{candidate}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCandidate(index)}
                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Label htmlFor="endDate" className="w-1/3">End Date</Label>
                        <div className="w-2/3 relative">
                            <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full"
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Send
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
