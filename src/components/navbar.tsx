"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useSession } from "next-auth/react"
import { ModeToggle } from "./ui/toggle"
import { Session } from "next-auth";
import { SidebarTrigger } from "./ui/sidebar"

function BigNavbar({ session }: { session: Session | null }) {
    return (
        <div className="flex justify-between w-full p-4 items-center">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <div className="italic font-bold text-base sm:text-lg">
                        The Secret Jar
                    </div>
                </Link>
            </div>

            <div className="hidden md:block">
                {session ?
                    <span className="text-sm">Welcome {session.user.username}</span>
                    : <></>}
            </div>
            <div className="flex gap-2 sm:gap-4 lg:gap-6 items-center">

                {session ?
                    <>
                    </>
                    :
                    <NavigationMenu>
                        <NavigationMenuList className="flex-col sm:flex-row gap-1 sm:gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + ` bg-gray-100 hover:bg-gray-200 dark:bg-slate-900 text-xs sm:text-sm px-2 sm:px-4`}>
                                    <Link href="/signup">Signup</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem >
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-gradient-to-b from-slate-700 to-slate-600 text-white hover:text-slate-400 text-xs sm:text-sm px-2 sm:px-4"}>
                                    <Link href="/login">Login</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                }
                <ModeToggle />
            </div>

        </div>
    )
}

function MobileNavbar({ session }: { session: Session | null }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex justify-between w-full p-4 items-center">
            <div className="flex items-center gap-4">
                {session && <SidebarTrigger />}
                <Link href="/">
                    <div className="italic font-bold text-base sm:text-lg">
                        The Secret Jar
                    </div>
                </Link>
            </div>

            <div className="flex gap-2 sm:gap-4 lg:gap-6 items-center">
                <ModeToggle />
            </div>
        </div>
    )
}

function Navbar() {
    const { data: session } = useSession()
    return (
        
        <div className="w-full  shadow-md border-b">
            <div className="px-4">
                <div className="flex justify-between items-center h-16 max-md:hidden">
                        <BigNavbar session={session}/>
                    </div>
                    <div className="md:hidden">
                        <MobileNavbar session={session}/>
                    </div>
            </div>
        </div>
    )
}

export default Navbar
