"use client"

import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

const FormSchema = z.object({
    code: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

function Page() {
    const router = useRouter()
    const { username } = useParams();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await axios.post("/api/verifyotp", {
                username,
                code: data.code
            })
            if (response.data.success) {
                alert("Verified Successfully")
                router.replace("/")
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
            alert(`Unexpected error ${error}`)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
                <div className="text-center space-y-2">
                    <h1 className="text-xl sm:text-2xl font-bold">Verify Your Account</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Enter the verification code sent to your email
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center space-y-4">
                                    <FormLabel className="text-sm sm:text-base">One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field} className="gap-2 sm:gap-3 border border-gray-300 dark:border-gray-700">
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} className="w-10 h-10 sm:w-12 sm:h-12 text-lg" />
                                                <InputOTPSlot index={1} className="w-10 h-10 sm:w-12 sm:h-12 text-lg" />
                                                <InputOTPSlot index={2} className="w-10 h-10 sm:w-12 sm:h-12 text-lg" />
                                                <InputOTPSeparator />
                                                <InputOTPSlot index={3} className="w-10 h-10 sm:w-12 sm:h-12 text-lg" />
                                                <InputOTPSlot index={4} className="w-10 h-10 sm:w-12 sm:h-12 text-lg" />
                                                <InputOTPSlot index={5} className="w-10 h-10 sm:w-12 sm:h-12 text-lg" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription className="text-xs sm:text-sm text-center">
                                        Please enter the verification code sent to your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full h-10 sm:h-12 text-sm sm:text-base">
                            Verify Account
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )


}

export default Page