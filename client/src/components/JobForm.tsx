'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Calendar, Send, ArrowLeft, Plus } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Cookies from "js-cookie"
import { useToast } from "@/hooks/use-toast"

export default function JobForm({ onClose }: { onClose: () => void }) {
    const [jobTitle, setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [experienceLevel, setExperienceLevel] = useState('')
    const [candidates, setCandidates] = useState<string[]>([])
    const [newCandidate, setNewCandidate] = useState('')
    const [endDate, setEndDate] = useState('')
    const companyId = Cookies.get('CompanyId')
    const { toast } = useToast()

    const handleAddCandidate = () => {
        if (newCandidate && !candidates.includes(newCandidate)) {
            setCandidates([...candidates, newCandidate])
            setNewCandidate('')
        }
    }

    const handleRemoveCandidate = (candidateToRemove: string) => {
        setCandidates(candidates.filter(candidate => candidate !== candidateToRemove))
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
            onClose()
        } catch (error) {
            console.error('Error posting job or sending alerts', error)
            toast({
                title: 'Error',
                description: 'Failed to post job or send alerts'
            })
        }
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center justify-between">
                    <span>Create New Job Posting</span>
                    <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <ArrowLeft className="h-6 w-6" />
                        <span className="sr-only">Back to Dashboard</span>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Enter Job Title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="jobDescription">Job Description</Label>
                        <Textarea
                            id="jobDescription"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Enter Job Description"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experienceLevel">Experience Level</Label>
                        <Select value={experienceLevel} onValueChange={setExperienceLevel} required>
                            <SelectTrigger id="experienceLevel">
                                <SelectValue placeholder="Select Experience Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entry">Entry Level</SelectItem>
                                <SelectItem value="mid">Mid Level</SelectItem>
                                <SelectItem value="senior">Senior Level</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="addCandidate">Add Candidate Emails</Label>
                        <div className="flex gap-2">
                            <Input
                                id="addCandidate"
                                value={newCandidate}
                                onChange={(e) => setNewCandidate(e.target.value)}
                                placeholder="Enter candidate email"
                                type="email"
                            />
                            <Button type="button" onClick={handleAddCandidate} variant="secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {candidates.map((candidate, index) => (
                                <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
                                    {candidate}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCandidate(candidate)}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                        aria-label={`Remove ${candidate}`}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <div className="relative">
                            <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Send className="mr-2 h-4 w-4" />
                        Post Job and Send Alerts
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
