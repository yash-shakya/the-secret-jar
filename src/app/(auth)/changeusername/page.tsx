'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { changerUsernameSchema } from '@/schema/changerusernameSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDebounceCallback } from 'usehooks-ts'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

function Page() {
    const {data:session, update} = useSession()
    const router = useRouter()
    const [newUsername, setNewUsername] = useState("");
    const debounced = useDebounceCallback(setNewUsername, 500);
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isChecking, setIsChecking] = useState(false);

    const form = useForm<z.infer<typeof changerUsernameSchema>>({
        resolver: zodResolver(changerUsernameSchema),
        defaultValues: {
            newUsername: "",
        },
    })

    useEffect(() => {
        if (newUsername) {
            setIsChecking(true)
            async function checkusername() {
                try {
                    setUsernameMessage("");
                    const response = await axios.get(`/api/checkusername?username=${newUsername}`)
                    console.log(response)
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    console.log(error)
                    setNewUsername("error");
                } finally {
                    setIsChecking(false)
                }
            }
            checkusername();
        }
    }, [newUsername])

    async function onSubmit(data: z.infer<typeof changerUsernameSchema>) {
        try {
            const response = await axios.post("/api/changeusername", {
                newUsername: data.newUsername
            })
            if (response.data.success) {
                alert("Username updated successfully")
                //update session
                await update({
                    user: {
                        ...session?.user,
                        username: data.newUsername
                    }
                })
                router.replace('/dashboard')
            } else {
                alert(response.data.error || "Failed to update username")
            }
        } catch (error) {
            console.error("Error updating username:", error)
            alert("An error occurred while updating the username.")
        }
    }




    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-4 sm:gap-6 bg-muted p-4 sm:p-6 md:p-10 font-poppins">
            <div className="flex w-full max-w-sm flex-col gap-4 sm:gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Change Username</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-3 justify-center items-left'>
                                <FormField
                                    control={form.control}
                                    name='newUsername'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Username</FormLabel>
                                            <FormControl>                                
                                                <Input
                                                {...field}
                                                placeholder="Enter your new username"
                                                onChange={(e) => {
                                                    field.onChange(e.target.value); // Update form state
                                                    debounced(e.target.value); // Trigger debounced username check
                                                }}
                                            />
                                            </FormControl>
                                            {isChecking ?
                                                <Loader2 className='animate-spin'/>
                                            : 
                                                <FormLabel className={usernameMessage == "Username already taken" ? "text-red-500" : "text-green-500"}>{usernameMessage}</FormLabel>
                                            }
                                        </FormItem>
                                    )}
                                />
                                <FormItem className="mt-2">
                                    <Label className="text-xs text-muted-foreground">
                                        Username must be 3-20 characters long and can only contain letters, numbers, and underscores.
                                    </Label>
                                </FormItem>
                                <FormItem className="mt-2">
                                    <Label className="text-sm text-red-500">
                                        {form.formState.errors.newUsername?.message}
                                    </Label>
                                </FormItem>
                                <Button type="submit">
                                    Submit
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page