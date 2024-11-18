'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission logic here
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section className="py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Revolutionize Your <span className="text-primary">Job Posting</span> Process
            </h1>
            <p className="text-xl text-muted-foreground">
              Effortlessly distribute job openings to thousands of potential candidates with just a few clicks.
            </p>
            <Link href="/signup" className="inline-block">
              <Button type="submit" size="lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" /> Free 14-day trial
              </span>
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-primary" /> No credit card required
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900 rounded-t-xl opacity-20 rounded-3xl blur-xl"></div>
            <div className="relative bg-card border rounded-3xl shadow-2xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">New Job Opening</h3>
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" /> Send to 1000+ candidates
                </Button>
              </div>
              <div className="space-y-10 overflow-hidden text-ellipsis">
                <div>
                  <label className="text-sm font-medium">Job Title</label>
                  <Input defaultValue="Senior React Developer" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <Input defaultValue="TechCorp Inc." className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input defaultValue="Remote / New York, NY" className="mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
