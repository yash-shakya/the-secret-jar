import React, { Key, useRef } from 'react'
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from './dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card } from './card'
import { Message } from '@/model/user.model'
import { ChevronRight, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Button } from './button'
import html2canvas from 'html2canvas'
import MessageTemplate from '../message'

function Messagecard({
    message,
    handleDelete
}: { message: Message, handleDelete: (id: string) => void }) {
    const date = new Date(message.createdAt)
    const curr = new Date()
    const [isSharing, setIsSharing] = React.useState(false)

    const { register, watch, setValue } = useForm()

    const isOpened = watch("isOpened", message.isOpened)

    function getTimeDifference() {
        const diff = curr.getTime() - date.getTime()
        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const months = Math.floor(days / 30)
        const years = Math.floor(months / 12)

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`
    }

    async function changeopen(id: string) {
        try {
            if (!isOpened) {
                const response = await axios.post("/api/changeopen", {
                    messageId: id
                })
                if (response.data.success) {
                    setValue("isOpened", true)
                } else {
                    console.error("Failed to open message:", response.data.error);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error opening message:", error);
            }
        }
    }

    const contentRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        setIsSharing(true);
        try {
            if (!navigator.share) {
                alert('Web Share API is not supported in this browser');
                return;
            }

            if (!contentRef.current) {
                alert('Content is not available to share.');
                return;
            }

            const hiddenElement = contentRef.current;
            const originalStyle = {
                position: hiddenElement.style.position,
                left: hiddenElement.style.left,
                top: hiddenElement.style.top,
                zIndex: hiddenElement.style.zIndex
            };

            hiddenElement.style.position = 'fixed';
            hiddenElement.style.left = '-9999px';
            hiddenElement.style.top = '0';
            hiddenElement.style.zIndex = '-1';

            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(hiddenElement, {
                backgroundColor: '#000000',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                width: 600,
                height: 600,
                logging: false,
            });

            // Create a larger canvas with more black space to prevent gradient
            const finalCanvas = document.createElement('canvas');
            const padding = 100; // Add padding to make it look more like a full image
            finalCanvas.width = canvas.width + (padding * 2);
            finalCanvas.height = canvas.height + (padding * 2);

            const ctx = finalCanvas.getContext('2d');

            if (ctx) {
                // Fill entire canvas with black
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

                // Draw the content centered
                ctx.drawImage(canvas, padding, padding);
            } else {
                alert('Failed to get canvas context.');
                // Restore original positioning before returning
                hiddenElement.style.position = originalStyle.position;
                hiddenElement.style.left = originalStyle.left;
                hiddenElement.style.top = originalStyle.top;
                hiddenElement.style.zIndex = originalStyle.zIndex;
                return;
            }

            // Restore original positioning
            hiddenElement.style.position = originalStyle.position;
            hiddenElement.style.left = originalStyle.left;
            hiddenElement.style.top = originalStyle.top;
            hiddenElement.style.zIndex = originalStyle.zIndex;

            // Use JPEG format to prevent transparency issues
            finalCanvas.toBlob(async (blob) => {
                if (blob) {
                    const file = new File([blob], 'secret-message.jpg', { type: 'image/jpeg' });

                    try {
                        await navigator.share({
                            title: 'Secret Message from The Secret Jar',
                            text: 'Check out this anonymous message!',
                            files: [file],
                        });
                    } catch (shareError) {
                        console.error('Error sharing:', shareError);
                    }
                }
            }, 'image/jpeg', 0.95);

        } catch (error) {
            console.error('Error converting to image:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <Dialog key={message._id as Key}>
            <DialogTrigger asChild {...register} onClick={() => changeopen(message._id as string)}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <div className='flex items-center justify-between gap-2 p-3'>
                        <div className='flex items-center gap-3 flex-1 overflow-hidden'>
                            <div className={`w-3 h-3 ${isOpened ? "bg-gray-200 dark:bg-gray-500" : "bg-green-400"} rounded-full flex-shrink-0`}>
                            </div>
                            <div className='flex-1 overflow-hidden'>
                                <p className='text-ellipsis overflow-hidden whitespace-nowrap text-sm sm:text-base'>{message.content}</p>
                                <p className='text-xs text-gray-500 mt-1'>{getTimeDifference()}</p>
                            </div>
                        </div>
                        <div className='flex-shrink-0'>
                            <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400' />
                        </div>
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Anonymous Message</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">{`${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <p className="text-sm sm:text-base leading-relaxed break-words">{message.content}</p>
                </div>
                <div className='mt-6 flex flex-col sm:flex-row items-center justify-end gap-2'>
                    {isSharing ?
                        <Loader2 className='animate-spin h-5 w-5 sm:h-6 sm:w-6' />
                        :
                        <Button onClick={handleShare} className="w-full sm:w-auto">
                            Share
                        </Button>
                    }
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className='bg-red-500 text-white hover:bg-red-700 w-full sm:w-auto'>Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[95vw] max-w-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-base sm:text-lg">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-sm sm:text-base">
                                    This action cannot be undone. This will permanently delete the message.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                                <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-red-500 text-white hover:bg-red-700 w-full sm:w-auto' onClick={() => handleDelete(message._id as string)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* Hidden MessageTemplate for sharing */}
                <div ref={contentRef} className="absolute -left-[9999px] -top-[9999px] pointer-events-none">
                    <MessageTemplate message={message.content} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Messagecard