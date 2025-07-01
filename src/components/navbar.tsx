"use client"

// import React, { useEffect, useState } from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from "next-auth/react"
import { ModeToggle } from "./ui/Toggle"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"


function Navbar() {
    const { data: session } = useSession()
    const {theme} = useTheme()

    return (
        <div className="flex justify-between w-full p-4 items-center">
            <Link href="/">
                <div className="italic font-bold text-lg ">
                    The Secret Jar
                </div>
            </Link>

            <div>
                {session ?
                    <>Welcome {session.user.username}</>
                    : <></>}
            </div>
            <div className="flex gap-6">

                {session ?

                    <>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + `${theme==='light'? "bg-gray-100 hover:bg-gray-200" : "bg-slate-900"}`}>
                                        <Link href="/signup">Change Username</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem >
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-gradient-to-b from-slate-700 to-slate-600 text-white hover:text-slate-400"}>
                                        <Button onClick={()=>signOut()}>Logout</Button>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                            </NavigationMenuList>
                        </NavigationMenu>
                    </>
                    :
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + `${theme==='light'? "bg-gray-100 hover:bg-gray-200" : "bg-slate-900"}`}>
                                    <Link href="/signup">Signup</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem >
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + " bg-gradient-to-b from-slate-700 to-slate-600 text-white hover:text-slate-400"}>
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

export default Navbar
