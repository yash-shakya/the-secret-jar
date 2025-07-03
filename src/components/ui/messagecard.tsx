import React from 'react'
import { Dialog, DialogHeader, DialogTrigger } from './dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

interface CardData {
    id: number;
    title: string;
    description: string;
    content: string;
}

function Messagecard({ card}: { card: CardData }) {
    return (
        <Dialog key={card.id}>
            <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{card.content}</p>
                        <p className="text-xs text-blue-600 mt-2 font-medium">Click to view more</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{card.title}</DialogTitle>
                    <DialogDescription>{card.description}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <p className="text-sm leading-relaxed">{card.content}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Messagecard