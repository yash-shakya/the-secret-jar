"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Messagecard from "@/components/ui/messagecard"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session } = useSession()
  const [isEnabled, setIsEnabled] = useState(false)
  const [copied, setCopied] = useState(false)
  const apiUrl = `https://thesecretjar.vercel.app/u/${session?.user?.username}`

  const cardData = [
    {
      id: 1,
      title: "User Analytics",
      description: "Monthly active users",
      content:
        "This card contains detailed analytics about user engagement, including daily active users, session duration, bounce rates, and conversion metrics. The data shows a 15% increase in user engagement over the past month, with particularly strong performance in mobile users. Key insights include improved retention rates and higher click-through rates on promotional content.",
    },
    {
      id: 2,
      title: "Revenue Report",
      description: "Financial overview",
      content:
        "Comprehensive revenue analysis showing quarterly performance across all product lines. Total revenue increased by 23% compared to last quarter, driven primarily by subscription renewals and new customer acquisitions. The enterprise segment showed exceptional growth with a 45% increase in contract values. Operating margins improved by 3.2% due to cost optimization initiatives.",
    },
    {
      id: 3,
      title: "System Performance",
      description: "Infrastructure metrics",
      content:
        "Real-time monitoring data for all system components including server response times, database query performance, and API endpoint availability. Current uptime is 99.97% with average response times under 200ms. Recent optimizations have reduced memory usage by 18% and improved cache hit rates to 94%. No critical issues detected in the past 30 days.",
    },
    {
      id: 4,
      title: "Customer Feedback",
      description: "Support and satisfaction",
      content:
        "Customer satisfaction scores and support ticket analysis for the current period. Overall satisfaction rating is 4.7/5 with 89% of tickets resolved within 24 hours. Common feedback themes include praise for product reliability and requests for additional integration options. Support team response time has improved by 32% following recent process improvements.",
    },
    {
      id: 5,
      title: "Marketing Campaigns",
      description: "Campaign performance",
      content:
        "Detailed analysis of all active marketing campaigns across digital channels. Email campaigns achieved a 24% open rate and 6.8% click-through rate, exceeding industry benchmarks. Social media engagement increased by 41% with video content performing particularly well. The latest product launch campaign generated 1,247 qualified leads with a conversion rate of 12.3%.",
    },
    // {
    //   id: 6,
    //   title: "Inventory Status",
    //   description: "Stock and supply chain",
    //   content:
    //     "Current inventory levels and supply chain status across all warehouses and distribution centers. Stock levels are optimal with 94% fill rate and average inventory turnover of 8.2x annually. Recent supply chain optimizations have reduced shipping costs by 15% while maintaining delivery times. Three new supplier partnerships have been established to ensure supply continuity.",
    // },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="dashboard-mode" checked={isEnabled} onCheckedChange={setIsEnabled} />
              <Label htmlFor="dashboard-mode" className="text-sm font-medium">
                Accept Messages
              </Label>
            </div>
          </div>
        </div>

        {/* API URL Section */}
        <div className="space-y-2">
          <Label htmlFor="api-url" className="text-sm font-medium">
            Share Your URL on Your Story
          </Label>
          <div className="flex items-center space-x-2">
            <Input id="api-url" value={apiUrl} disabled className="flex-1 bg-muted" />
            <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0 bg-transparent">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card) => (
            <Messagecard card={card} key={card.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}
