import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Users, Clock, BarChart } from 'lucide-react'

const features = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Bulk Email Sending",
    description: "Send job openings to multiple recipients simultaneously.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Candidate Management",
    description: "Organize and track potential candidates effortlessly.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Automated Scheduling",
    description: "Set up recurring job postings with ease.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Analytics Dashboard",
    description: "Track the performance of your job postings.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
