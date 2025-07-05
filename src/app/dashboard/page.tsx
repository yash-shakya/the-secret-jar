"use client"

import { Key, useCallback, useEffect, useState } from "react"
import { Copy, Check, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Messagecard from "@/components/ui/messagecard"
import { useSession } from "next-auth/react"
import axios, { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { acceptMessageSchema } from "@/schema/acceptMessageSchema"
import { Message } from "@/model/user.model"

export default function Page() {
  const { data: session } = useSession()
  const [copied, setCopied] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const apiUrl = `https://thesecretjar.vercel.app/u/${session?.user?.username}`
  const [isLoading, setIsLoading] = useState(false)
  const [isSwithcing, setIsSwitching] = useState(false)

  const handleDelete = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { watch, register, setValue } = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const accepting = watch("acceptMessage");

  async function getAcceptingStatus() {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/changeaccepting`)
      if (response.data.success) {
        setValue("acceptMessage", response.data.isAccepting)
      } else {
        console.error("Failed to fetch acceptance status")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching acceptance status:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const changeAccepting = useCallback(async () => {
    setIsSwitching(true)
    try {
      const response = await axios.post("/api/changeaccepting", {
        accept: !accepting
      })
      if (response.data.success) {
        setValue("acceptMessage", !accepting)
      } else {
        console.error("Failed to update acceptance status")
      }
    } catch (error) {
      console.error("Error changing acceptance status:", error)
    } finally {
      setIsSwitching(false)
    }
  }, [setValue, accepting])

  async function getMessages() {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/getmessages")
      if (response.data.success) {
        setMessages(response.data.messages)
        console.log("Messages fetched successfully:", response.data.messages)
      } else {
        console.error("Failed to fetch messages")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error fetching messages:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      getAcceptingStatus()
      getMessages()
    }
  },[session])




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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="dashboard-mode" {...register} disabled={isSwithcing} checked={accepting} onCheckedChange={changeAccepting} />
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
            <Input id="api-url" value={apiUrl} readOnly className="flex-1 bg-muted" />
            <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0 bg-transparent">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ?
            <Loader2 className="animate-spin" />
            :
            <>{
              messages.length != 0 ?
                <>
                  {messages.map((message) => (
                    <Messagecard message={message} handleDelete={handleDelete} key={message._id as Key} />
                  ))}
                </>
                :
                <div><p>No messages to show</p></div>
            }
            </>
          }
        </div>
      </div>
    </div>
  )
}
