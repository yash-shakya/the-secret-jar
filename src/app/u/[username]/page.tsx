'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { z } from 'zod';
import { messagesSchema } from '@/schema/messagesSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';


function Page() {
    const { username } = useParams();
    const [isAccepting, setIsAccepting] = useState(true);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof messagesSchema>>({
        resolver: zodResolver(messagesSchema),
        defaultValues: {
            content: "",
        },
    });

    useEffect(() => {
        async function checkAcceptance() {
            try {
                const response = await axios.get(`/api/isaccepting?username=${username}`);
                const data = response.data;
                if (data.success) {
                    setIsAccepting(data.isAccepting);
                } else {
                    console.error(data.message);
                }
                setMessage(data.message);
            } catch (error) {
                setIsAccepting(false);
                if (error instanceof AxiosError) {
                    setMessage(error.response?.data?.message || "An error occurred while fetching acceptance status.");
                }
                console.error('Error fetching acceptance status:', error);
            }
        }

        checkAcceptance();
    }, [username])

    async function onSubmit(data: z.infer<typeof messagesSchema>) {
        setLoading(true);
        try{
            const content = data.content.trim();
            if (content.length === 0) {
                alert("Message cannot be empty.");
                setLoading(false);
                return;
            }
            const response = await axios.post(`/api/sendmessage`, {
                username,
                content: data.content
            });

            if (response.data.success) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert(response.data.message);
            }
        }catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data?.message || "An error occurred while sending the message.");
            } else {
                alert("An unexpected error occurred.");
            }
        }finally {
            setLoading(false);
        }
    }

    if (!isAccepting) return (
        <div className='flex flex-col items-center justify-center w-screen h-[calc(100vh-74px)] bg-gray-100 dark:bg-gray-900'>
            {message}
        </div>
    )


    return (
        <div className='flex flex-col items-center justify-center w-screen h-[calc(100vh-74px)] bg-gray-100 dark:bg-gray-900'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center justify-center w-full h-full'>
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='w-screen -mt-32 flex justify-center items-center flex-col '>
                                        <div className='w-1/2 h-72 rounded-xl shadow-md'>
                                            <div className='h-16 w-full rounded-t-xl items-center flex bg-white dark:bg-gray-950'>
                                                <p className='text-lg font-semibold ml-4'>
                                                    Send a anonymous message to @{username}
                                                </p>
                                            </div>
                                            <textarea
                                                {...field}
                                                className='w-full h-[calc(100%-64px)] p-4 resize-none border bg-gray-200 dark:bg-gray-800 rounded-b-lg focus:outline-none'
                                                placeholder='Type your message here...'
                                                disabled={loading}
                                            ></textarea>
                                        </div>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {loading ?
                        <Loader2 className='animate-spin w-40 mt-4 h-12 text-lg'/>
                    : 
                        <Button type='submit' className='w-40 mt-4 h-12 text-lg'>Send</Button>
                    }
                </form>
            </Form>
        </div>
    )
}

export default Page