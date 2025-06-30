import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useDebounceCallback } from "usehooks-ts"
import { Loader2 } from "lucide-react"
import axios, { Axios, AxiosError } from "axios"
import { z } from "zod"
import { ApiResponse } from "@/types/ApiResponse"

export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [submiting, setSubmiting] = useState(false)
    const [checking, setChecking] = useState(false)
    const [usernameMessage, setUsernameMessage] = useState("")
    const { data: session } = useSession()

    const debounced = useDebounceCallback(setUsername, 500);

    async function checkusername() {

        setChecking(true)
        try {
            setUsernameMessage("");
            const response = await axios.get(`/api/checkusername?username=${username}`)
            console.log(response)
            setUsernameMessage(response.data.message)
        } catch (error) {
            console.log(error)
            setUsername("error");
        } finally {
            setChecking(false)
        }
    }

    useEffect(() => {
        if (username) {
            console.log("triggered")
            checkusername()
        }
    }, [username])

    async function handleGoogleLogin(){
        try {
            const response = signIn("google");
        } catch (error) {
            alert(error)
        }
    }

    async function handleSubmit() {
        setSubmiting(true)
        try {
            const response = await axios.post("/api/signup", {
                username,
                email,
                password
            })

            if (response.data.success) {
                alert("Signup Successful")
                router.replace(`/verify/${username}`);
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            alert(axiosError.response?.data.message)
        } finally {
            setSubmiting(false)
        }
    }

    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }


    return (
        <div>

            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome</CardTitle>
                        <CardDescription>
                            Signup with your Google account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline" type="button" className="w-full" onClick={handleGoogleLogin}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        signup with Google
                                    </Button>
                                </div>
                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="user@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            onChange={(e) => debounced(e.target.value)}
                                        />
                                        {checking ?
                                            <Loader2 className="animate-spin" />

                                            : <p className={usernameMessage == "Username already taken" ? "text-red-500" : "text-green-500"}>{usernameMessage}</p>}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    {submiting ?
                                        <div className="items-center justify-center flex backdrop-blur-md">
                                            <Loader2 className="animate-spin items-center justify-center size-12" />
                                        </div>
                                        :
                                        <Button type="submit" className="w-full">
                                            Signup
                                        </Button>
                                    }

                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <a href="/login" className="underline underline-offset-4">
                                        Login
                                    </a>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    )
}
